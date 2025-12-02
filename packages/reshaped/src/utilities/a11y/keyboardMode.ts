const keyboardModeAttribute = "data-rs-keyboard";

export const activateKeyboardMode = () => {
	document.documentElement.setAttribute(keyboardModeAttribute, "true");
};

export const deactivateKeyboardMode = () => {
	document.documentElement.removeAttribute(keyboardModeAttribute);
};

export const checkKeyboardMode = () => {
	return document.documentElement.hasAttribute(keyboardModeAttribute);
};
