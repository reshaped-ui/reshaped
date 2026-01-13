/**
 * Internal utilities re-used in other Reshaped components but not meant to be used as a public API
 * Their API is subject to change without a major version bump.
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
