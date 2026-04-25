import type { Position } from "../types";
import centerBySize from "./centerBySize";
import getRTLPosition from "./getRTLPosition";

type CalculatePositionArgs = {
	triggerBounds: DOMRect;
	flyoutBounds: DOMRect;
	position: Position;
	rtl: boolean;
	contentGap: number;
	contentShift: number;
};

export type CalculatePositionResult = {
	position: Position;
	styles: {
		top: number;
		left: number;
		bottom: number | null;
		right: number | null;
	};
};

const calculatePosition = (args: CalculatePositionArgs): CalculatePositionResult => {
	const {
		triggerBounds,
		flyoutBounds,
		position: passedPosition,
		rtl,
		contentGap = 0,
		contentShift = 0,
	} = args;
	const position = rtl ? getRTLPosition(passedPosition) : passedPosition;

	let left = 0;
	let top = 0;
	let bottom: number | null = null;
	let right: number | null = null;

	const { width: flyoutWidth, height: flyoutHeight } = flyoutBounds;
	const {
		width: triggerWidth,
		height: triggerHeight,
		left: triggerLeft,
		top: triggerTop,
		right: triggerRight,
		bottom: triggerBottom,
	} = triggerBounds;

	// Convert rect values to css position values
	const relativeLeft = triggerLeft;
	const relativeRight = window.innerWidth - triggerRight;
	const relativeTop = triggerTop;
	const relativeBottom = window.innerHeight - triggerBottom;

	switch (position) {
		case "start":
		case "start-top":
		case "start-bottom":
			left = relativeLeft - flyoutWidth - contentGap;
			right = relativeRight + triggerWidth + contentGap;
			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = relativeLeft + triggerWidth + contentGap;
			break;

		case "bottom":
		case "top":
			left = relativeLeft + centerBySize(triggerWidth, flyoutWidth) + contentShift;
			break;

		case "top-start":
		case "bottom-start":
			left = relativeLeft + contentShift;
			break;

		case "top-end":
		case "bottom-end":
			left = relativeLeft + triggerWidth - flyoutWidth + contentShift;
			right = relativeRight - contentShift;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			top = relativeTop - flyoutHeight - contentGap;
			bottom = relativeBottom + triggerHeight + contentGap;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = relativeTop + triggerHeight + contentGap;
			break;

		case "start":
		case "end":
			top = relativeTop + centerBySize(triggerHeight, flyoutHeight) + contentShift;
			break;

		case "start-top":
		case "end-top":
			top = relativeTop + contentShift;
			break;

		case "start-bottom":
		case "end-bottom":
			top = relativeTop + triggerHeight - flyoutHeight + contentShift;
			bottom = relativeBottom - contentShift;
			break;

		default:
			break;
	}

	return {
		position,
		styles: {
			top,
			left,
			bottom,
			right,
		},
	};
};

export default calculatePosition;
