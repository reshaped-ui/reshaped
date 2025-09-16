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
	/** Container where the flyout content is rendered */
	container: HTMLElement;
}) => {
	const { flyoutBounds, visualContainerBounds, renderContainerBounds, container } = args;
	const scrollX = container === document.body ? window.scrollX : container.scrollLeft;
	const scrollY = container === document.body ? window.scrollY : container.scrollTop;

	if (renderContainerBounds.left + flyoutBounds.left - scrollX < visualContainerBounds.left) {
		return false;
	}

	if (renderContainerBounds.top + flyoutBounds.top - scrollY < visualContainerBounds.top) {
		return false;
	}

	if (
		renderContainerBounds.left + flyoutBounds.left + flyoutBounds.width - scrollX >
		visualContainerBounds.right
	) {
		return false;
	}

	if (
		renderContainerBounds.top + flyoutBounds.top + flyoutBounds.height - scrollY >
		visualContainerBounds.bottom
	) {
		return false;
	}

	return true;
};

export default isFullyVisible;
