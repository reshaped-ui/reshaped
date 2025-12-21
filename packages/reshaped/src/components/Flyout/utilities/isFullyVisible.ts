import { SCREEN_OFFSET } from "./constants";

type Bounds = Pick<DOMRect, "left" | "top" | "width" | "height">;

/**
 * Check if element visually fits within its render container
 */
const isFullyVisible = (args: {
	/** Bounds of the flyout content */
	flyoutBounds: Bounds;
	/** Bounds of the container where the flyout content should fit */
	visualContainerBounds: Bounds;
	/** Bounds of the container where flyout content is rendered */
	renderContainerBounds: Bounds;
}) => {
	const { flyoutBounds, visualContainerBounds, renderContainerBounds } = args;

	if (renderContainerBounds.left + flyoutBounds.left < visualContainerBounds.left + SCREEN_OFFSET) {
		return false;
	}

	if (renderContainerBounds.top + flyoutBounds.top < visualContainerBounds.top + SCREEN_OFFSET) {
		return false;
	}

	if (
		renderContainerBounds.left + flyoutBounds.left + flyoutBounds.width >
		visualContainerBounds.left + visualContainerBounds.width - SCREEN_OFFSET
	) {
		return false;
	}

	if (
		renderContainerBounds.top + flyoutBounds.top + flyoutBounds.height >
		visualContainerBounds.top + visualContainerBounds.height - SCREEN_OFFSET
	) {
		return false;
	}

	return true;
};

export default isFullyVisible;
