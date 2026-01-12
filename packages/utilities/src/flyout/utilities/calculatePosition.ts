import { VIEWPORT_OFFSET } from "../constants";

import centerBySize from "./centerBySize";
import getRTLPosition from "./getRTLPosition";

import type { Width, Position } from "../types";

type Args = {
	triggerBounds: DOMRect;
	flyoutBounds: DOMRect;
	position: Position;
	rtl: boolean;
	width?: Width;
	contentGap: number;
	contentShift: number;
	fallbackAdjustLayout?: boolean;
	fallbackMinHeight?: string;
};

const calculatePosition = (args: Args) => {
	const {
		triggerBounds,
		flyoutBounds,
		position: passedPosition,
		rtl,
		width: passedWidth,
		contentGap = 0,
		contentShift = 0,
		fallbackAdjustLayout,
		fallbackMinHeight,
	} = args;
	const position = rtl ? getRTLPosition(passedPosition) : passedPosition;
	const isHorizontalPosition = !!position.match(/^(start|end)/);

	let left: number = 0;
	let top: number = 0;
	let bottom: number | null = null;
	let right: number | null = null;
	let height: number | null = null;
	let width: number | null = null;

	const { width: flyoutWidth, height: flyoutHeight } = flyoutBounds;
	const {
		width: triggerWidth,
		height: triggerHeight,
		left: triggerLeft,
		top: triggerTop,
		right: triggerRight,
		bottom: triggerBottom,
	} = triggerBounds;
	const { innerHeight: containerHeight, innerWidth: containerWidth, scrollX, scrollY } = window;

	// Convert rect values to css position values
	const relativeLeft = triggerLeft + scrollX;
	const relativeRight = containerWidth - triggerRight - scrollX;
	const relativeTop = triggerTop + scrollY;
	const relativeBottom = containerHeight - triggerBottom - scrollY;

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

	if (fallbackAdjustLayout) {
		const getOverflow = () => {
			return {
				top: -top + scrollY + VIEWPORT_OFFSET,
				bottom: top + flyoutHeight + VIEWPORT_OFFSET - scrollY - containerHeight,
				left: -left + scrollX + VIEWPORT_OFFSET,
				right: left + flyoutWidth + VIEWPORT_OFFSET - scrollX - containerWidth,
			};
		};

		const overflow = getOverflow();

		if (isHorizontalPosition) {
			if (overflow.top > 0) {
				top = VIEWPORT_OFFSET + scrollY;
				if (bottom !== null) bottom = bottom - overflow.top;
			} else if (overflow.bottom > 0) {
				top = top - overflow.bottom;
			}
		} else {
			if (overflow.left > 0) {
				left = VIEWPORT_OFFSET + scrollX;
				if (right !== null) right = right - overflow.left;
			} else if (overflow.right > 0) {
				left = left - overflow.right;
			}
		}

		const updatedOverflow = getOverflow();

		if (updatedOverflow.top > 0) {
			height = Math.max(parseInt(fallbackMinHeight ?? "0"), flyoutHeight - updatedOverflow.top);
			top = top + (flyoutHeight - height);
		} else if (updatedOverflow.bottom > 0) {
			height = Math.max(parseInt(fallbackMinHeight ?? "0"), flyoutHeight - updatedOverflow.bottom);
			if (bottom !== null) bottom = bottom + (flyoutHeight - height);
		}
	}

	if (passedWidth === "100%") {
		left = VIEWPORT_OFFSET;
		width = window.innerWidth - VIEWPORT_OFFSET * 2;
	} else if (passedWidth === "trigger") {
		width = triggerBounds.width;
	}

	const translateX = right !== null ? -right : left;
	const translateY = bottom !== null ? -bottom : top;

	return {
		position,
		styles: {
			left: right === null ? "0px" : null,
			right: right === null ? null : "0px",
			top: bottom === null ? "0px" : null,
			bottom: bottom === null ? null : "0px",
			transform: `translate(${translateX}px, ${translateY}px)`,
			height: height !== null ? `${height}px` : null,
			width: width !== null ? `${width}px` : (passedWidth ?? null),
		},
		boundaries: {
			left,
			top,
			height: height ?? Math.ceil(flyoutHeight),
			width: width ?? Math.ceil(flyoutWidth),
		},
	};
};

export default calculatePosition;
