import { expect, test, describe } from "vitest";
import shiftIntoView from "../shiftIntoView";

const mockCalculated = {
	position: "bottom" as const,
	styles: {
		transform: "translate(50px, 25px)",
		left: 0,
		top: 0,
		width: undefined,
		right: undefined,
		bottom: undefined,
	},
	boundaries: {
		left: 50,
		top: 25,
		width: 200,
		height: 150,
	},
};

const mockContainerBounds = {
	left: 0,
	top: 0,
	right: 400,
	bottom: 300,
	width: 400,
	height: 300,
	x: 0,
	y: 0,
	toJSON: () => {},
} as DOMRect;

describe("shiftIntoView", () => {
	test("shifts flyout left when overflowing right edge", () => {
		const calculated = {
			...mockCalculated,
			boundaries: { ...mockCalculated.boundaries, left: 250 }, // Would overflow (250 + 200 = 450 > 400)
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.left).toBe(200); // 400 - 200 = 200
		expect(result.styles.transform).toBe("translate(200px, 25px)");
	});

	test("shifts flyout up when overflowing bottom edge", () => {
		const calculated = {
			...mockCalculated,
			boundaries: { ...mockCalculated.boundaries, top: 200 }, // Would overflow (200 + 150 = 350 > 300)
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.top).toBe(150); // 300 - 150 = 150
		expect(result.styles.transform).toBe("translate(50px, 150px)");
	});

	test("shifts flyout right when overflowing left edge", () => {
		const calculated = {
			...mockCalculated,
			boundaries: { ...mockCalculated.boundaries, left: -50 }, // Would overflow
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.left).toBe(0);
	});

	test("shifts flyout down when overflowing top edge", () => {
		const calculated = {
			...mockCalculated,
			boundaries: { ...mockCalculated.boundaries, top: -30 }, // Would overflow
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.top).toBe(0);
	});

	test("respects padding parameter", () => {
		const calculated = {
			...mockCalculated,
			boundaries: { ...mockCalculated.boundaries, left: 250 },
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 10);

		expect(result.boundaries.left).toBe(190); // 400 - 10 - 200 = 190
	});

	test("preserves original position when no shift needed", () => {
		const result = shiftIntoView(mockCalculated, mockContainerBounds, 0);

		expect(result.boundaries.left).toBe(50);
		expect(result.boundaries.top).toBe(25);
		expect(result.styles.transform).toBe("translate(50px, 25px)");
	});

	test("handles both x and y shifts simultaneously", () => {
		const calculated = {
			...mockCalculated,
			boundaries: {
				...mockCalculated.boundaries,
				left: 250, // Would overflow right (250 + 200 = 450 > 400)
				top: 200, // Would overflow bottom (200 + 150 = 350 > 300)
			},
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.left).toBe(200); // 400 - 200 = 200
		expect(result.boundaries.top).toBe(150); // 300 - 150 = 150
		expect(result.styles.transform).toBe("translate(200px, 150px)");
	});

	test("ensures minimum position of 0 even with negative shifts", () => {
		const calculated = {
			...mockCalculated,
			boundaries: {
				...mockCalculated.boundaries,
				left: -100, // Far left overflow
				top: -50, // Far top overflow
			},
		};

		const result = shiftIntoView(calculated, mockContainerBounds, 0);

		expect(result.boundaries.left).toBe(0); // Math.max(0, -100 + 100) = 0
		expect(result.boundaries.top).toBe(0); // Math.max(0, -50 + 50) = 0
		expect(result.styles.transform).toBe("translate(0px, 0px)");
	});

	test("preserves all calculated properties", () => {
		const result = shiftIntoView(mockCalculated, mockContainerBounds, 0);

		expect(result.position).toBe(mockCalculated.position);
		expect(result.styles.left).toBe(mockCalculated.styles.left);
		expect(result.styles.top).toBe(mockCalculated.styles.top);
		expect(result.styles.width).toBe(mockCalculated.styles.width);
		expect(result.boundaries.width).toBe(mockCalculated.boundaries.width);
		expect(result.boundaries.height).toBe(mockCalculated.boundaries.height);
	});

	test("prevents shift from pushing element out of bounds on opposite side", () => {
		// Small container
		const smallContainer = {
			left: 0,
			top: 0,
			right: 100,
			bottom: 50,
			width: 100,
			height: 50,
			x: 0,
			y: 0,
			toJSON: () => {},
		} as DOMRect;

		// Large element positioned near bottom edge, overflowing bottom
		const calculated = {
			...mockCalculated,
			boundaries: {
				...mockCalculated.boundaries,
				left: 10,
				top: 40, // Near bottom of 50px container
				width: 80,
				height: 30, // Would extend to top: 40 + height: 30 = 70, overflowing bottom: 50
			},
		};

		const result = shiftIntoView(calculated, smallContainer, 0);

		// The shift should move it up, but not so far that it goes above top: 0
		// maxY = 50 - 30 = 20, so shift should be: 20 - 40 = -20
		// newTop = 40 + (-20) = 20
		expect(result.boundaries.top).toBe(20);

		// But what if the element is even larger and the shift would push it negative?
		// That's where Math.max(0, ...) would be needed
	});

	test("clamps shifted position to prevent negative coordinates", () => {
		// Very small container
		const tinyContainer = {
			left: 0,
			top: 0,
			right: 50,
			bottom: 30,
			width: 50,
			height: 30,
			x: 0,
			y: 0,
			toJSON: () => {},
		} as DOMRect;

		// Large element that overflows bottom and would shift to negative when corrected
		const calculated = {
			...mockCalculated,
			boundaries: {
				...mockCalculated.boundaries,
				left: 10,
				top: 20, // Near bottom
				width: 30,
				height: 40, // Huge height: 20 + 40 = 60, overflows bottom: 30
			},
		};

		const result = shiftIntoView(calculated, tinyContainer, 0);

		// maxY = 30 - 40 = -10 (negative!)
		// shift would be: -10 - 20 = -30
		// newTop = 20 + (-30) = -10 (negative!)

		// This should be clamped to 0, not allowed to be negative
		expect(result.boundaries.top).toBeGreaterThanOrEqual(0);
		expect(result.boundaries.left).toBeGreaterThanOrEqual(0);
	});
});
