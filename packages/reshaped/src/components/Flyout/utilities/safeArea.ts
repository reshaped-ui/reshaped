import type { Coordinates } from "@reshaped/headless/internal";

type SafePolygonOptions = {
	contentRef: React.RefObject<HTMLElement | null>;
	triggerRef: React.RefObject<HTMLElement | null>;
	position: string | null | undefined;
	onClose: () => void;
	origin: Coordinates;
};

const BUFFER = 4;
const GRACE_TIMEOUT = 50;

/**
 * Checks if a point is inside a triangle using barycentric coordinates
 */
function isPointInTriangle(
	point: Coordinates,
	triangle: [Coordinates, Coordinates, Coordinates]
): boolean {
	const [p1, p2, p3] = triangle;

	const denominator = (p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y);

	const a = ((p2.y - p3.y) * (point.x - p3.x) + (p3.x - p2.x) * (point.y - p3.y)) / denominator;
	const b = ((p3.y - p1.y) * (point.x - p3.x) + (p1.x - p3.x) * (point.y - p3.y)) / denominator;
	const c = 1 - a - b;

	return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
}

/**
 * Checks if a point is within the rectangular trough between the trigger and content
 */
function isPointInTrough(
	point: Coordinates,
	triggerRect: DOMRect,
	contentRect: DOMRect,
	position: string | null | undefined
): boolean {
	if (position?.startsWith("end") || position?.startsWith("right")) {
		// Horizontal trough: trigger's right edge to content's left edge
		const left = triggerRect.right - BUFFER;
		const right = contentRect.left + BUFFER;
		const top = Math.max(triggerRect.top, contentRect.top) - BUFFER;
		const bottom = Math.min(triggerRect.bottom, contentRect.bottom) + BUFFER;
		return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
	} else if (position?.startsWith("start") || position?.startsWith("left")) {
		// Horizontal trough: content's right edge to trigger's left edge
		const left = contentRect.right - BUFFER;
		const right = triggerRect.left + BUFFER;
		const top = Math.max(triggerRect.top, contentRect.top) - BUFFER;
		const bottom = Math.min(triggerRect.bottom, contentRect.bottom) + BUFFER;
		return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
	} else if (position?.startsWith("bottom")) {
		// Vertical trough: trigger's bottom edge to content's top edge
		const top = triggerRect.bottom - BUFFER;
		const bottom = contentRect.top + BUFFER;
		const left = Math.max(triggerRect.left, contentRect.left) - BUFFER;
		const right = Math.min(triggerRect.right, contentRect.right) + BUFFER;
		return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
	} else if (position?.startsWith("top")) {
		// Vertical trough: content's bottom edge to trigger's top edge
		const top = contentRect.bottom - BUFFER;
		const bottom = triggerRect.top + BUFFER;
		const left = Math.max(triggerRect.left, contentRect.left) - BUFFER;
		const right = Math.min(triggerRect.right, contentRect.right) + BUFFER;
		return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
	}

	return false;
}

/**
 * Checks if a point is within the content element's bounding rect
 */
function isPointInContent(point: Coordinates, contentRect: DOMRect): boolean {
	return (
		point.x >= contentRect.left &&
		point.x <= contentRect.right &&
		point.y >= contentRect.top &&
		point.y <= contentRect.bottom
	);
}

/**
 * Gets the two closest corners of the content element based on the flyout position
 */
function getContentCorners(
	contentRect: DOMRect,
	position: string | null | undefined
): [Coordinates, Coordinates] {
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

export function createSafeArea(options: SafePolygonOptions): () => void {
	const { contentRef, triggerRef, position, onClose, origin: passedOrigin } = options;

	if (!contentRef.current) {
		// If content doesn't exist, just close immediately
		onClose();
		return () => {};
	}

	const contentRect = contentRef.current.getBoundingClientRect();
	const triggerRect = triggerRef.current?.getBoundingClientRect();
	const [corner1, corner2] = getContentCorners(contentRect, position);
	const origin = { x: passedOrigin.x, y: passedOrigin.y };

	const triangle: [Coordinates, Coordinates, Coordinates] = [origin, corner1, corner2];

	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let graceTimeoutId: ReturnType<typeof setTimeout> | null = null;

	const cleanup = () => {
		document.removeEventListener("mousemove", handleMouseMove);

		if (timeoutId) clearTimeout(timeoutId);
		if (graceTimeoutId) clearTimeout(graceTimeoutId);
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
		const currentPoint: Coordinates = { x: e.clientX, y: e.clientY };

		const inTriangle = isPointInTriangle(currentPoint, triangle);
		const inTrough = triggerRect
			? isPointInTrough(currentPoint, triggerRect, contentRect, position)
			: false;
		const inContent = isPointInContent(currentPoint, contentRect);

		if ((inTriangle || inTrough || inContent) && contentRef.current && triggerRef.current) {
			// Cursor is in the safe zone — cancel any grace period and restart the idle timeout
			if (graceTimeoutId) {
				clearTimeout(graceTimeoutId);
				graceTimeoutId = null;
			}
			startTimeout();
		} else {
			// Cursor left the safe zone — start a grace period instead of closing immediately
			if (!graceTimeoutId) {
				graceTimeoutId = setTimeout(() => {
					onClose();
					cleanup();
				}, GRACE_TIMEOUT);
			}
		}
	};

	startTimeout();
	document.addEventListener("mousemove", handleMouseMove);

	return cleanup;
}
