import type * as T from "./types";

export const SCREEN_OFFSET = 16;

export const topPositions: T.Position[] = ["top-start", "top", "top-end"];
export const bottomPositions: T.Position[] = ["bottom-start", "bottom", "bottom-end"];
export const startPositions: T.Position[] = ["start", "start-bottom", "start-top"];
export const endPositions: T.Position[] = ["end", "end-bottom", "end-top"];

export const fallbackOrder: Record<T.PositionOrder, T.Position[]> = {
	top: [...topPositions, ...bottomPositions, ...endPositions, ...startPositions],
	bottom: [...bottomPositions, ...topPositions, ...endPositions, ...startPositions],
	start: [...startPositions, ...endPositions, ...topPositions, ...bottomPositions],
	end: [...endPositions, ...startPositions, ...topPositions, ...bottomPositions],
};
