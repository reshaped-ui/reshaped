import type * as T from "../Flyout.types";
import { getRTLPosition, centerBySize } from "./helpers";

const SCREEN_OFFSET = 8;

/**
 * Calculate styles for the current position
 */
const calculatePosition = (
	args: {
		triggerBounds: DOMRect;
		flyoutBounds: { width: number; height: number };
		passedContainer?: HTMLElement | null;
		containerBounds: DOMRect;
	} & Pick<
		T.Options,
		"position" | "rtl" | "width" | "contentGap" | "contentShift" | "fallbackAdjustLayout"
	>
) => {
	const {
		triggerBounds,
		flyoutBounds,
		containerBounds,
		position: passedPosition,
		rtl,
		width,
		contentGap = 0,
		contentShift = 0,
		passedContainer,
		fallbackAdjustLayout,
	} = args;
	const isFullWidth = width === "full" || width === "100%";
	let left: number = 0;
	let top: number = 0;
	let bottom: number | null = null;
	let right: number | null = null;

	let position = passedPosition;
	if (rtl) position = getRTLPosition(position);
	if (isFullWidth || width === "trigger") {
		position = position.includes("top") ? "top" : "bottom";
	}

	const isHorizontalPosition = !!position.match(/^(start|end)/);

	// contentGap adds padding to the flyout to make sure it doesn't disapper while moving the mouse to the content
	// So its width/height is bigger than the visible part of the content
	const flyoutWidth = flyoutBounds.width + (isHorizontalPosition ? contentGap : 0);
	const flyoutHeight = flyoutBounds.height + (!isHorizontalPosition ? contentGap : 0);

	const triggerHeight = triggerBounds.height;
	const triggerWidth = triggerBounds.width;
	const containerY = passedContainer?.scrollTop || 0;
	const containerX = passedContainer?.scrollLeft || 0;

	const relativeLeft = triggerBounds.left - containerBounds.left + containerX;
	const relativeTop = triggerBounds.top - containerBounds.top + containerY;
	const relativeRight = containerBounds.right - triggerBounds.right - containerX;
	const relativeBottom = containerBounds.bottom - triggerBounds.bottom - containerY;

	switch (position) {
		case "start":
		case "start-top":
		case "start-bottom":
			right = relativeRight + triggerWidth;
			left = relativeLeft - flyoutWidth;
			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = relativeLeft + triggerWidth;
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
			right = relativeRight - contentShift;
			left = relativeLeft + triggerWidth - flyoutWidth + contentShift;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			bottom = relativeBottom + triggerHeight;
			top = relativeTop - flyoutHeight;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = relativeTop + triggerHeight;
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
		const topOverflowSize = -top;
		const bottomOverflowSize = top + flyoutHeight - containerBounds.bottom;
		const leftOverflowSize = -left;
		const rightOverflowSize = left + flyoutWidth - containerBounds.right;

		if (topOverflowSize > 0) {
			// Can happen for start/end and start-bottom/end-bottom
			if (bottom !== null) bottom = bottom - topOverflowSize - SCREEN_OFFSET;
			top = SCREEN_OFFSET;
		} else if (bottomOverflowSize > 0) {
			// Can happen for start-top/end-top
			top = top - bottomOverflowSize - SCREEN_OFFSET;
		}

		if (leftOverflowSize > 0) {
			// Can happen for top/bottom and top-end/bottom-end
			if (right !== null) right = right - leftOverflowSize - SCREEN_OFFSET;
			left = SCREEN_OFFSET;
		} else if (rightOverflowSize > 0) {
			// Can happen for top-start/bottom-start
			left = left - rightOverflowSize - SCREEN_OFFSET;
		}
	}

	let widthStyle;
	if (isFullWidth) {
		left = SCREEN_OFFSET;
		widthStyle = window.innerWidth - SCREEN_OFFSET * 2;
	} else if (width === "trigger") {
		widthStyle = triggerBounds.width;
	}

	const translateX = right !== null ? -right : left;
	const translateY = bottom !== null ? -bottom : top;

	return {
		position,
		styles: {
			width: widthStyle ?? width,
			left: right === null ? 0 : undefined,
			right: right === null ? undefined : 0,
			top: bottom === null ? 0 : undefined,
			bottom: bottom === null ? undefined : 0,
			transform: `translate(${translateX}px, ${translateY}px)`,
		},
		boundaries: {
			left,
			top,
			height: Math.ceil(flyoutHeight),
			width: widthStyle ?? Math.ceil(flyoutWidth),
		},
	};
};

export default calculatePosition;
