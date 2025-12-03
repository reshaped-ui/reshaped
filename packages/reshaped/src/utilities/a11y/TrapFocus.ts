import * as keys from "constants/keys";
import Chain from "utilities/Chain";
import { getShadowRoot } from "utilities/dom";

import { getActiveElement, getFocusableElements, focusElement, getFocusData } from "./focus";
import { checkKeyboardMode } from "./keyboardMode";
import TrapScreenReader from "./TrapScreenReader";

import type { FocusableElement, TrapMode } from "./types";

type ReleaseOptions = { withoutFocusReturn?: boolean };
type TrapOptions = {
	onRelease?: () => void;
	includeTrigger?: boolean;
	initialFocusEl?: FocusableElement | null;
	mode?: TrapMode;
};

class TrapFocus {
	static chain = new Chain<TrapFocus>();

	#chainId?: number;

	#root: HTMLElement | null = null;

	#trigger: FocusableElement | null = null;

	#options: TrapOptions & { pseudoFocus?: boolean } = {};

	trapped?: boolean;

	#screenReaderTrap: TrapScreenReader | null = null;

	#mutationObserver: MutationObserver | null = null;

	constructor() {}

	/**
	 * Handle keyboard navigation while focus is trapped
	 */
	#handleKeyDown = (event: KeyboardEvent) => {
		if (event.defaultPrevented) return;
		if (TrapFocus.chain.tailId !== this.#chainId) return;
		if (!this.#root) return;

		const { mode, onRelease, pseudoFocus, includeTrigger } = this.#options;
		let navigationMode: "tabs" | "arrows" = "tabs";
		if (mode === "action-menu" || mode === "selection-menu" || mode === "action-bar") {
			navigationMode = "arrows";
		}

		const key = event.key;

		const isTab = key === keys.TAB;
		const isPrevTab = isTab && event.shiftKey;
		const isNextTab = isTab && !event.shiftKey;
		const isArrow = [keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN].includes(key);
		const isPrevArrow =
			navigationMode === "arrows" && key === (mode === "action-bar" ? keys.LEFT : keys.UP);
		const isNextArrow =
			navigationMode === "arrows" && key === (mode === "action-bar" ? keys.RIGHT : keys.DOWN);
		const isPrev = (isPrevTab && navigationMode === "tabs") || isPrevArrow;
		const isNext = (isNextTab && navigationMode === "tabs") || isNextArrow;
		const isFocusedOnTrigger = getActiveElement(this.#root) === this.#trigger;
		const focusData = getFocusData({
			root: this.#root,
			target: isPrev ? "prev" : "next",
			options: {
				additionalElement: includeTrigger ? this.#trigger : undefined,
				circular: true,
			},
		});

		// Release the trap when tab is used in navigation modes that support arrows
		const hasNavigatedOutside =
			(isTab && navigationMode === "arrows") ||
			(mode === "content-menu" && isTab && focusData.overflow);

		if (hasNavigatedOutside) {
			// Prevent shift + tab event to avoid focus moving after the trap release
			if (isPrevTab && !isFocusedOnTrigger) event.preventDefault();

			this.release();
			onRelease?.();
			return;
		}

		if (!isPrev && !isNext) {
			// Avoid page from scrolling with arrow keys while focus it trapped
			if (isArrow && (mode === "action-bar" || mode === "action-menu")) event.preventDefault();
			return;
		}

		event.preventDefault();

		if (!focusData.el) return;
		focusElement(focusData.el, { pseudoFocus });
	};

	#addListeners = () => {
		const shadowRoot = getShadowRoot(this.#root);
		const el = shadowRoot ?? document;

		el.addEventListener("keydown", this.#handleKeyDown as EventListener);
	};

	#removeListeners = () => {
		const shadowRoot = getShadowRoot(this.#root);
		const el = shadowRoot ?? document;

		el.removeEventListener("keydown", this.#handleKeyDown as EventListener);
	};

	/**
	 * Trap the focus, add observer and keyboard event listeners
	 * and create a chain item
	 */
	trap = (root: HTMLElement, options: TrapOptions = {}) => {
		const { mode = "dialog", includeTrigger, initialFocusEl } = options;

		this.#root = root;
		this.#screenReaderTrap = new TrapScreenReader(root);

		const trigger = getActiveElement(this.#root);
		const focusable = getFocusableElements(this.#root, {
			additionalElement: includeTrigger ? trigger : undefined,
		});
		const pseudoFocus = mode === "selection-menu";

		this.#options = { ...options, pseudoFocus };
		this.#trigger = trigger;

		this.#mutationObserver = new MutationObserver(() => {
			if (!this.#root) return;

			const currentActiveElement = getActiveElement(this.#root);

			// Focus stayed inside the wrapper, no need to refocus
			if (this.#root.contains(currentActiveElement)) return;

			const focusable = getFocusableElements(this.#root, {
				additionalElement: includeTrigger ? trigger : undefined,
			});

			if (!focusable.length) return;
			focusElement(focusable[0], { pseudoFocus });
		});

		this.#removeListeners();

		this.#mutationObserver.observe(this.#root, { childList: true, subtree: true });

		// Don't trap in case there is nothing to focus inside
		if (!focusable.length && !initialFocusEl) return;

		this.#addListeners();
		if (mode === "dialog") this.#screenReaderTrap.trap();

		// Don't add back to the chain if we're traversing back
		const tailItem = TrapFocus.chain.tailId && TrapFocus.chain.get(TrapFocus.chain.tailId);
		const currentActiveElement = getActiveElement(this.#root);

		if (!tailItem || this.#root !== tailItem.data.#root) {
			this.#chainId = TrapFocus.chain.add(this);

			// If the focus was moved manually (e.g. with autoFocus) - keep it there
			if (!this.#root.contains(currentActiveElement)) {
				focusElement(initialFocusEl || focusable[0], { pseudoFocus });
			}
		}

		this.trapped = true;
	};

	/**
	 * Disabled the trap focus for the element,
	 * cleanup all observers/handlers and trap for the previous element in the chain
	 */
	release = (releaseOptions: ReleaseOptions = {}) => {
		const { withoutFocusReturn } = releaseOptions;

		if (!this.trapped || !this.#chainId || !this.#root) return;
		this.trapped = false;

		if (this.#trigger && !withoutFocusReturn) {
			this.#trigger.focus({ preventScroll: !checkKeyboardMode() });
		}

		TrapFocus.chain.removePreviousTill(this.#chainId, (item) =>
			document.body.contains(item.data.#trigger)
		);
		this.#mutationObserver?.disconnect();

		this.#removeListeners();
		this.#screenReaderTrap?.release();

		const previousItem = TrapFocus.chain.tailId && TrapFocus.chain.get(TrapFocus.chain.tailId);

		if (previousItem && previousItem.data.#root) {
			const trapInstance = new TrapFocus();
			trapInstance.trap(previousItem.data.#root, previousItem.data.#options);
		}
	};
}

export default TrapFocus;
