import calculatePosition from "./calculatePosition";

/**
 * Check if element visually fits on the screen
 */
const isFullyVisible = (
	args: ReturnType<typeof calculatePosition> & { container?: HTMLElement | null }
) => {
	const { styles, scopeOffset, container } = args;
	const htmlEl = container || document.documentElement;
	const pageLeft = htmlEl.scrollLeft;
	const pageRight = pageLeft + htmlEl.clientWidth;
	const pageTop = htmlEl.scrollTop;
	const pageBottom = pageTop + htmlEl.clientHeight;

	return (
		styles.left + scopeOffset.left >= pageLeft &&
		styles.left + styles.width + scopeOffset.left <= pageRight &&
		styles.top + scopeOffset.top >= pageTop &&
		styles.top + styles.height + scopeOffset.top <= pageBottom
	);
};

export default isFullyVisible;
