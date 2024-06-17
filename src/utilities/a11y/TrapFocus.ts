import Chain from "utilities/Chain";
import * as keys from "constants/keys";
import TrapScreenReader from "./TrapScreenReader";
import { getActiveElement, getFocusableElements, focusElement, getFocusData } from "./focus";
import type { FocusableElement, TrapMode } from "./types";
import { checkKeyboardMode } from "./keyboardMode";

type ReleaseOptions = { withoutFocusReturn?: boolean };
type TrapOptions = {
	onNavigateOutside?: () => void;
	includeTrigger?: boolean;
	initialFocusEl?: FocusableElement;
	mode?: TrapMode;
};

class TrapFocus {
	static chain = new Chain<TrapFocus>();

	chainId?: number;

	root: HTMLElement;

	trigger: FocusableElement | null = null;

	options: TrapOptions & { pseudoFocus?: boolean } = {};

	trapped?: boolean;

	screenReaderTrap: TrapScreenReader;

	mutationObserver: MutationObserver | null = null;

	constructor(root: HTMLElement) {
		this.root = root;
		this.screenReaderTrap = new TrapScreenReader(root);
	}

	/**
	 * Handle keyboard navigation while focus is trapped
	 */
	handleKeyDown = (event: KeyboardEvent) => {
		if (TrapFocus.chain.tailId !== this.chainId) return;

		const { mode, onNavigateOutside, pseudoFocus, includeTrigger } = this.options;
		let navigationMode: "tabs" | "arrows" = "tabs";
		if (mode === "action-menu" || mode === "selection-menu") navigationMode = "arrows";

		const key = event.key;

		const isTab = key === keys.TAB;
		const isNextTab = isTab && !event.shiftKey;
		const isBackTab = isTab && event.shiftKey;
		const isUp = navigationMode === "arrows" && key === keys.UP;
		const isDown = navigationMode === "arrows" && key === keys.DOWN;
		const isPrev = (isBackTab && navigationMode === "tabs") || isUp;
		const isNext = (isNextTab && navigationMode === "tabs") || isDown;
		const isFocusedOnTrigger = getActiveElement() === this.trigger;
		const focusData = getFocusData({
			root: this.root,
			target: isPrev ? "prev" : "next",
			options: {
				additionalElement: includeTrigger ? this.trigger : undefined,
				circular: mode !== "action-menu",
			},
		});

		// Release the trap when tab is used in navigation modes that support arrows
		const hasNavigatedOutside =
			(isTab && navigationMode === "arrows") ||
			(mode === "content-menu" && isTab && focusData.overflow);

		if (hasNavigatedOutside) {
			// Prevent shift + tab event to avoid focus moving after the trap release
			if (isBackTab && !isFocusedOnTrigger) event.preventDefault();

			this.release();
			onNavigateOutside?.();
			return;
		}

		if (!isPrev && !isNext) return;

		event.preventDefault();

		if (!focusData.el) return;
		console.log("focus key");
		focusElement(focusData.el, { pseudoFocus });
	};

	addListeners = () => document.addEventListener("keydown", this.handleKeyDown);

	removeListeners = () => document.removeEventListener("keydown", this.handleKeyDown);

	/**
	 * Trap the focus, add observer and keyboard event listeners
	 * and create a chain item
	 */
	trap = (options: TrapOptions = {}) => {
		const { mode = "dialog", includeTrigger, initialFocusEl } = options;
		const trigger = getActiveElement();
		const focusable = getFocusableElements(this.root, {
			additionalElement: includeTrigger ? trigger : undefined,
		});
		const pseudoFocus = mode === "selection-menu";

		this.options = { ...options, pseudoFocus };
		this.trigger = trigger;

		this.mutationObserver = new MutationObserver(() => {
			const currentActiveElement = getActiveElement();

			// Focus stayed inside the wrapper, no need to refocus
			if (this.root.contains(currentActiveElement)) return;

			const focusable = getFocusableElements(this.root, {
				additionalElement: includeTrigger ? trigger : undefined,
			});

			if (!focusable.length) return;
			console.log("focus observer");
			focusElement(focusable[0], { pseudoFocus });
		});

		this.removeListeners();
		if (mode === "dialog") this.screenReaderTrap.trap();

		this.mutationObserver.observe(this.root, { childList: true, subtree: true });
		if (!focusable.length && !initialFocusEl) return;

		this.addListeners();

		// Don't add back to the chain if we're traversing back
		const tailItem = TrapFocus.chain.tailId && TrapFocus.chain.get(TrapFocus.chain.tailId);
		if (!tailItem || this.root !== tailItem.data.root) {
			this.chainId = TrapFocus.chain.add(this);
			console.log("chain focus");
			focusElement(initialFocusEl || focusable[0], { pseudoFocus });
		}

		this.trapped = true;
	};

	/**
	 * Disabled the trap focus for the element,
	 * cleanup all observers/handlers and trap for the previous element in the chain
	 */
	release = (releaseOptions: ReleaseOptions = {}) => {
		const { withoutFocusReturn } = releaseOptions;

		if (!this.trapped || !this.chainId) return;
		this.trapped = false;

		if (this.trigger) {
			const preventScroll = withoutFocusReturn || !checkKeyboardMode();
			console.log("trigger focus");
			this.trigger.focus({ preventScroll });
		}

		TrapFocus.chain.removePreviousTill(this.chainId, (item) =>
			document.body.contains(item.data.trigger)
		);
		this.mutationObserver?.disconnect();

		this.removeListeners();
		this.screenReaderTrap.release();

		const previousItem = TrapFocus.chain.tailId && TrapFocus.chain.get(TrapFocus.chain.tailId);

		if (previousItem) {
			const trapInstance = new TrapFocus(previousItem.data.root);
			trapInstance.trap(previousItem.data.options);
		}
	};
}

export default TrapFocus;
