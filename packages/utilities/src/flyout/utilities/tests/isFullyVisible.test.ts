import { expect, test, describe } from "vitest";

import isFullyVisible from "flyout/utilities/isFullyVisible";

describe("flyout/isFullyVisible", () => {
	test("returns true when flyout is fully visible within visual container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 8, width: 50, height: 50 },
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns true when flyout is fully visible and is exactly on the edges of the visual container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 8, width: 84, height: 84 },
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns false when flyout extends beyond left edge", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 7, top: 8, width: 50, height: 50 },
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond top edge", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 7, width: 50, height: 50 },
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond right edge", () => {
		const result = isFullyVisible({
			flyoutBounds: {
				left: 100 - 50 - 7,
				top: 8,
				width: 50,
				height: 50,
			},
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond bottom edge", () => {
		const result = isFullyVisible({
			flyoutBounds: {
				left: 8,
				top: 100 - 50 - 7,
				width: 50,
				height: 50,
			},
			visualContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
			renderContainerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	/**
	 * Render container
	 */

	test("returns true when flyout is fully visible with offset render container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 58, top: 58, width: 100, height: 100 },
			renderContainerBounds: { left: 50, top: 50, width: 200, height: 200 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
		});

		expect(result).toBe(true);
	});

	test("returns false when flyout extends beyond left edge with offset render container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 0, top: 58, width: 50, height: 50 },
			renderContainerBounds: { left: 50, top: 50, width: 200, height: 200 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond top edge with offset render container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 58, top: 0, width: 50, height: 50 },
			renderContainerBounds: { left: 50, top: 50, width: 200, height: 200 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond right edge with offset render container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 200 - 7, top: 58, width: 50, height: 50 },
			renderContainerBounds: { left: 50, top: 50, width: 200, height: 200 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond bottom edge with offset render container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 58, top: 200 - 7, width: 50, height: 50 },
			renderContainerBounds: { left: 50, top: 50, width: 200, height: 200 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout is larger than visual container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 0, top: 0, width: 300, height: 300 },
			visualContainerBounds: { left: 0, top: 0, width: 200, height: 200 },
			renderContainerBounds: { left: 0, top: 0, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});

	test("returns true when flyout is fully visible with negative render container position", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 118, top: 118, width: 100, height: 50 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
			renderContainerBounds: { left: -10, top: -10, width: 200, height: 200 },
		});

		expect(result).toBe(true);
	});

	test("returns false when flyout extends beyond left with negative render container position", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 0, top: 110, width: 100, height: 50 },
			visualContainerBounds: { left: 100, top: 100, width: 200, height: 200 },
			renderContainerBounds: { left: -10, top: -10, width: 200, height: 200 },
		});

		expect(result).toBe(false);
	});
});
