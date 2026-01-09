import type { Side, Position } from "../types";

// All available positions for each side
const positions: Record<Side, Position[]> = {
	top: ["top-start", "top-end", "top"],
	bottom: ["bottom-start", "bottom-end", "bottom"],
	start: ["start-top", "start-bottom", "start"],
	end: ["end-top", "end-bottom", "end"],
};

// Order of sides to try depending on the starting side
const fallbackOrder: Record<Side, Side[]> = {
	top: ["bottom", "start", "end"],
	bottom: ["top", "end", "start"],
	start: ["end", "top", "bottom"],
	end: ["start", "bottom", "top"],
};

/**
 * Get an order of positions to try to fit flyout on the screen based on its starting position
 * @param position - position being checked
 * @param availableFallbacks
 */
const getPositionFallbacks = (position: Position, availableFallbacks?: Position[]): Position[] => {
	const result = new Set<Position>([position]);
	const chunks = position.split("-") as [Side, string];
	const [firstChunk] = chunks;
	const passedPositionOrder = positions[firstChunk];
	const startingFallbackIndex = passedPositionOrder.indexOf(position);
	const fallbackIndexOrder = [startingFallbackIndex];

	passedPositionOrder.forEach((_, index) => {
		if (index === startingFallbackIndex) return;
		fallbackIndexOrder.push(index);
	});

	[firstChunk, ...fallbackOrder[firstChunk]].forEach((fallbackSide) => {
		const fallbackOrder = positions[fallbackSide];

		fallbackIndexOrder.forEach((index) => {
			const position = fallbackOrder[index];

			if (availableFallbacks?.indexOf(position) === -1) return;
			result.add(position);
		});
	});

	return Array.from(result);
};

export default getPositionFallbacks;
