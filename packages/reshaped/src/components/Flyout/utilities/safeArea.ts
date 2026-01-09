import type * as G from "types/global";

type SafePolygonOptions = {
	contentRef: React.RefObject<HTMLElement | null>;
	triggerRef: React.RefObject<HTMLElement | null>;
	position: string | null | undefined;
	onClose: () => void;
	origin: G.Coordinates;
};

/**
 * Checks if a point is inside a triangle using barycentric coordinates
 */
function isPointInTriangle(
	point: G.Coordinates,
	triangle: [G.Coordinates, G.Coordinates, G.Coordinates]
): boolean {
	const [p1, p2, p3] = triangle;

	const denominator = (p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y);

	const a = ((p2.y - p3.y) * (point.x - p3.x) + (p3.x - p2.x) * (point.y - p3.y)) / denominator;
	const b = ((p3.y - p1.y) * (point.x - p3.x) + (p1.x - p3.x) * (point.y - p3.y)) / denominator;
	const c = 1 - a - b;

	return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
}

/**
 * Gets the two closest corners of the content element based on the flyout position
 */
function getContentCorners(
	contentRect: DOMRect,
	position: string | null | undefined
): [G.Coordinates, G.Coordinates] {
	const corners = {
		topLeft: { x: contentRect.left, y: contentRect.top },
		topRight: { x: contentRect.right, y: contentRect.top },
		bottomLeft: { x: contentRect.left, y: contentRect.bottom },
		bottomRight: { x: contentRect.right, y: contentRect.bottom },
	};

	if (position?.startsWith("bottom")) {
		return [corners.topLeft, corners.topRight];
	} else if (position?.startsWith("top")) {
		return [corners.bottomLeft, corners.bottomRight];
	} else if (position?.startsWith("start")) {
		return [corners.topRight, corners.bottomRight];
	} else {
		return [corners.topLeft, corners.bottomLeft];
	}
}

/**
 * Checks if the mouse is over the trigger or content elements
 */
function isMouseOverElement(
	point: G.Coordinates,
	contentRef: React.RefObject<HTMLElement | null>,
	triggerRef: React.RefObject<HTMLElement | null>
): boolean {
	const elements = document.elementsFromPoint(point.x, point.y);

	return elements.some(
		(el) =>
			(contentRef.current && contentRef.current.contains(el)) ||
			(triggerRef.current && triggerRef.current.contains(el))
	);
}

export function createSafeArea(options: SafePolygonOptions): () => void {
	const { contentRef, triggerRef, position, onClose, origin: passedOrigin } = options;

	if (!contentRef.current) {
		// If content doesn't exist, just close immediately
		onClose();
		return () => {};
	}

	const contentRect = contentRef.current.getBoundingClientRect();
	const [corner1, corner2] = getContentCorners(contentRect, position);

	// Add buffer to origin based on position to extend safe area
	const buffer = 10;
	const origin = { x: passedOrigin.x, y: passedOrigin.y };

	if (position?.startsWith("bottom")) {
		origin.y -= buffer;
	} else if (position?.startsWith("top")) {
		origin.y += buffer;
	} else if (position?.startsWith("start")) {
		origin.x += buffer;
	} else if (position?.startsWith("end")) {
		origin.x -= buffer;
	}

	const triangle: [G.Coordinates, G.Coordinates, G.Coordinates] = [origin, corner1, corner2];

	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const cleanup = () => {
		document.removeEventListener("mousemove", handleMouseMove);

		if (timeoutId) clearTimeout(timeoutId);
	};

	// Start timeout for 1 second
	const startTimeout = () => {
		if (timeoutId) clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			onClose();
			cleanup();
		}, 1000);
	};

	const handleMouseMove = (e: MouseEvent) => {
		const currentPoint: G.Coordinates = { x: e.clientX, y: e.clientY };

		if (isMouseOverElement(currentPoint, contentRef, triggerRef)) {
			cleanup();
			return;
		}

		if (isPointInTriangle(currentPoint, triangle)) {
			startTimeout();
		} else {
			onClose();
			cleanup();
		}
	};

	startTimeout();
	document.addEventListener("mousemove", handleMouseMove);

	return cleanup;
}
