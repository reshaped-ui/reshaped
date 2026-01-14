import isFullyVisible from "flyout/utilities/isFullyVisible";
import { expect, test, describe } from "vitest";

describe("flyout/isFullyVisible", () => {
	test("returns true when flyout is fully visible within visual container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 8, width: 50, height: 50 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns true when flyout is fully visible and is exactly on the edges of the visual container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 8, width: 84, height: 84 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns false when flyout extends beyond left edge", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 7, top: 8, width: 50, height: 50 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond top edge", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 7, width: 50, height: 50 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
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
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
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
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns true when flyout is fully visible within container with non-zero position", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 108, top: 208, width: 50, height: 50 },
			containerBounds: { left: 100, top: 200, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns false when flyout extends beyond left edge of container with non-zero position", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 107, top: 208, width: 50, height: 50 },
			containerBounds: { left: 100, top: 200, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond top edge of container with non-zero position", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 108, top: 207, width: 50, height: 50 },
			containerBounds: { left: 100, top: 200, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout extends beyond multiple edges", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 5, top: 5, width: 100, height: 100 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns false when flyout is completely outside container", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 200, top: 200, width: 50, height: 50 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(false);
	});

	test("returns true when flyout has zero dimensions but is within bounds", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 50, top: 50, width: 0, height: 0 },
			containerBounds: { left: 0, top: 0, width: 100, height: 100 },
		});

		expect(result).toBe(true);
	});

	test("returns false when container is smaller than required offsets", () => {
		const result = isFullyVisible({
			flyoutBounds: { left: 8, top: 8, width: 1, height: 1 },
			containerBounds: { left: 0, top: 0, width: 10, height: 10 },
		});

		expect(result).toBe(false);
	});
});
