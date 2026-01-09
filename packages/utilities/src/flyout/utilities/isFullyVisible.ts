import { CONTAINER_OFFSET } from "../constants";

type Bounds = Pick<DOMRect, "left" | "top" | "width" | "height">;

/**
 * Check if element visually fits within its render container
 * @param flyoutBounds - Bounds of the flyout content
 * @param visualContainerBounds - Bounds of the container where the flyout content should visually fit
 * @param renderContainerBounds - Bounds of the container where flyout content is rendered
 */
const isFullyVisible = (args: {
	flyoutBounds: Bounds;
	visualContainerBounds: Bounds;
	renderContainerBounds: Bounds;
}) => {
	const { flyoutBounds, visualContainerBounds, renderContainerBounds } = args;
	const flyoutLeft = renderContainerBounds.left + flyoutBounds.left;
	const flyoutTop = renderContainerBounds.top + flyoutBounds.top;
	const containerLeft = visualContainerBounds.left;
	const containerTop = visualContainerBounds.top;

	if (flyoutLeft < containerLeft + CONTAINER_OFFSET) return false;
	if (flyoutTop < containerTop + CONTAINER_OFFSET) return false;

	if (
		flyoutLeft + flyoutBounds.width >
		containerLeft + visualContainerBounds.width - CONTAINER_OFFSET
	) {
		return false;
	}

	if (
		flyoutTop + flyoutBounds.height >
		containerTop + visualContainerBounds.height - CONTAINER_OFFSET
	) {
		return false;
	}

	return true;
};

export default isFullyVisible;
