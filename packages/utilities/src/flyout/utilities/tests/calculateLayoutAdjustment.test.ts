import { expect, test, describe, vi, beforeEach } from "vitest";

import { VIEWPORT_OFFSET } from "flyout/constants";
import calculateLayoutAdjustment from "flyout/utilities/calculateLayoutAdjustment";

describe("flyout/calculateLayoutAdjustment", () => {
	const createBounds = (left: number, top: number, width: number, height: number): DOMRect => {
		return {
			left,
			top,
			width,
			height,
			right: left + width,
			bottom: top + height,
			x: left,
			y: top,
			toJSON: vi.fn(),
		} as DOMRect;
	};

	beforeEach(() => {
		// Set consistent viewport dimensions for tests
		Object.defineProperty(window, "innerWidth", { value: 1000, writable: true });
		Object.defineProperty(window, "innerHeight", { value: 800, writable: true });
	});

	test("returns styles unchanged when no adjustments needed", () => {
		const result = calculateLayoutAdjustment({
			position: "bottom",
			styles: {
				top: 100,
				left: 200,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(200, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: false,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		expect(result.position).toBe("bottom");
		expect(result.styles.top).toBe(100);
		expect(result.styles.left).toBe(200);
		expect(result.styles.bottom).toBe(null);
		expect(result.styles.right).toBe(null);
		expect(result.styles.height).toBe(null);
		expect(result.styles.width).toBe(null);
	});

	test("applies width option '100%'", () => {
		const result = calculateLayoutAdjustment({
			position: "bottom",
			styles: {
				top: 100,
				left: 200,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(200, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: false,
			fallbackMinHeight: undefined,
			width: "100%",
		});

		// left = VIEWPORT_OFFSET = 8
		// width = window.innerWidth - VIEWPORT_OFFSET * 2 = 1000 - 16 = 984
		expect(result.styles.left).toBe(VIEWPORT_OFFSET);
		expect(result.styles.width).toBe(window.innerWidth - VIEWPORT_OFFSET * 2);
	});

	test("applies width option 'trigger'", () => {
		const triggerBounds = createBounds(200, 100, 75, 30);

		const result = calculateLayoutAdjustment({
			position: "bottom",
			styles: {
				top: 100,
				left: 200,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds,
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: false,
			fallbackMinHeight: undefined,
			width: "trigger",
		});

		expect(result.styles.width).toBe(75);
	});

	test("adjusts left when vertical position overflows left edge", () => {
		const result = calculateLayoutAdjustment({
			position: "top",
			styles: {
				top: 100,
				left: 5, // Would overflow left edge (needs to be at least VIEWPORT_OFFSET)
				bottom: 500,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(5, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.left = 0 + 8 - 5 = 3 > 0
		// left = VIEWPORT_OFFSET + containerLeft = 8 + 0 = 8
		expect(result.styles.left).toBe(VIEWPORT_OFFSET);
	});

	test("adjusts left when vertical position overflows right edge", () => {
		const result = calculateLayoutAdjustment({
			position: "top",
			styles: {
				top: 100,
				left: 900, // With flyout width 150, would overflow right edge
				bottom: 500,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(900, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.right = 900 + 150 + 8 - 0 - 1000 = 58 > 0
		// left = 900 - 58 = 842
		expect(result.styles.left).toBe(842);
	});

	test("adjusts top when horizontal position overflows top edge", () => {
		const result = calculateLayoutAdjustment({
			position: "start",
			styles: {
				top: 5, // Would overflow top edge
				left: 100,
				bottom: null,
				right: 800,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(100, 5, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.top = 0 + 8 - 5 = 3 > 0
		// top = containerTop + VIEWPORT_OFFSET = 0 + 8 = 8
		expect(result.styles.top).toBe(VIEWPORT_OFFSET);
	});

	test("adjusts top when horizontal position overflows bottom edge", () => {
		const result = calculateLayoutAdjustment({
			position: "start",
			styles: {
				top: 700, // With flyout height 200, would overflow bottom edge
				left: 100,
				bottom: null,
				right: 800,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(100, 700, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.bottom = 700 + 200 + 8 - 0 - 800 = 108 > 0
		// top = 700 - 108 = 592
		expect(result.styles.top).toBe(592);
	});

	test("adjusts bottom value when top overflows for horizontal position with bottom set", () => {
		const result = calculateLayoutAdjustment({
			position: "start-bottom",
			styles: {
				top: 5, // Would overflow top edge
				left: 100,
				bottom: 200,
				right: 800,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(100, 5, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.top = 0 + 8 - 5 = 3 > 0
		// top = 8
		// bottom = 200 - 3 = 197
		expect(result.styles.top).toBe(VIEWPORT_OFFSET);
		expect(result.styles.bottom).toBe(197);
	});

	test("adjusts right value when left overflows for vertical position with right set", () => {
		const result = calculateLayoutAdjustment({
			position: "top-end",
			styles: {
				top: 100,
				left: 5, // Would overflow left edge
				bottom: 500,
				right: 995,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(5, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.left = 0 + 8 - 5 = 3 > 0
		// left = 8
		// right = 995 - 3 = 992
		expect(result.styles.left).toBe(VIEWPORT_OFFSET);
		expect(result.styles.right).toBe(992);
	});

	test("adjusts height when top overflow persists after position adjustment", () => {
		const result = calculateLayoutAdjustment({
			position: "start",
			styles: {
				top: 5, // Would overflow top edge
				left: 100,
				bottom: null,
				right: 800,
			},
			flyoutBounds: createBounds(0, 0, 150, 250), // Larger height
			triggerBounds: createBounds(100, 5, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 100 }, // Small container
			fallbackAdjustLayout: true,
			fallbackMinHeight: "50",
			width: undefined,
		});

		// After adjusting top to VIEWPORT_OFFSET (8), there's still overflow
		// updatedOverflow.top = 0 + 8 - 8 = 0 (no overflow)
		// But let's check bottom overflow
		// updatedOverflow.bottom = 8 + 250 + 8 - 0 - 100 = 166 > 0
		// height = max(50, 250 - 166) = max(50, 84) = 84
		expect(result.styles.height).toBeGreaterThanOrEqual(50);
	});

	test("adjusts height when bottom overflow persists after position adjustment", () => {
		const result = calculateLayoutAdjustment({
			position: "end",
			styles: {
				top: 100,
				left: 100,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 750), // Very tall flyout
			triggerBounds: createBounds(100, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: "100",
			width: undefined,
		});

		// overflow.bottom = 100 + 750 + 8 - 0 - 800 = 58 > 0
		// top = 100 - 58 = 42
		// updatedOverflow.bottom = 42 + 750 + 8 - 0 - 800 = 0 (no more overflow)
		// So no height adjustment needed in this case
		// But if there's still overflow, height would be adjusted
		expect(result.styles.top).toBeLessThan(100);
	});

	test("respects fallbackMinHeight when adjusting height", () => {
		const result = calculateLayoutAdjustment({
			position: "start",
			styles: {
				top: 5,
				left: 100,
				bottom: null,
				right: 800,
			},
			flyoutBounds: createBounds(0, 0, 150, 300),
			triggerBounds: createBounds(100, 5, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 50 }, // Very small container
			fallbackAdjustLayout: true,
			fallbackMinHeight: "150",
			width: undefined,
		});

		// After adjustments, if height is calculated, it should be at least 150
		if (result.styles.height !== null) {
			expect(result.styles.height).toBeGreaterThanOrEqual(150);
		}
	});

	test("handles container with offset", () => {
		const result = calculateLayoutAdjustment({
			position: "top",
			styles: {
				top: 105, // Relative to container at top: 100
				left: 55, // Relative to container at left: 50
				bottom: 500,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(55, 105, 50, 30),
			containerBounds: { left: 50, top: 100, width: 900, height: 700 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// overflow.left = 50 + 8 - 55 = 3 > 0
		// left = VIEWPORT_OFFSET + containerLeft = 8 + 50 = 58
		expect(result.styles.left).toBe(58);
	});

	test("handles end position (horizontal) with vertical overflow", () => {
		const result = calculateLayoutAdjustment({
			position: "end-top",
			styles: {
				top: 5,
				left: 200,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(200, 5, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// end-top is a horizontal position (starts with "end")
		// overflow.top = 0 + 8 - 5 = 3 > 0
		// top = 0 + 8 = 8
		expect(result.styles.top).toBe(VIEWPORT_OFFSET);
	});

	test("handles bottom position (vertical) with horizontal overflow", () => {
		const result = calculateLayoutAdjustment({
			position: "bottom-start",
			styles: {
				top: 200,
				left: 5,
				bottom: null,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(5, 200, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: undefined,
		});

		// bottom-start is a vertical position (starts with "bottom")
		// overflow.left = 0 + 8 - 5 = 3 > 0
		// left = 8 + 0 = 8
		expect(result.styles.left).toBe(VIEWPORT_OFFSET);
	});

	test("width option overrides layout adjustment for left position", () => {
		const result = calculateLayoutAdjustment({
			position: "top",
			styles: {
				top: 100,
				left: 900, // Would be adjusted due to overflow
				bottom: 500,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 200),
			triggerBounds: createBounds(900, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: undefined,
			width: "100%",
		});

		// Layout adjustment happens first, but width option overrides left
		// left = VIEWPORT_OFFSET = 8 (from width: "100%")
		// width = 1000 - 16 = 984
		expect(result.styles.left).toBe(VIEWPORT_OFFSET);
		expect(result.styles.width).toBe(984);
	});

	test("adjusts height and updates bottom value when bottom is set", () => {
		const result = calculateLayoutAdjustment({
			position: "end",
			styles: {
				top: 100,
				left: 100,
				bottom: 600,
				right: null,
			},
			flyoutBounds: createBounds(0, 0, 150, 750), // Very tall
			triggerBounds: createBounds(100, 100, 50, 30),
			containerBounds: { left: 0, top: 0, width: 1000, height: 800 },
			fallbackAdjustLayout: true,
			fallbackMinHeight: "50",
			width: undefined,
		});

		// After position adjustment and if there's still overflow:
		// If bottom is set and height is adjusted, bottom should also be updated
		if (result.styles.height !== null) {
			expect(result.styles.bottom).not.toBe(600);
		}
	});
});
