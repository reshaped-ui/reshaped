import type * as T from "./types";
import { SCREEN_OFFSET } from "./constants";
import { getRTLPosition, centerBySize } from "./utilities";

/**
 * Calculate styles for the current position
 */
const position = (
	originBounds: DOMRect,
	targetBounds: DOMRect,
	parentOffset: { top: number; left: number },
	options: T.Options
): {
	styles: T.PositionStyles;
	position: T.Position;
} => {
	const { position: passedPosition, rtl, width } = options;
	let left = 0;
	let top = 0;

	let position = passedPosition;
	if (rtl) position = getRTLPosition(position);
	if (width === "full" || width === "trigger") {
		position = position.includes("top") ? "top" : "bottom";
	}

	switch (position) {
		case "bottom":
		case "top":
			left = centerBySize(originBounds.width, targetBounds.width) + originBounds.left;
			break;

		case "start":
		case "start-top":
		case "start-bottom":
			left = originBounds.left - targetBounds.width;
			break;

		case "end":
		case "end-top":
		case "end-bottom":
			left = originBounds.right;
			break;

		case "top-start":
		case "bottom-start":
			left = originBounds.left;
			break;

		case "top-end":
		case "bottom-end":
			left = originBounds.right - targetBounds.width;
			break;

		default:
			break;
	}

	switch (position) {
		case "top":
		case "top-start":
		case "top-end":
			top = originBounds.top - targetBounds.height;
			break;

		case "bottom":
		case "bottom-start":
		case "bottom-end":
			top = originBounds.bottom;
			break;

		case "start":
		case "end":
			top = centerBySize(originBounds.height, targetBounds.height) + originBounds.top;
			break;

		case "start-top":
		case "end-top":
			top = originBounds.top;
			break;

		case "start-bottom":
		case "end-bottom":
			top = originBounds.bottom - targetBounds.height;
			break;

		default:
			break;
	}

	if (top === undefined || left === undefined) {
		throw Error(`[Reshaped, flyout]: ${position} position is not valid`);
	}

	top = Math.round(top + (window.scrollY || 0) - parentOffset.top);
	left = Math.round(left + (window.scrollX || 0) - parentOffset.left);
	let widthStyle = Math.ceil(targetBounds.width);
	const height = Math.ceil(targetBounds.height);

	if (width === "full") {
		left = SCREEN_OFFSET;
		widthStyle = window.innerWidth - SCREEN_OFFSET * 2;
	} else if (width === "trigger") {
		widthStyle = originBounds.width;
	}

	const styles = { left, top, width: widthStyle, height };

	return { styles, position };
};

export default position;
