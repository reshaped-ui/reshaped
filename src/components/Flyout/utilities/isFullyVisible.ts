/**
 * Check if element visually fits within its render container
 */
const isFullyVisible = (args: {
	/** Bounds of the flyout content */
	flyoutBounds: Pick<DOMRect, "left" | "top" | "width" | "height">;
	/** Bounds of the container where the flyout content should fit */
	visualContainerBounds: DOMRect;
	/** Bounds of the container where flyout content is rendered */
	renderContainerBounds: DOMRect;
}) => {
	const { flyoutBounds, visualContainerBounds, renderContainerBounds } = args;

	if (renderContainerBounds.left + flyoutBounds.left < visualContainerBounds.left) {
		return false;
	}

	if (renderContainerBounds.top + flyoutBounds.top < visualContainerBounds.top) {
		return false;
	}

	if (
		renderContainerBounds.left + flyoutBounds.left + flyoutBounds.width >
		visualContainerBounds.right
	) {
		return false;
	}

	if (
		renderContainerBounds.top + flyoutBounds.top + flyoutBounds.height >
		visualContainerBounds.bottom
	) {
		return false;
	}

	return true;
};

export default isFullyVisible;
