import type { Coordinates } from "../types";

/**
 * Include any missing properties to match DOMRect interface when coordinates are passed
 */
const getRectFromCoordinates = (coordinates: DOMRect | Coordinates): DOMRect => {
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

export default getRectFromCoordinates;
