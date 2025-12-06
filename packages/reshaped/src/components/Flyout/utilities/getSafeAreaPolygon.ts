import type * as T from "../Flyout.types";

type Coords = { x: number; y: number };

/**
 * Get the primary side of the flyout position (top, bottom, start, end)
 */
const getPrimarySide = (position: T.Position): T.Side => {
	if (position.startsWith("top")) return "top";
	if (position.startsWith("bottom")) return "bottom";
	if (position.startsWith("start")) return "start";
	return "end";
};

/**
 * Calculate the safe area polygon points for the flyout hover bridge.
 * The polygon creates a triangular "safe zone" from the mouse exit point
 * to the flyout content edges, allowing smooth mouse movement between trigger and content.
 *
 * All coordinates are relative to the flyout wrapper element.
 *
 * @param origin - Mouse coordinates where cursor left the trigger (viewport coordinates)
 * @param contentRect - Bounding rect of the inner content (viewport coordinates)
 * @param wrapperRect - Bounding rect of the flyout wrapper (viewport coordinates)
 * @param position - Flyout position relative to trigger
 * @returns SVG polygon points string, or null if polygon cannot be calculated
 */
const getSafeAreaPolygon = (
	origin: Coords,
	contentRect: DOMRect,
	wrapperRect: DOMRect,
	position: T.Position
): string | null => {
	const side = getPrimarySide(position);

	// Convert viewport coordinates to coordinates relative to wrapper
	const originX = origin.x - wrapperRect.left;
	const originY = origin.y - wrapperRect.top;

	// Define the two corners of the content that form the triangle with the origin point
	let corner1: Coords;
	let corner2: Coords;

	switch (side) {
		case "top":
			// Content is above trigger - connect to bottom corners of content
			corner1 = { x: contentRect.left - wrapperRect.left, y: contentRect.bottom - wrapperRect.top };
			corner2 = {
				x: contentRect.right - wrapperRect.left,
				y: contentRect.bottom - wrapperRect.top,
			};
			break;
		case "bottom":
			// Content is below trigger - connect to top corners of content
			corner1 = { x: contentRect.left - wrapperRect.left, y: contentRect.top - wrapperRect.top };
			corner2 = { x: contentRect.right - wrapperRect.left, y: contentRect.top - wrapperRect.top };
			break;
		case "start":
			// Content is to the left of trigger - connect to right corners of content
			corner1 = { x: contentRect.right - wrapperRect.left, y: contentRect.top - wrapperRect.top };
			corner2 = {
				x: contentRect.right - wrapperRect.left,
				y: contentRect.bottom - wrapperRect.top,
			};
			break;
		case "end":
			// Content is to the right of trigger - connect to left corners of content
			corner1 = { x: contentRect.left - wrapperRect.left, y: contentRect.top - wrapperRect.top };
			corner2 = {
				x: contentRect.left - wrapperRect.left,
				y: contentRect.bottom - wrapperRect.top,
			};
			break;
		default:
			return null;
	}

	// Return SVG polygon points: "x1,y1 x2,y2 x3,y3" (triangle)
	return `${originX},${originY} ${corner1.x},${corner1.y} ${corner2.x},${corner2.y}`;
};

export default getSafeAreaPolygon;
