import { expect, test, describe, beforeEach, afterEach } from "vitest";

import TrapScreenReader from "../TrapScreenReader";

describe("a11y/TrapScreenReader", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
	});

	test("hides siblings from screen reader when trap is activated", () => {
		container.innerHTML = `
			<div id="sibling1">Sibling 1</div>
			<div id="target">Target</div>
			<div id="sibling2">Sibling 2</div>
		`;

		const target = container.querySelector("#target") as HTMLElement;
		const sibling1 = container.querySelector("#sibling1") as HTMLElement;
		const sibling2 = container.querySelector("#sibling2") as HTMLElement;

		const trap = new TrapScreenReader(target);
		trap.trap();

		expect(sibling1.getAttribute("aria-hidden")).toBe("true");
		expect(sibling2.getAttribute("aria-hidden")).toBe("true");
		expect(target.hasAttribute("aria-hidden")).toBe(false);
	});

	test("releases trapped elements and removes aria-hidden", () => {
		container.innerHTML = `
			<div id="sibling1">Sibling 1</div>
			<div id="target">Target</div>
			<div id="sibling2">Sibling 2</div>
		`;

		const target = container.querySelector("#target") as HTMLElement;
		const sibling1 = container.querySelector("#sibling1") as HTMLElement;
		const sibling2 = container.querySelector("#sibling2") as HTMLElement;

		const trap = new TrapScreenReader(target);
		trap.trap();
		trap.release();

		expect(sibling1.hasAttribute("aria-hidden")).toBe(false);
		expect(sibling2.hasAttribute("aria-hidden")).toBe(false);
	});

	test("traverses up the DOM tree and hides siblings at each level", () => {
		container.innerHTML = `
			<div id="outer-sibling">Outer Sibling</div>
			<div id="parent">
				<div id="inner-sibling">Inner Sibling</div>
				<div id="target">Target</div>
			</div>
		`;

		const target = container.querySelector("#target") as HTMLElement;
		const innerSibling = container.querySelector("#inner-sibling") as HTMLElement;
		const outerSibling = container.querySelector("#outer-sibling") as HTMLElement;
		const parent = container.querySelector("#parent") as HTMLElement;

		const trap = new TrapScreenReader(target);
		trap.trap();

		// Inner sibling should be hidden
		expect(innerSibling.getAttribute("aria-hidden")).toBe("true");
		// Outer sibling should be hidden
		expect(outerSibling.getAttribute("aria-hidden")).toBe("true");
		// Parent and target should not be hidden
		expect(parent.hasAttribute("aria-hidden")).toBe(false);
		expect(target.hasAttribute("aria-hidden")).toBe(false);
	});

	test("does not hide elements that already have aria-hidden", () => {
		container.innerHTML = `
			<div id="sibling1" aria-hidden="true">Already Hidden</div>
			<div id="target">Target</div>
			<div id="sibling2">Sibling 2</div>
		`;

		const target = container.querySelector("#target") as HTMLElement;
		const sibling1 = container.querySelector("#sibling1") as HTMLElement;
		const sibling2 = container.querySelector("#sibling2") as HTMLElement;

		const trap = new TrapScreenReader(target);
		trap.trap();

		// sibling1 should still be aria-hidden but not tracked
		expect(sibling1.getAttribute("aria-hidden")).toBe("true");
		expect(sibling2.getAttribute("aria-hidden")).toBe("true");

		trap.release();

		// sibling1 should still have aria-hidden (wasn't added by trap)
		expect(sibling1.getAttribute("aria-hidden")).toBe("true");
		// sibling2 should have aria-hidden removed (was added by trap)
		expect(sibling2.hasAttribute("aria-hidden")).toBe(false);
	});

	test("stops at body level and does not hide body siblings", () => {
		const outsideContainer = document.createElement("div");
		outsideContainer.id = "outside";
		document.body.appendChild(outsideContainer);

		container.innerHTML = `<div id="target">Target</div>`;
		const target = container.querySelector("#target") as HTMLElement;

		const trap = new TrapScreenReader(target);
		trap.trap();

		// Container's sibling (outsideContainer) should be hidden
		expect(outsideContainer.getAttribute("aria-hidden")).toBe("true");

		trap.release();
		document.body.removeChild(outsideContainer);
	});

	test("releases previous trap when trap is called again", () => {
		container.innerHTML = `
			<div id="sibling1">Sibling 1</div>
			<div id="target">Target</div>
			<div id="sibling2">Sibling 2</div>
		`;

		const target = container.querySelector("#target") as HTMLElement;
		const sibling1 = container.querySelector("#sibling1") as HTMLElement;
		const sibling2 = container.querySelector("#sibling2") as HTMLElement;

		const trap = new TrapScreenReader(target);

		// First trap
		trap.trap();
		expect(sibling1.getAttribute("aria-hidden")).toBe("true");

		// Second trap should release first
		trap.trap();
		expect(sibling1.getAttribute("aria-hidden")).toBe("true");
		expect(sibling2.getAttribute("aria-hidden")).toBe("true");
	});

	test("ignores non-element nodes", () => {
		const parent = document.createElement("div");
		parent.appendChild(document.createTextNode("Text node"));

		const target = document.createElement("div");
		target.textContent = "Target";
		parent.appendChild(target);

		container.appendChild(parent);

		const trap = new TrapScreenReader(target);

		// Should not throw error when encountering text nodes
		expect(() => trap.trap()).not.toThrow();
	});
});
