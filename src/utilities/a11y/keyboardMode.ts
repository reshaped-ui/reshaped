const keyboardModeAttribute = "data-rs-keyboard";

export const enableKeyboardMode = () => {
	document.documentElement.setAttribute(keyboardModeAttribute, "true");
};

export const disableKeyboardMode = () => {
	document.documentElement.removeAttribute(keyboardModeAttribute);
};

export const checkKeyboardMode = () => {
	return document.documentElement.hasAttribute(keyboardModeAttribute);
};
