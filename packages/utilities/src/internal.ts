/**
 * Internal utilities re-used in other Reshaped components but not meant to be used as a public API
 * Their API is subject to change without a major version bump.
 *
 * If you want to use one of these utilities, open an issue or a PR about moving it to the public API file
 */

export {
	focusableSelector,
	getActiveElement,
	getFocusableElements,
	focusNextElement,
	focusPreviousElement,
	focusFirstElement,
	focusLastElement,
	activateKeyboardMode,
	deactivateKeyboardMode,
	checkKeyboardMode,
} from "./a11y";

export type { TrapMode, FocusableElement } from "./a11y";

export { disableScroll, enableScroll } from "./scroll";

export { rafThrottle } from "./helpers";
export { getShadowRoot, findParent } from "./dom";
