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

	const triggerWidth = triggerBounds.width;
	const triggerHeight = triggerBounds.height;

	// Detect passed container scroll to sync the flyout position with it
	const containerX = passedContainer?.scrollLeft;
	const containerY = passedContainer?.scrollTop;

	const scrollX = containerX ?? window.scrollX;
	const scrollY = containerY ?? window.scrollY;

	const renderContainerHeight = passedContainer?.clientHeight ?? window.innerHeight;
	const renderContainerWidth = passedContainer?.clientWidth ?? window.innerWidth;

	// When rendering in the body, bottom bounds will be larrger than the viewport so we calculate it manually
	const containerBoundsBottom = passedContainer
		? containerBounds.bottom
		: window.innerHeight - scrollY;

	// When inside a container, adjut position based on the container scroll since flyout is rendered outside the scroll area
	const relativeLeft = triggerBounds.left - containerBounds.left + (containerX || 0);
	const relativeRight = containerBounds.right - triggerBounds.right - (containerX || 0);
	const relativeTop = triggerBounds.top - containerBounds.top + (containerY || 0);
	const relativeBottom = containerBoundsBottom - triggerBounds.bottom - (containerY || 0);

	switch (position) {
		case "start":
		case "start-top":
		case "start-bottom":
			left = relativeLeft - flyoutWidth;
			right = relativeRight + triggerWidth;
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
			top = relativeTop - flyoutHeight;
			bottom = relativeBottom + triggerHeight;
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
		const topOverflowSize = -top + scrollY + SCREEN_OFFSET;
		const bottomOverflowSize = top + flyoutHeight + SCREEN_OFFSET - scrollY - renderContainerHeight;
		const leftOverflowSize = -left + scrollX + SCREEN_OFFSET;
		const rightOverflowSize = left + flyoutWidth + SCREEN_OFFSET - scrollX - renderContainerWidth;

		if (isHorizontalPosition) {
			if (topOverflowSize > 0) {
				top = SCREEN_OFFSET + scrollY;
				if (bottom !== null) bottom = bottom - topOverflowSize;
			} else if (bottomOverflowSize > 0) {
				console.log({ bottomOverflowSize, renderContainerHeight });
				top = top - bottomOverflowSize;
			}
		} else {
			if (leftOverflowSize > 0) {
				left = SCREEN_OFFSET + scrollX;
				if (right !== null) right = right - leftOverflowSize;
			} else if (rightOverflowSize > 0) {
				left = left - rightOverflowSize;
			}
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
