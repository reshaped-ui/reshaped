import { expect, test, describe } from "vitest";

import findClosestScrollableContainer from "flyout/utilities/findClosestScrollableContainer";

describe("flyout/findClosestScrollableContainer", () => {
	test("returns null when element has no parent", () => {
		const result = findClosestScrollableContainer({ el: document.documentElement });

		expect(result).toBe(null);
	});

	test("returns the element itself has overflow auto", () => {
		const scrollableEl = document.createElement("div");
		scrollableEl.style.overflowY = "auto";
		scrollableEl.style.height = "100px";

		const childEl = document.createElement("div");
		childEl.style.height = "200px";

		scrollableEl.appendChild(childEl);
		document.body.appendChild(scrollableEl);

		const result = findClosestScrollableContainer({ el: scrollableEl });

		expect(result).toBe(scrollableEl);
	});

	test("returns the element itself has overflow scroll", () => {
		const scrollableEl = document.createElement("div");
		scrollableEl.style.overflowY = "scroll";
		scrollableEl.style.height = "100px";

		const childEl = document.createElement("div");
		childEl.style.height = "200px";

		scrollableEl.appendChild(childEl);
		document.body.appendChild(scrollableEl);

		const result = findClosestScrollableContainer({ el: scrollableEl });

		expect(result).toBe(scrollableEl);
	});

	test("returns grandparent when it is scrollable", () => {
		const scrollableEl = document.createElement("div");
		scrollableEl.style.overflowY = "auto";
		scrollableEl.style.height = "100px";

		const childEl = document.createElement("div");
		childEl.style.height = "200px";

		const grandChildEl = document.createElement("div");
		grandChildEl.style.height = "100px";

		childEl.appendChild(grandChildEl);
		scrollableEl.appendChild(childEl);
		document.body.appendChild(scrollableEl);

		const result = findClosestScrollableContainer({ el: grandChildEl });

		expect(result).toBe(scrollableEl);
	});

	test("returns null when no scrollable container is found", () => {
		const scrollableEl = document.createElement("div");
		scrollableEl.style.overflowY = "visible";
		scrollableEl.style.height = "100px";

		const childEl = document.createElement("div");
		childEl.style.height = "200px";

		scrollableEl.appendChild(childEl);
		document.body.appendChild(scrollableEl);

		const result = findClosestScrollableContainer({ el: childEl });

		expect(result).toBe(null);
	});

	test("does not return element with overflow auto but scrollHeight <= clientHeight", () => {
		const scrollableEl = document.createElement("div");
		scrollableEl.style.overflowY = "auto";
		scrollableEl.style.height = "100px";

		const childEl = document.createElement("div");
		childEl.style.height = "100px";

		scrollableEl.appendChild(childEl);
		document.body.appendChild(scrollableEl);

		const result = findClosestScrollableContainer({ el: childEl });

		expect(result).toBe(null);
	});
});
