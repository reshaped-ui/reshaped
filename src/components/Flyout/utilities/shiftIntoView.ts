import type calculatePosition from "./calculatePosition";

/**
 * Shift a calculated flyout into view so it doesn't overflow containerBounds.
 *
 * @param {object} calculated - The object returned from calculatePosition.
 * @param {DOMRect} containerBounds - The bounding rect of the visible container.
 * @param {number} padding - Extra space to keep between the flyout and container edges.
 * @returns {object} A new "calculated" object with updated boundaries and styles.
 */
const shiftIntoView = (
	calculated: ReturnType<typeof calculatePosition>,
	containerBounds: DOMRect,
	padding: number
): ReturnType<typeof calculatePosition> => {
	const { top: originalTop, left: originalLeft, width, height } = calculated.boundaries;

	// Define allowed ranges
	const minX = containerBounds.left + padding;
	const maxX = containerBounds.right - padding - width;
	const minY = containerBounds.top + padding;
	const maxY = containerBounds.bottom - padding - height;

	// Compute necessary adjustments
	let shiftX = 0;
	let shiftY = 0;

	if (originalLeft < minX) {
		shiftX = minX - originalLeft;
	} else if (originalLeft > maxX) {
		shiftX = maxX - originalLeft;
	}

	if (originalTop < minY) {
		shiftY = minY - originalTop;
	} else if (originalTop > maxY) {
		shiftY = maxY - originalTop;
	}

	// Apply adjustments and clamp to prevent negative coordinates
	const newLeft = Math.max(0, originalLeft + shiftX);
	const newTop = Math.max(0, originalTop + shiftY);

	return {
		...calculated,
		boundaries: {
			...calculated.boundaries,
			left: newLeft,
			top: newTop,
		},
		styles: {
			...calculated.styles,
			transform: `translate(${newLeft}px, ${newTop}px)`,
		},
	};
};

export default shiftIntoView;
