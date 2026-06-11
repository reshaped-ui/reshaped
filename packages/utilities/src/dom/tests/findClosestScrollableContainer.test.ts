import { afterEach, describe, expect, test } from "vitest";

import findClosestScrollableContainer from "../findClosestScrollableContainer";

describe("dom/findClosestScrollableContainer", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	test("returns null when no scrollable container is found", () => {
		const container = document.createElement("div");
		const child = document.createElement("div");
		container.appendChild(child);
		document.body.appendChild(container);

		const result = findClosestScrollableContainer({ el: child });

		expect(result).toBe(null);
	});

	test("returns element with overflow auto and scrollable content", () => {
		const scrollable = document.createElement("div");
		scrollable.style.overflowY = "auto";
		scrollable.style.height = "100px";
		const content = document.createElement("div");
		content.style.height = "200px";
		scrollable.appendChild(content);
		document.body.appendChild(scrollable);

		const result = findClosestScrollableContainer({ el: content });

		expect(result).toBe(scrollable);
	});

	test("returns element with overflow scroll and scrollable content", () => {
		const scrollable = document.createElement("div");
		scrollable.style.overflowY = "scroll";
		scrollable.style.height = "100px";
		const content = document.createElement("div");
		content.style.height = "200px";
		scrollable.appendChild(content);
		document.body.appendChild(scrollable);

		const result = findClosestScrollableContainer({ el: content });

		expect(result).toBe(scrollable);
	});

	test("returns first scrollable ancestor", () => {
		const scrollable = document.createElement("div");
		scrollable.style.overflowY = "auto";
		scrollable.style.height = "100px";
		const middle = document.createElement("div");
		const child = document.createElement("div");
		child.style.height = "200px";
		scrollable.appendChild(middle);
		middle.appendChild(child);
		document.body.appendChild(scrollable);

		const result = findClosestScrollableContainer({ el: child });

		expect(result).toBe(scrollable);
	});

	test("skips element with overflow but no scrollable content", () => {
		const notScrollable = document.createElement("div");
		notScrollable.style.overflowY = "auto";
		notScrollable.style.height = "200px";
		const content = document.createElement("div");
		content.style.height = "100px";
		notScrollable.appendChild(content);
		document.body.appendChild(notScrollable);

		const result = findClosestScrollableContainer({ el: content });

		expect(result).toBe(null);
	});
});
