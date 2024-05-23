import type * as T from "./types";
import { fallbackOrder } from "./constants";

/**
 * Mirror position to its RTL value
 */
export const getRTLPosition = (position: T.Position) => {
	if (position.includes("start")) return position.replace("start", "end") as T.Position;
	if (position.includes("end")) return position.replace("end", "start") as T.Position;
	return position;
};

/**
 * Get a position value which centers 2 elements vertically or horizontally
 */
export const centerBySize = (originSize: number, targetSize: number) => {
	return Math.floor(originSize / 2 - targetSize / 2);
};

/**
 * Get an order of positions to try to fit popover on the screen based on its starting position
 */
export const getPositionOrder = (position: T.Position) => {
	const types: Array<T.PositionOrder> = ["top", "bottom", "start", "end"];
	const type = types.find((type) => position.startsWith(type)) || "bottom";
	return fallbackOrder[type];
};

/**
 * Check if element visually fits on the screen
 */
export const fullyVisible = (bounds: T.PositionStyles) => {
	const htmlEl = document.documentElement;
	const pageLeft = htmlEl.scrollLeft;
	const pageRight = pageLeft + htmlEl.clientWidth;
	const pageTop = htmlEl.scrollTop;
	const pageBottom = pageTop + htmlEl.clientHeight;

	return (
		bounds.left >= pageLeft &&
		bounds.left + bounds.width <= pageRight &&
		bounds.top >= pageTop &&
		bounds.top + bounds.height <= pageBottom
	);
};
