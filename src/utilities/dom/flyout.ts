import type * as G from "types/global";

export const getRectFromCoordinates = (coordinates: DOMRect | G.Coordinates): DOMRect => {
	if ("width" in coordinates && coordinates.width !== undefined) return coordinates;

	return {
		...coordinates,
		width: 0,
		height: 0,
		left: coordinates.x,
		right: coordinates.x,
		top: coordinates.y,
		bottom: coordinates.y,
		toJSON: () => {},
	};
};
