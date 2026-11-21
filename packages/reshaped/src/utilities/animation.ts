export const onNextFrame = (cb: () => void) => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => cb());
	});
};

const transitionAttribute = "data-rs-no-transition";
const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

export const disableTransitions = () => {
	document.documentElement.setAttribute(transitionAttribute, "true");
};

export const enableTransitions = () => {
	document.documentElement.removeAttribute(transitionAttribute);
};

/**
 * Transitions are disabled for a couple of frames while the color mode is applied,
 * unlike the reduced motion preference they're enabled back right after
 */
export const checkPausedTransitions = () => {
	return document.documentElement.hasAttribute(transitionAttribute);
};

export const checkTransitions = () => {
	if (document.documentElement.hasAttribute(transitionAttribute)) return false;

	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	return !window.matchMedia(reducedMotionMediaQuery).matches;
};
