import { beforeEach, describe, expect, test, vi } from "vitest";

import calculatePosition from "../calculatePosition";

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

	beforeEach(() => {
		// Set consistent viewport dimensions for tests
		Object.defineProperty(window, "innerWidth", { value: 1000, writable: true });
		Object.defineProperty(window, "innerHeight", { value: 800, writable: true });
	});

	test("calculates position for 'top'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// top: relativeTop - flyoutHeight - contentGap = 200 - 60 - 0 = 140
		// left: relativeLeft + centerBySize(triggerWidth, flyoutWidth) = 100 + (50/2 - 40/2) = 105
		// bottom: relativeBottom + triggerHeight + contentGap = (800 - 230) + 30 + 0 = 600
		// right: null
		expect(result.position).toBe("top");
		expect(result.styles.top).toBe(140);
		expect(result.styles.left).toBe(105);
		expect(result.styles.bottom).toBe(600);
		expect(result.styles.right).toBe(null);
	});

	test("calculates position for 'bottom'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// top: relativeTop + triggerHeight + contentGap = 200 + 30 + 0 = 230
		// left: relativeLeft + centerBySize(triggerWidth, flyoutWidth) = 100 + 5 = 105
		// bottom: null
		// right: null
		expect(result.position).toBe("bottom");
		expect(result.styles.top).toBe(230);
		expect(result.styles.left).toBe(105);
		expect(result.styles.bottom).toBe(null);
		expect(result.styles.right).toBe(null);
	});

	test("calculates position for 'start'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft - flyoutWidth - contentGap = 100 - 40 - 0 = 60
		// right: relativeRight + triggerWidth + contentGap = (1000 - 150) + 50 + 0 = 900
		// top: relativeTop + centerBySize(triggerHeight, flyoutHeight) = 200 + (30/2 - 60/2) = 185
		// bottom: null
		expect(result.position).toBe("start");
		expect(result.styles.left).toBe(60);
		expect(result.styles.right).toBe(900);
		expect(result.styles.top).toBe(185);
		expect(result.styles.bottom).toBe(null);
	});

	test("calculates position for 'end'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth + contentGap = 100 + 50 + 0 = 150
		// right: null
		// top: relativeTop + centerBySize(triggerHeight, flyoutHeight) = 200 + (30/2 - 60/2) = 185
		// bottom: null
		expect(result.position).toBe("end");
		expect(result.styles.left).toBe(150);
		expect(result.styles.right).toBe(null);
		expect(result.styles.top).toBe(185);
		expect(result.styles.bottom).toBe(null);
	});

	test("calculates position for 'top-start'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + contentShift = 100 + 0 = 100
		// top: relativeTop - flyoutHeight - contentGap = 200 - 60 - 0 = 140
		// bottom: relativeBottom + triggerHeight + contentGap = 570 + 30 + 0 = 600
		// right: null
		expect(result.position).toBe("top-start");
		expect(result.styles.left).toBe(100);
		expect(result.styles.top).toBe(140);
		expect(result.styles.bottom).toBe(600);
		expect(result.styles.right).toBe(null);
	});

	test("calculates position for 'top-end'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth - flyoutWidth + contentShift = 100 + 50 - 40 + 0 = 110
		// right: relativeRight - contentShift = 850 - 0 = 850
		// top: relativeTop - flyoutHeight - contentGap = 200 - 60 - 0 = 140
		// bottom: relativeBottom + triggerHeight + contentGap = 570 + 30 + 0 = 600
		expect(result.position).toBe("top-end");
		expect(result.styles.left).toBe(110);
		expect(result.styles.right).toBe(850);
		expect(result.styles.top).toBe(140);
		expect(result.styles.bottom).toBe(600);
	});

	test("calculates position for 'bottom-start'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "bottom-start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + contentShift = 100 + 0 = 100
		// top: relativeTop + triggerHeight + contentGap = 200 + 30 + 0 = 230
		// bottom: null
		// right: null
		expect(result.position).toBe("bottom-start");
		expect(result.styles.left).toBe(100);
		expect(result.styles.top).toBe(230);
		expect(result.styles.bottom).toBe(null);
		expect(result.styles.right).toBe(null);
	});

	test("calculates position for 'bottom-end'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "bottom-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth - flyoutWidth + contentShift = 100 + 50 - 40 + 0 = 110
		// right: relativeRight - contentShift = 850 - 0 = 850
		// top: relativeTop + triggerHeight + contentGap = 200 + 30 + 0 = 230
		// bottom: null
		expect(result.position).toBe("bottom-end");
		expect(result.styles.left).toBe(110);
		expect(result.styles.right).toBe(850);
		expect(result.styles.top).toBe(230);
		expect(result.styles.bottom).toBe(null);
	});

	test("calculates position for 'start-top'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start-top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft - flyoutWidth - contentGap = 100 - 40 - 0 = 60
		// right: relativeRight + triggerWidth + contentGap = 850 + 50 + 0 = 900
		// top: relativeTop + contentShift = 200 + 0 = 200
		// bottom: null
		expect(result.position).toBe("start-top");
		expect(result.styles.left).toBe(60);
		expect(result.styles.right).toBe(900);
		expect(result.styles.top).toBe(200);
		expect(result.styles.bottom).toBe(null);
	});

	test("calculates position for 'start-bottom'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft - flyoutWidth - contentGap = 100 - 40 - 0 = 60
		// right: relativeRight + triggerWidth + contentGap = 850 + 50 + 0 = 900
		// top: relativeTop + triggerHeight - flyoutHeight + contentShift = 200 + 30 - 60 + 0 = 170
		// bottom: relativeBottom - contentShift = 570 - 0 = 570
		expect(result.position).toBe("start-bottom");
		expect(result.styles.left).toBe(60);
		expect(result.styles.right).toBe(900);
		expect(result.styles.top).toBe(170);
		expect(result.styles.bottom).toBe(570);
	});

	test("calculates position for 'end-top'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end-top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth + contentGap = 100 + 50 + 0 = 150
		// right: null
		// top: relativeTop + contentShift = 200 + 0 = 200
		// bottom: null
		expect(result.position).toBe("end-top");
		expect(result.styles.left).toBe(150);
		expect(result.styles.right).toBe(null);
		expect(result.styles.top).toBe(200);
		expect(result.styles.bottom).toBe(null);
	});

	test("calculates position for 'end-bottom'", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth + contentGap = 100 + 50 + 0 = 150
		// right: null
		// top: relativeTop + triggerHeight - flyoutHeight + contentShift = 200 + 30 - 60 + 0 = 170
		// bottom: relativeBottom - contentShift = 570 - 0 = 570
		expect(result.position).toBe("end-bottom");
		expect(result.styles.left).toBe(150);
		expect(result.styles.right).toBe(null);
		expect(result.styles.top).toBe(170);
		expect(result.styles.bottom).toBe(570);
	});

	test("applies contentGap for vertical positions", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const top = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// top: relativeTop - flyoutHeight - contentGap = 200 - 60 - 10 = 130
		// bottom: relativeBottom + triggerHeight + contentGap = 570 + 30 + 10 = 610
		expect(top.styles.top).toBe(130);
		expect(top.styles.bottom).toBe(610);

		const bottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "bottom",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// top: relativeTop + triggerHeight + contentGap = 200 + 30 + 10 = 240
		expect(bottom.styles.top).toBe(240);
	});

	test("applies contentGap for horizontal positions", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// left: relativeLeft - flyoutWidth - contentGap = 100 - 40 - 10 = 50
		// right: relativeRight + triggerWidth + contentGap = 850 + 50 + 10 = 910
		expect(start.styles.left).toBe(50);
		expect(start.styles.right).toBe(910);

		const end = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end",
			rtl: false,
			contentGap: 10,
			contentShift: 0,
		});

		// left: relativeLeft + triggerWidth + contentGap = 100 + 50 + 10 = 160
		expect(end.styles.left).toBe(160);
	});

	test("applies contentShift for centered positions", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const top = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 10,
		});

		// left: relativeLeft + centerBySize(50, 40) + contentShift = 100 + 5 + 10 = 115
		expect(top.styles.left).toBe(115);

		const start = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 10,
		});

		// top: relativeTop + centerBySize(30, 60) + contentShift = 200 + (-15) + 10 = 195
		expect(start.styles.top).toBe(195);
	});

	test("applies contentShift for aligned positions", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		const topStart = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-start",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// left: relativeLeft + contentShift = 100 + 5 = 105
		expect(topStart.styles.left).toBe(105);

		const topEnd = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-end",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// left: relativeLeft + triggerWidth - flyoutWidth + contentShift = 100 + 50 - 40 + 5 = 115
		// right: relativeRight - contentShift = 850 - 5 = 845
		expect(topEnd.styles.left).toBe(115);
		expect(topEnd.styles.right).toBe(845);

		const startTop = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start-top",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// top: relativeTop + contentShift = 200 + 5 = 205
		expect(startTop.styles.top).toBe(205);

		const startBottom = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 5,
		});

		// top: relativeTop + triggerHeight - flyoutHeight + contentShift = 200 + 30 - 60 + 5 = 175
		// bottom: relativeBottom - contentShift = 570 - 5 = 565
		expect(startBottom.styles.top).toBe(175);
		expect(startBottom.styles.bottom).toBe(565);
	});

	test("converts positions for RTL", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		// 'start' in RTL should behave like 'end' in LTR
		const startRTL = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start",
			rtl: true,
			contentGap: 0,
			contentShift: 0,
		});

		const endLTR = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		expect(startRTL.position).toBe("end");
		expect(startRTL.styles).toEqual(endLTR.styles);

		// 'top-start' in RTL should behave like 'top-end' in LTR
		const topStartRTL = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-start",
			rtl: true,
			contentGap: 0,
			contentShift: 0,
		});

		const topEndLTR = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top-end",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		expect(topStartRTL.position).toBe("top-end");
		expect(topStartRTL.styles).toEqual(topEndLTR.styles);

		// 'end-bottom' in RTL should behave like 'start-bottom' in LTR
		const endBottomRTL = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "end-bottom",
			rtl: true,
			contentGap: 0,
			contentShift: 0,
		});

		const startBottomLTR = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start-bottom",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		expect(endBottomRTL.position).toBe("start-bottom");
		expect(endBottomRTL.styles).toEqual(startBottomLTR.styles);
	});

	test("handles different viewport sizes", () => {
		const triggerBounds = createBounds(100, 200, 50, 30);
		const flyoutBounds = createBounds(0, 0, 40, 60);

		Object.defineProperty(window, "innerWidth", { value: 1920, writable: true });
		Object.defineProperty(window, "innerHeight", { value: 1080, writable: true });

		const result = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "start",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeRight = 1920 - 150 = 1770
		// right: relativeRight + triggerWidth + contentGap = 1770 + 50 + 0 = 1820
		expect(result.styles.right).toBe(1820);

		const result2 = calculatePosition({
			triggerBounds,
			flyoutBounds,
			position: "top",
			rtl: false,
			contentGap: 0,
			contentShift: 0,
		});

		// relativeBottom = 1080 - 230 = 850
		// bottom: relativeBottom + triggerHeight + contentGap = 850 + 30 + 0 = 880
		expect(result2.styles.bottom).toBe(880);
	});
});
