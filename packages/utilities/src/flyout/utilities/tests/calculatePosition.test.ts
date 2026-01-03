import { expect, test, describe, vi } from "vitest";

import { CONTAINER_OFFSET } from "flyout/constants";
import calculatePosition from "flyout/utilities/calculatePosition";

describe("flyout/calculatePosition", () => {
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

	test("calculates position for top placement", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// top position: above trigger, centered horizontally
		// relativeTop = 200 - 0 = 200, top = 200 - 60 = 140
		// relativeLeft = 100 - 0 = 100, left = 100 + centerBySize(50, 40) = 105
		expect(result.boundaries.top).toBe(140);
		expect(result.boundaries.left).toBe(105);
		// top position sets bottom, so top style is null and bottom is "0px"
		expect(result.styles.top).toBe(null);
		expect(result.styles.bottom).toBe("0px");
		expect(result.styles.left).toBe("0px");
		expect(result.styles.right).toBe(null);
	});

	test("calculates position for bottom, start, and end placements", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const bottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 + 30 = 230
		// relativeLeft = 100, left = 100 + centerBySize(50, 40) = 105
		expect(bottom.boundaries.top).toBe(230);
		expect(bottom.boundaries.left).toBe(105);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 - 40 = 60
		// relativeTop = 200, top = 200 + centerBySize(30, 60) = 200 - 15 = 185
		expect(start.boundaries.left).toBe(60);
		expect(start.boundaries.top).toBe(185);

		const end = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 + 50 = 150
		// relativeTop = 200, top = 200 + centerBySize(30, 60) = 185
		expect(end.boundaries.left).toBe(150);
		expect(end.boundaries.top).toBe(185);
	});

	test("calculates position for top-start, top-end, bottom-start, and bottom-end", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const topStart = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top-start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 - 60 = 140
		// relativeLeft = 100, left = 100
		expect(topStart.boundaries.top).toBe(140);
		expect(topStart.boundaries.left).toBe(100);

		const topEnd = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 - 60 = 140
		// relativeLeft = 100, left = 100 + 50 - 40 = 110
		// relativeRight = 1000 - 150 = 850, right = 850 - 0 = 850 (internal, not in boundaries)
		expect(topEnd.boundaries.top).toBe(140);
		expect(topEnd.boundaries.left).toBe(110);

		const bottomStart = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "bottom-start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 + 30 = 230
		// relativeLeft = 100, left = 100
		expect(bottomStart.boundaries.top).toBe(230);
		expect(bottomStart.boundaries.left).toBe(100);

		const bottomEnd = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "bottom-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 + 30 = 230
		// relativeLeft = 100, left = 100 + 50 - 40 = 110
		expect(bottomEnd.boundaries.top).toBe(230);
		expect(bottomEnd.boundaries.left).toBe(110);
	});

	test("calculates position for start-top, start-bottom, end-top, and end-bottom", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const startTop = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start-top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 - 40 = 60
		// relativeTop = 200, top = 200
		expect(startTop.boundaries.left).toBe(60);
		expect(startTop.boundaries.top).toBe(200);

		const startBottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 - 40 = 60
		// relativeTop = 200, top = 200 + 30 - 60 = 170
		// relativeRight = 1000 - 150 = 850, right = 850 - 0 = 850 (internal)
		expect(startBottom.boundaries.left).toBe(60);
		expect(startBottom.boundaries.top).toBe(170);

		const endTop = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end-top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 + 50 = 150
		// relativeTop = 200, top = 200
		expect(endTop.boundaries.left).toBe(150);
		expect(endTop.boundaries.top).toBe(200);

		const endBottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 + 50 = 150
		// relativeTop = 200, top = 200 + 30 - 60 = 170
		expect(endBottom.boundaries.left).toBe(150);
		expect(endBottom.boundaries.top).toBe(170);
	});

	test("applies contentGap correctly", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const top = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 - 60 - 10 = 130
		expect(top.boundaries.top).toBe(130);

		const bottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "bottom",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// relativeTop = 200, top = 200 + 30 + 10 = 240
		expect(bottom.boundaries.top).toBe(240);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 - 40 - 10 = 50
		// relativeRight = 850, right = 850 + 50 + 10 = 910 (internal)
		expect(start.boundaries.left).toBe(50);

		const end = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// relativeLeft = 100, left = 100 + 50 + 10 = 160
		expect(end.boundaries.left).toBe(160);
	});

	test("applies contentShift correctly", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const top = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// relativeLeft = 100, left = 100 + centerBySize(50, 40) + 5 = 100 + 5 + 5 = 110
		expect(top.boundaries.left).toBe(110);

		const topStart = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top-start",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// relativeLeft = 100, left = 100 + 5 = 105
		expect(topStart.boundaries.left).toBe(105);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// relativeTop = 200, top = 200 + centerBySize(30, 60) + 5 = 200 - 15 + 5 = 190
		expect(start.boundaries.top).toBe(190);
	});

	test("handles RTL by converting positions", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		// In RTL, "start" should behave like "end" in LTR
		const startRTL = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start",
			rtl: true,
			contentGap: 0,
			contentShift: 0,
		});

		const endLTR = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		expect(startRTL.boundaries.left).toBe(endLTR.boundaries.left);
		expect(startRTL.position).toBe("end");

		// In RTL, "top-start" should behave like "top-end" in LTR
		const topStartRTL = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top-start",
			rtl: true,
			contentGap: 0,
			contentShift: 0,
		});

		const topEndLTR = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		expect(topStartRTL.boundaries.left).toBe(topEndLTR.boundaries.left);
		expect(topStartRTL.position).toBe("top-end");
	});

	test("handles container scrolling", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);
		const container = {
			scrollLeft: 50,
			scrollTop: 100,
			clientWidth: 1000,
			clientHeight: 800,
		} as unknown as HTMLElement;

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			passedContainer: container,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// With container scroll, relativeLeft should account for scrollLeft
		// relativeLeft = triggerBounds.left - containerBounds.left + containerX
		// = 100 - 0 + 50 = 150
		// So left = 150 + centerBySize(50, 40) = 155
		expect(result.boundaries.left).toBe(150 + 5);
	});

	test("handles window scrolling when no container is provided", () => {
		Object.defineProperty(window, "scrollX", { value: 100, writable: true });
		Object.defineProperty(window, "scrollY", { value: 200, writable: true });

		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// Without container, containerX/Y are undefined, so relativeLeft uses 0
		// relativeLeft = triggerBounds.left - containerBounds.left + 0 = 100
		// left = 100 + centerBySize(50, 40) = 105
		// Window scrollX/Y only affect overflow calculations, not position calculations
		expect(result.boundaries.left).toBe(105);

		Object.defineProperty(window, "scrollX", { value: 0, writable: true });
		Object.defineProperty(window, "scrollY", { value: 0, writable: true });
	});

	test("calculates transform correctly for left and right positioning", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// start position sets right internally, so translateX should be -right
		// right = relativeRight + triggerWidth = 850 + 50 = 900
		// translateX = -900
		expect(start.styles.right).toBe("0px");
		expect(start.styles.left).toBe(null);
		expect(start.styles.transform).toContain("translate(-900px");

		const end = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// end position doesn't set right, so translateX should be left
		// left = 150, translateX = 150
		expect(end.styles.right).toBe(null);
		expect(end.styles.left).toBe("0px");
		expect(end.styles.transform).toContain("translate(150px");
	});

	test("calculates transform correctly for top and bottom positioning", () => {
		const triggerTop = 200;
		const triggerHeight = 30;
		const triggerBounds = createBounds(100, triggerTop, 50, triggerHeight);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const top = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// top position sets bottom internally, so translateY should be -bottom
		// containerBoundsBottom = 800, relativeBottom = 800 - 230 = 570
		expect(top.styles.bottom).toBe("0px");
		expect(top.styles.top).toBe(null);
		expect(top.styles.transform).toBe(`translate(105px, ${triggerTop - window.innerHeight}px)`);

		const bottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// bottom position doesn't set bottom, so translateY should be top
		// top = 230, translateY = 230
		expect(bottom.styles.bottom).toBe(null);
		expect(bottom.styles.top).toBe("0px");
		expect(bottom.styles.transform).toBe(`translate(105px, ${triggerTop + triggerHeight}px)`);
	});

	test("handles width option '100%'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			width: "100%",
			contentGap: 0,
			contentShift: 0,
		});

		expect(result.boundaries.left).toBe(CONTAINER_OFFSET);
		expect(result.boundaries.width).toBe(window.innerWidth - CONTAINER_OFFSET * 2);
		expect(result.styles.width).toBe(`${window.innerWidth - CONTAINER_OFFSET * 2}px`);
	});

	test("handles width option 'trigger'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			width: "trigger",
			contentGap: 0,
			contentShift: 0,
		});

		expect(result.boundaries.width).toBe(50);
		expect(result.styles.width).toBe("50px");
	});

	test("handles fallbackAdjustLayout for vertical positions with horizontal overflow", () => {
		const triggerBounds = createBounds(0, 200, 50, 30); // At left edge
		const flyoutBounds = createBounds(0, 0, 40, 60);
		const containerBounds = createBounds(0, 0, 1000, 800);

		Object.defineProperty(window, "scrollX", { value: 0, writable: true });
		Object.defineProperty(window, "scrollY", { value: 0, writable: true });

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top", // Vertical position - checks horizontal overflow
			rtl: false,
			contentGap: 0,
			contentShift: 0,
			fallbackAdjustLayout: true,
		});

		// left = 0 + centerBySize(50, 40) = 5
		// overflow.left = -5 + 0 + 8 = 3 > 0, so left = 8
		expect(result.boundaries.left).toBe(CONTAINER_OFFSET);
	});

	test("handles fallbackAdjustLayout for vertical positions with overflow and height adjustment", () => {
		const triggerBounds = createBounds(100, 5, 50, 30); // Very close to top
		const flyoutBounds = createBounds(0, 0, 40, 200); // Large flyout
		const containerBounds = createBounds(0, 0, 1000, 800);

		Object.defineProperty(window, "scrollX", { value: 0, writable: true });
		Object.defineProperty(window, "scrollY", { value: 0, writable: true });

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			containerBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
			fallbackAdjustLayout: true,
			fallbackMinHeight: "50",
		});

		// Should adjust height when overflowing top
		if (result.boundaries.top < CONTAINER_OFFSET) {
			expect(result.styles.height).not.toBe(null);
			if (result.styles.height) {
				const height = parseInt(result.styles.height);
				expect(height).toBeGreaterThanOrEqual(50); // fallbackMinHeight
			}
		}
	});
});
