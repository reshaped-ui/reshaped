import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { preventKeyboardPan } from "../keyboardPan";

const original = Object.getOwnPropertyDescriptor(window, "visualViewport")!;
let viewport: EventTarget & { height: number; offsetTop: number; scale: number };
let release: (() => void) | undefined;

const press = (target: Element, point?: { x: number; y: number }) => {
	const rect = target.getBoundingClientRect();

	target.dispatchEvent(
		new MouseEvent("mousedown", {
			bubbles: true,
			cancelable: true,
			clientX: point?.x ?? rect.left + rect.width / 2,
			clientY: point?.y ?? rect.top + rect.height / 2,
		})
	);
};

const render = (html: string) => {
	const root = document.createElement("div");
	root.innerHTML = html;
	document.body.appendChild(root);
	return root;
};

describe("scroll/preventKeyboardPan", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		viewport = Object.assign(new EventTarget(), {
			height: window.innerHeight,
			offsetTop: 0,
			scale: 1,
		});
		Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });
	});

	afterEach(() => {
		release?.();
		release = undefined;
		document.body.innerHTML = "";
		window.scrollTo(0, 0);
		Object.defineProperty(window, "visualViewport", original);
	});

	test("focuses the pressed field while it's moved above the screen, without scrolling to it", () => {
		const root = render(`
			<div data-scroll style="height: 200px; overflow: auto">
				<div style="height: 600px"></div>
				<input style="transform: scale(1); opacity: 0.5" />
			</div>
		`);
		const scrollEl = root.querySelector<HTMLElement>("[data-scroll]")!;
		const input = root.querySelector("input")!;
		// Geometry Safari resolves the pan from
		let focusedTransform = "";
		const focus = vi
			.spyOn(input, "focus")
			.mockImplementation(function (this: HTMLInputElement, options) {
				focusedTransform = this.style.transform;
				HTMLElement.prototype.focus.call(this, options);
			});
		release = preventKeyboardPan();

		press(input);

		expect(focus).toHaveBeenCalledExactlyOnceWith({ preventScroll: true });
		expect(focusedTransform).toBe("translateY(-2000px)");
		expect(document.activeElement).toBe(input);
		expect(scrollEl.scrollTop).toBe(0);
		expect(input.style.transform).toBe("scale(1)");
		expect(input.style.opacity).toBe("0.5");
		expect(input.style.transition).toBe("");
	});

	test("puts the caret where the field is pressed", () => {
		const root = render(`<textarea style="width: 300px">Hello</textarea>`);
		const textarea = root.querySelector("textarea")!;
		const rect = textarea.getBoundingClientRect();
		textarea.setSelectionRange(0, 0);
		release = preventKeyboardPan();

		press(textarea, { x: rect.right - 4, y: rect.top + rect.height / 2 });

		expect(document.activeElement).toBe(textarea);
		expect(textarea.selectionStart).toBe(5);
	});

	test("focuses the editable area as a whole and leaves the controls inside it to their own presses", () => {
		const root = render(`
			<div contenteditable="true" data-host>
				<p><span>Text</span></p>
				<button type="button">Control</button>
				<div contenteditable="false"><span data-island>Island</span></div>
			</div>
		`);
		const host = root.querySelector<HTMLElement>("[data-host]")!;
		release = preventKeyboardPan();

		press(root.querySelector("button")!);
		press(root.querySelector("[data-island]")!);
		expect(document.activeElement).toBe(document.body);

		press(root.querySelector("span")!);
		expect(document.activeElement).toBe(host);
		expect(host.contains(window.getSelection()!.focusNode)).toBe(true);
	});

	test("leaves the focused field and the fields without a keyboard to the browser", () => {
		const root = render(`<input data-text /><input type="checkbox" /><input readonly />`);
		const input = root.querySelector<HTMLInputElement>("[data-text]")!;
		release = preventKeyboardPan();

		press(root.querySelector("[type=checkbox]")!);
		press(root.querySelector("[readonly]")!);
		expect(document.activeElement).toBe(document.body);

		input.focus();
		const focus = vi.spyOn(input, "focus");
		press(input);
		expect(focus).not.toHaveBeenCalled();
	});

	test("puts the page back when it's panned while a field is focused", async () => {
		const root = render(`<input /><div style="height: 3000px"></div>`);
		const input = root.querySelector("input")!;
		release = preventKeyboardPan();

		// Page without a focused field is not affected, e.g. when the user scrolls a contained overlay
		window.scrollTo(0, 300);
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(window.scrollY).toBe(300);
		window.scrollTo(0, 0);

		press(input);
		window.scrollTo(0, 300);
		await expect.poll(() => window.scrollY).toBe(0);

		// Zoomed page is panned by the user
		viewport.scale = 2;
		window.scrollTo(0, 300);
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(window.scrollY).toBe(300);
	});

	test("keeps the scroll position the page was locked at", async () => {
		const root = render(`<div style="height: 3000px"></div><input />`);
		const input = root.querySelector("input")!;
		window.scrollTo(0, 200);
		release = preventKeyboardPan();

		input.focus({ preventScroll: true });
		window.scrollTo(0, 500);

		await expect.poll(() => window.scrollY).toBe(200);
	});

	test("reveals the focused field inside its scrollable container once the keyboard covers it", async () => {
		const root = render(`
			<div data-scroll style="position: fixed; top: 0; left: 0; width: 300px; height: 600px; overflow: auto">
				<div style="height: 500px"></div>
				<input />
				<div style="height: 800px"></div>
			</div>
		`);
		const scrollEl = root.querySelector<HTMLElement>("[data-scroll]")!;
		const input = root.querySelector("input")!;
		release = preventKeyboardPan();

		press(input);
		// Field visible without the keyboard stays where it is
		await new Promise((resolve) => requestAnimationFrame(resolve));
		expect(scrollEl.scrollTop).toBe(0);

		viewport.height = 300;
		viewport.dispatchEvent(new Event("resize"));

		await expect.poll(() => Math.round(input.getBoundingClientRect().bottom)).toBe(300 - 16);
		expect(window.scrollY).toBe(0);
	});

	test("stops handling the fields once released", () => {
		const root = render(`<input />`);
		const input = root.querySelector("input")!;

		preventKeyboardPan()();
		press(input);

		expect(document.activeElement).toBe(document.body);
	});
});
