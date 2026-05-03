/**
 * Internal utilities re-used in other Reshaped components but not meant to be used as a public API
 * Their API is subject to change without a major version bump.
 *
 * If you want to use one of these utilities, open an issue or a PR about moving it to the public API file
 */

export type { FocusableElement, TrapMode } from "./a11y";
export {
	activateKeyboardMode,
	checkKeyboardMode,
	deactivateKeyboardMode,
	focusableSelector,
	focusFirstElement,
	focusLastElement,
	focusNextElement,
	focusPreviousElement,
	getActiveElement,
	getFocusableElements,
} from "./a11y";
export { findParent, getShadowRoot } from "./dom";
export { rafThrottle } from "./helpers";
export { disableScroll, enableScroll } from "./scroll";
export type { Coordinates } from "./types/global";
