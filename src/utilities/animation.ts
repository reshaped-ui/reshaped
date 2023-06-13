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
	return !document.documentElement.hasAttribute(transitionAttribute);
};
