export const onNextFrame = (cb: () => void) => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => cb());
	});
};

const transitionAttribute = "data-rs-no-transition";

export const disableTransitions = () => {
	document.documentElement.setAttribute(transitionAttribute, "true");
};

export const enableTransitions = () => {
	document.documentElement.removeAttribute(transitionAttribute);
};

export const checkTransitions = () => {
	if (document.documentElement.hasAttribute(transitionAttribute)) return false;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
	return true;
};
