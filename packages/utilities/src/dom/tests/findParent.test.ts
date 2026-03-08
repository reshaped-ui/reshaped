import { describe, expect, test } from "vitest";

import findParent from "../findParent";

describe("dom/findParent", () => {
	test("returns null when element has no parent", () => {
		const element = document.createElement("div");
		const result = findParent(element, () => true);

		expect(result).toBe(null);
	});

	test("returns null when no parent matches the condition", () => {
		const parent = document.createElement("div");
		const child = document.createElement("span");
		parent.appendChild(child);

		const result = findParent(child, () => false);

		expect(result).toBe(null);
	});

	test("returns the immediate parent when it matches", () => {
		const parent = document.createElement("div");
		parent.className = "target";
		const child = document.createElement("span");
		parent.appendChild(child);

		const result = findParent(child, (el) => el.className === "target");

		expect(result).toBe(parent);
	});

	test("returns a distant ancestor when it matches", () => {
		const grandparent = document.createElement("div");
		grandparent.className = "target";
		const parent = document.createElement("div");
		const child = document.createElement("span");
		grandparent.appendChild(parent);
		parent.appendChild(child);

		const result = findParent(child, (el) => el.className === "target");

		expect(result).toBe(grandparent);
	});

	test("returns the first matching parent", () => {
		const grandparent = document.createElement("div");
		grandparent.className = "match";
		const parent = document.createElement("div");
		parent.className = "match";
		const child = document.createElement("span");
		grandparent.appendChild(parent);
		parent.appendChild(child);

		const result = findParent(child, (el) => el.className === "match");

		expect(result).toBe(parent);
	});
});
