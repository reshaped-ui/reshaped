import type * as T from "../Flyout.types";

/** Mirror the position for RTL */
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
