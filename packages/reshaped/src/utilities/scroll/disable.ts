export const preventDefault = (e: Event) => e.preventDefault();

/**
 * Prevent scrolling events for the cases when dragging elements
 * without locking the page with overflow
 */
export const disableScroll = () => {
	window.addEventListener("wheel", preventDefault, { passive: false });
	window.addEventListener("touchmove", preventDefault, { passive: false });
	document.body.style.userSelect = "none";
};

export const enableScroll = () => {
	window.removeEventListener("wheel", preventDefault);
	window.removeEventListener("touchmove", preventDefault);
	document.body.style.userSelect = "";
};
