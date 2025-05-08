import type * as T from "../Flyout.types";

const SCREEN_OFFSET = 16;

const getRTLPosition = (position: T.Position) => {
	if (position.includes("start")) return position.replace("start", "end") as T.Position;
	if (position.includes("end")) return position.replace("end", "start") as T.Position;
	return position;
};

/**
 * Get a position value which centers 2 elements vertically or horizontally
 */
const centerBySize = (originSize: number, targetSize: number) => {
	return Math.floor(originSize / 2 - targetSize / 2);
};

/**
 * Calculate styles for the current position
 */
const calculatePosition = (
	args: {
		triggerBounds: DOMRect;
		flyoutBounds: { width: number; height: number };
		passedContainer?: HTMLElement | null;
		containerBounds: DOMRect;
	} & Pick<T.Options, "position" | "rtl" | "width" | "contentGap" | "contentShift">
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
	const isVerticalPosition = !!position.match(/^(top|bottom)/);

	// contentGap adds padding to the flyout to make sure it doesn't disapper while moving the mouse to the content
	// So its width/height is bigger than the visible part of the content
	const flyoutWidth = flyoutBounds.width + (isHorizontalPosition ? contentGap : 0);
	const flyoutHeight = flyoutBounds.height + (isVerticalPosition ? contentGap : 0);

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
			bottom = relativeBottom - contentShift;
			top = relativeTop + triggerHeight - flyoutHeight + contentShift;
			break;

		default:
			break;
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
			width: widthStyle,
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
