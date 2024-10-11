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
	args: T.Options & {
		triggerBounds: DOMRect;
		flyoutBounds: DOMRect;
		scopeOffset: Record<"left" | "top", number>;
	}
) => {
	const {
		triggerBounds,
		flyoutBounds,
		scopeOffset,
		position: passedPosition,
		rtl,
		width,
		contentGap = 0,
	} = args;
	const isFullWidth = width === "full" || width === "100%";
	let left = 0;
	let top = 0;

	let position = passedPosition;
	if (rtl) position = getRTLPosition(position);
	if (isFullWidth || width === "trigger") {
		position = position.includes("top") ? "top" : "bottom";
	}

	const isHorizontalPosition = position.match(/^(start|end)/);
	const isVerticalPosition = position.match(/^(top|bottom)/);

	const flyoutWidth = flyoutBounds.width + (isHorizontalPosition ? contentGap : 0);
	const flyoutHeight = flyoutBounds.height + (isVerticalPosition ? contentGap : 0);

	switch (position) {
		case "bottom":
		case "top":
			left = centerBySize(triggerBounds.width, flyoutWidth) + triggerBounds.left;
			break;

		case "start":
		case "start-top":
		case "start-bottom":
			left = triggerBounds.left - flyoutWidth;

			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = triggerBounds.right;
			break;

		case "top-start":
		case "bottom-start":
			left = triggerBounds.left;
			break;

		case "top-end":
		case "bottom-end":
			left = triggerBounds.right - flyoutWidth;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			top = triggerBounds.top - flyoutHeight;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = triggerBounds.bottom;
			break;

		case "start":
		case "end":
			top = centerBySize(triggerBounds.height, flyoutHeight) + triggerBounds.top;
			break;

		case "start-top":
		case "end-top":
			top = triggerBounds.top;
			break;

		case "start-bottom":
		case "end-bottom":
			top = triggerBounds.bottom - flyoutHeight;
			break;

		default:
			break;
	}

	if (top === undefined || left === undefined) {
		throw Error(`[Reshaped, flyout]: ${position} position is not valid`);
	}

	top = Math.round(top + (window.scrollY || 0) - scopeOffset.top);
	left = Math.round(left + (window.scrollX || 0) - scopeOffset.left);
	let widthStyle = Math.ceil(flyoutWidth);
	const height = Math.ceil(flyoutHeight);

	if (isFullWidth) {
		left = SCREEN_OFFSET;
		widthStyle = window.innerWidth - SCREEN_OFFSET * 2;
	} else if (width === "trigger") {
		widthStyle = triggerBounds.width;
	}

	const styles = { left, top, width: widthStyle, height };

	return { styles, position, scopeOffset };
};

export default calculatePosition;
