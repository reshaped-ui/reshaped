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

export const checkTransitions = () => {
	if (document.documentElement.hasAttribute(transitionAttribute)) return false;

	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	return !window.matchMedia(reducedMotionMediaQuery).matches;
};
