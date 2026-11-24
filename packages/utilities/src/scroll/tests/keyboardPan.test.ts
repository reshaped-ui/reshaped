import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { handOverKeyboardPan } from "../keyboardPan";

const original = Object.getOwnPropertyDescriptor(window, "visualViewport")!;
let viewport: EventTarget & { height: number; offsetTop: number; scale: number };
let release: (() => void) | undefined;

const resize = (height: number) => {
	viewport.height = height;
	viewport.dispatchEvent(new Event("resize"));
};

const touch = (type: "touchstart" | "touchend") => {
	const point = new Touch({ identifier: 1, target: document.body, clientX: 10, clientY: 10 });
	const touches = type === "touchstart" ? [point] : [];
	document.body.dispatchEvent(new TouchEvent(type, { bubbles: true, touches }));
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Container scrolled to its end with the focused field in it, on a page the user can't scroll and Safari can pan */
const render = (args?: { boxSizing?: "content-box"; scrollable?: boolean }) => {
	if (!args?.scrollable) document.body.style.overflow = "hidden";
	const root = document.createElement("div");
	root.innerHTML = `
		<div data-scroll style="height: 200px; overflow: auto; box-sizing: ${args?.boxSizing ?? "border-box"}">
			<div style="height: 600px"></div>
			<input />
		</div>
		<div style="height: 2000px"></div>
	`;
	document.body.appendChild(root);

	const scrollEl = root.querySelector<HTMLElement>("[data-scroll]")!;
	scrollEl.scrollTop = scrollEl.scrollHeight;
	root.querySelector("input")!.focus({ preventScroll: true });

	return { scrollEl, endScrollTop: scrollEl.scrollTop };
};

describe("scroll/handOverKeyboardPan", () => {
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
		document.body.style.overflow = "";
		window.scrollTo(0, 0);
		Object.defineProperty(window, "visualViewport", original);
	});

	test("hands the page pan over to the container of the focused field, with room for it at the end", async () => {
		const { scrollEl, endScrollTop } = render();
		release = handOverKeyboardPan();

		resize(window.innerHeight - 300);
		window.scrollTo(0, 120);

		await expect.poll(() => window.scrollY).toBe(0);
		expect(scrollEl.scrollTop).toBe(endScrollTop + 120);
		expect(scrollEl.style.paddingBottom).toBe("120px");

		resize(window.innerHeight);

		expect(scrollEl.style.paddingBottom).toBe("");
	});

	test("scrolls the page back to where it rested before the field was focused", async () => {
		release = handOverKeyboardPan();
		const content = document.createElement("div");
		content.style.height = "3000px";
		document.body.appendChild(content);
		const scrolled = new Promise((resolve) =>
			window.addEventListener("scroll", resolve, { once: true })
		);
		window.scrollTo(0, 300);
		await scrolled;
		const { scrollEl, endScrollTop } = render();

		resize(window.innerHeight - 300);
		window.scrollTo(0, 420);

		await expect.poll(() => window.scrollY).toBe(300);
		expect(scrollEl.scrollTop).toBe(endScrollTop + 120);
	});

	test("leaves a page the user can scroll alone", async () => {
		const { scrollEl, endScrollTop } = render({ scrollable: true });
		release = handOverKeyboardPan();

		resize(window.innerHeight - 300);
		window.scrollTo(0, 120);
		await wait(400);

		expect(window.scrollY).toBe(120);
		expect(scrollEl.scrollTop).toBe(endScrollTop);
	});

	test("waits for the finger to leave the screen", async () => {
		const { scrollEl, endScrollTop } = render();
		release = handOverKeyboardPan();
		resize(window.innerHeight - 300);

		touch("touchstart");
		window.scrollTo(0, 120);
		await wait(400);

		expect(window.scrollY).toBe(120);

		touch("touchend");

		await expect.poll(() => window.scrollY).toBe(0);
		expect(scrollEl.scrollTop).toBe(endScrollTop + 120);
	});

	test("keeps the pan when the container grows with the room instead of scrolling", async () => {
		const { scrollEl, endScrollTop } = render({ boxSizing: "content-box" });
		release = handOverKeyboardPan();

		resize(window.innerHeight - 300);
		window.scrollTo(0, 120);
		await wait(400);

		expect(window.scrollY).toBe(120);
		expect(scrollEl.scrollTop).toBe(endScrollTop);
		expect(scrollEl.style.paddingBottom).toBe("");
	});

	test("leaves the page scroll alone without the keyboard", async () => {
		const { scrollEl, endScrollTop } = render();
		release = handOverKeyboardPan();

		window.scrollTo(0, 120);
		await wait(400);

		expect(window.scrollY).toBe(120);
		expect(scrollEl.scrollTop).toBe(endScrollTop);
	});

	test("keeps handing over until everything using it releases it", async () => {
		const { scrollEl, endScrollTop } = render();
		const releaseFirst = handOverKeyboardPan();
		release = handOverKeyboardPan();
		releaseFirst();
		releaseFirst();
		resize(window.innerHeight - 300);

		window.scrollTo(0, 120);

		await expect.poll(() => window.scrollY).toBe(0);
		expect(scrollEl.scrollTop).toBe(endScrollTop + 120);

		release();
		release = undefined;
		window.scrollTo(0, 120);
		await wait(400);

		expect(window.scrollY).toBe(120);
		expect(scrollEl.style.paddingBottom).toBe("");
	});
});
