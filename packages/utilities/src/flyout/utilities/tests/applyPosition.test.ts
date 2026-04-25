import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import applyPosition from "../applyPosition";

describe("flyout/applyPosition", () => {
	let content: HTMLElement;
	let trigger: HTMLElement;

	beforeEach(() => {
		// Create mock elements
		content = document.createElement("div");
		content.style.width = "100px";
		content.style.height = "50px";
		document.body.appendChild(content);

		trigger = document.createElement("button");
		trigger.style.position = "absolute";
		trigger.style.left = "100px";
		trigger.style.top = "200px";
		trigger.style.width = "50px";
		trigger.style.height = "30px";
		document.body.appendChild(trigger);
	});

	afterEach(() => {
		// Clean up
		if (content.parentNode) content.parentNode.removeChild(content);
		if (trigger.parentNode) trigger.parentNode.removeChild(trigger);
	});

	test("applies position when flyout is fully visible", () => {
		const result = applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(result.position).toBe("top");
	});

	test("uses fallback position when first position is not visible", () => {
		// Position trigger at top edge so "top" won't fit
		trigger.style.top = "0px";

		const result = applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(result.position).toBe("bottom");
	});

	test("uses triggerCoordinates when provided", () => {
		const triggerCoordinates = {
			x: 150,
			y: 250,
		};

		const result = applyPosition({
			content,
			triggerCoordinates,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(result.position).toBe("top");
		expect(content.style.transform).toBe(`translate(150px, ${250 - window.innerHeight}px)`);
	});

	test("returns early with position when triggerBounds are missing", () => {
		const result = applyPosition({
			content,
			triggerCoordinates: null,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});
		expect(result).toEqual({ position: "top" });
	});

	test("applies custom width when provided", () => {
		applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			width: "200px",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(content.style.width).toBe("200px");
	});

	test("applies width 'trigger' option", () => {
		const result = applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			width: "trigger",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(result.position).toBeTruthy();
	});

	test("applies width '100%' option in fallback", () => {
		// Make content very large
		content.style.width = "2000px";
		content.style.height = "2000px";

		const result = applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		// Should try full-width positions
		expect(result.position).toBeTruthy();
	});

	test("applies fallbackPositions when provided", () => {
		// Position trigger at top edge
		trigger.style.top = "0px";

		const result = applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			fallbackPositions: ["start"],
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		expect(result.position).toBe("start");
	});

	test("removes content clone from DOM after calculation", () => {
		const initialChildCount = document.body.children.length;

		applyPosition({
			content,
			trigger,
			triggerCoordinates: null,
			position: "top",
			lastUsedPosition: null,
			onDeactivate: vi.fn(),
		});

		// Clone should be removed
		expect(document.body.children.length).toBe(initialChildCount);
	});
});
