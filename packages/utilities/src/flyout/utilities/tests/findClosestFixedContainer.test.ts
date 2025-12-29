import { expect, test, describe } from "vitest";

import findClosestFixedContainer from "flyout/utilities/findClosestFixedContainer";

describe("flyout/findClosestFixedContainer", () => {
	test("returns document.body when element is null", () => {
		const result = findClosestFixedContainer({ el: null });

		expect(result).toBe(document.body);
	});

	test("returns document.body when element is document.body", () => {
		const result = findClosestFixedContainer({ el: document.body });

		expect(result).toBe(document.body);
	});

	test("returns the element itself when it has position fixed", () => {
		const fixedEl = document.createElement("div");
		fixedEl.style.position = "fixed";
		document.body.appendChild(fixedEl);

		const result = findClosestFixedContainer({ el: fixedEl });

		expect(result).toBe(fixedEl);
	});

	test("returns the element itself when it has position sticky", () => {
		const stickyEl = document.createElement("div");
		stickyEl.style.position = "sticky";
		document.body.appendChild(stickyEl);

		const result = findClosestFixedContainer({ el: stickyEl });

		expect(result).toBe(stickyEl);
	});

	test("returns grandparent when it has position fixed", () => {
		const fixedEl = document.createElement("div");
		fixedEl.style.position = "fixed";

		const childEl = document.createElement("div");
		const grandChildEl = document.createElement("div");

		childEl.appendChild(grandChildEl);
		fixedEl.appendChild(childEl);
		document.body.appendChild(fixedEl);

		const result = findClosestFixedContainer({ el: grandChildEl });

		expect(result).toBe(fixedEl);
	});

	test("returns document.body when no fixed container is found", () => {
		const staticEl = document.createElement("div");
		staticEl.style.position = "static";

		const childEl = document.createElement("div");
		staticEl.appendChild(childEl);
		document.body.appendChild(staticEl);

		const result = findClosestFixedContainer({ el: childEl });

		expect(result).toBe(document.body);
	});
});
