import { VIEWPORT_OFFSET } from "../constants";

type Bounds = Pick<DOMRect, "left" | "top" | "width" | "height">;

/**
 * Check if element visually fits within its render container
 * @param flyoutBounds - Bounds of the flyout content
 * @param containerBounds - Bounds of the container where the flyout content should visually fit
 */
const isFullyVisible = (args: { flyoutBounds: Bounds; containerBounds: Bounds }) => {
	const { flyoutBounds, containerBounds } = args;
	const flyoutLeft = flyoutBounds.left;
	const flyoutTop = flyoutBounds.top;
	const containerLeft = containerBounds.left;
	const containerTop = containerBounds.top;

	if (flyoutLeft < containerLeft + VIEWPORT_OFFSET) return false;
	if (flyoutTop < containerTop + VIEWPORT_OFFSET) return false;

	if (flyoutLeft + flyoutBounds.width > containerLeft + containerBounds.width - VIEWPORT_OFFSET) {
		return false;
	}

	if (flyoutTop + flyoutBounds.height > containerTop + containerBounds.height - VIEWPORT_OFFSET) {
		return false;
	}

	return true;
};

export default isFullyVisible;
