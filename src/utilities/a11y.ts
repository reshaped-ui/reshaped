import { TAB, UP, DOWN } from "constants/keys";
import { keyboardModeAttribute, pseudoFocusAttribute } from "constants/attributes";
import Chain from "utilities/Chain";

/**
 * dialog: Completely trap the focus inside for tab navigation until content is closed
 * example: Modal
 *
 * action-menu: Trap the arrow navigation, while tab moves the focus to
 * the next element on the page after the trigger
 * example: Dropdown Menu
 *
 * content-menu: Include dropdown content into the tab navigation flow and move the focus to
 * the next element on the page after the trigger after navigation through the trapped content
 * example: Header navigation dropdowns
 *
 * selection-menu: Keep the focus on the trigger and enable arrow key navigation with pseudo focusing with data-attributes
 * without moving the focus away from the trigger
 * example: Autocomplete
 */
export type TrapMode = "dialog" | "action-menu" | "content-menu" | "selection-menu";

type ReleaseOptions = { withoutFocusReturn?: boolean };
type Release = (options?: ReleaseOptions) => void;
type TrapOptions = {
	onNavigateOutside?: () => void;
	includeTrigger?: boolean;
	mode?: TrapMode;
};
type Trap = Release | null;

export const isKeyboardMode = () => document.documentElement.hasAttribute(keyboardModeAttribute);

export const focusableSelector =
	'a,button,input:not([type="hidden"]),textarea,select,details,[tabindex]:not([tabindex="-1"])';

export const getActiveElement = () => {
	const pseudoFocusedEl = document.querySelector(`[${pseudoFocusAttribute}]`);
	return (pseudoFocusedEl || document.activeElement) as HTMLButtonElement;
};

const getFocusableElements = (el: HTMLElement, extraElement?: HTMLButtonElement) => {
	const focusableElements = Array.from(
		el.querySelectorAll(focusableSelector)
	) as HTMLButtonElement[];
	const filteredElements = focusableElements.filter((el) => {
		return !el.hasAttribute("disabled") && el.clientHeight > 0;
	});

	if (extraElement && filteredElements.length) filteredElements.unshift(extraElement);

	return filteredElements;
};

const getFocusData = (args: {
	root: HTMLElement;
	target: "next" | "prev" | "first" | "last";
	mode?: TrapMode;
	extraElement?: HTMLButtonElement;
}) => {
	const { root, extraElement, target, mode } = args;
	const focusable = getFocusableElements(root, extraElement);
	const focusableLimit = focusable.length - 1;
	const currentElement = getActiveElement();
	const currentIndex = focusable.indexOf(currentElement);
	const positions = {
		next: currentIndex + 1,
		prev: currentIndex - 1,
		first: 0,
		last: focusableLimit,
	};
	let nextIndex = positions[target];

	const isOverflow = nextIndex > focusableLimit || nextIndex < 0;
	if (isOverflow) {
		// Disable circular navigation for action menus
		if (mode === "action-menu") {
			nextIndex = target === "prev" ? positions.first : positions.last;
		} else {
			nextIndex = target === "prev" ? positions.last : positions.first;
		}
	}

	return { overflow: isOverflow, el: focusable[nextIndex] };
};

const focusElement = (el: HTMLButtonElement, mode?: TrapMode) => {
	document.querySelector(`[${pseudoFocusAttribute}]`)?.removeAttribute(pseudoFocusAttribute);

	if (mode === "selection-menu") {
		el.setAttribute(pseudoFocusAttribute, "true");
	} else {
		el.focus();
	}
};

const focusTargetElement = (root: HTMLElement, target: "next" | "prev" | "first" | "last") => {
	const data = getFocusData({ root, target });
	focusElement(data.el);
};

export const focusNextElement = (root: HTMLElement) => focusTargetElement(root, "next");
export const focusPreviousElement = (root: HTMLElement) => focusTargetElement(root, "prev");
export const focusFirstElement = (root: HTMLElement) => focusTargetElement(root, "first");
export const focusLastElement = (root: HTMLElement) => focusTargetElement(root, "last");

const trapScreenReader = (() => {
	let affectedElements: HTMLElement[] = [];

	const applyHiddenToSiblings = (el: HTMLElement) => {
		let sibling = el.parentNode && (el.parentNode.firstChild as HTMLElement);

		while (sibling) {
			const notCurrent = sibling !== el;
			const isValid = sibling.nodeType === 1 && !sibling.hasAttribute("aria-hidden");

			if (notCurrent && isValid) {
				sibling.setAttribute("aria-hidden", "true");
				affectedElements.push(sibling);
			}

			sibling = sibling.nextSibling as HTMLElement;
		}
	};

	const release = () => {
		affectedElements.forEach((el) => {
			el.removeAttribute("aria-hidden");
		});
		affectedElements = [];
	};

	return (el: HTMLElement) => {
		let currentEl = el;

		if (affectedElements.length) release();

		while (currentEl !== document.body) {
			applyHiddenToSiblings(currentEl);
			currentEl = currentEl.parentElement as HTMLElement;
		}

		return { release };
	};
})();

export const trapFocus = (() => {
	let resetListeners: null | (() => void) = null;
	let srTrap: ReturnType<typeof trapScreenReader> | null = null;
	const chain = new Chain<{
		root: HTMLElement;
		trigger: HTMLButtonElement;
		options: TrapOptions;
	}>();

	return (root: HTMLElement, options: TrapOptions = {}): Trap => {
		const { mode = "dialog", onNavigateOutside, includeTrigger } = options;
		const triggerElement = getActiveElement();
		const isDialog = mode === "dialog";
		const isContentMenu = mode === "content-menu";
		const isSelectionMenu = mode === "selection-menu";
		const isTabMode = isDialog || isContentMenu;
		const isArrowsMode = mode === "action-menu" || isSelectionMenu;
		const focusable = getFocusableElements(root, includeTrigger ? triggerElement : undefined);
		let chainId: number;

		// Re-focus on the first element if content has changed
		const observer = new MutationObserver(() => {
			// Focus stayed inside the wrapper, no need to refocus
			if (root.contains(document.activeElement)) return;

			const focusable = getFocusableElements(root, includeTrigger ? triggerElement : undefined);

			if (!focusable.length) return;
			focusElement(focusable[0], mode);
		});

		const release: Release = (releaseOptions = {}) => {
			const { withoutFocusReturn } = releaseOptions;

			chain.removePreviousTill(chainId, (item) => document.body.contains(item.data.trigger));
			observer.disconnect();

			if (triggerElement) {
				triggerElement.focus({ preventScroll: withoutFocusReturn || !isKeyboardMode() });
			}

			if (resetListeners) {
				resetListeners();
				if (srTrap) srTrap.release();
				resetListeners = null;
				srTrap = null;
			}

			const previousItem = chain.tailId && chain.get(chain.tailId);
			if (previousItem) {
				trapFocus(previousItem.data.root, previousItem.data.options);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key;
			const isTab = key === TAB;
			const isNextTab = isTab && !event.shiftKey;
			const isBackTab = isTab && event.shiftKey;
			const isUp = isArrowsMode && key === UP;
			const isDown = isArrowsMode && key === DOWN;
			const isPrev = (isBackTab && isTabMode) || isUp;
			const isNext = (isNextTab && isTabMode) || isDown;
			const isFocusedOnTrigger = getActiveElement() === triggerElement;
			const focusData = getFocusData({
				root,
				target: isPrev ? "prev" : "next",
				extraElement: includeTrigger ? triggerElement : undefined,
				mode,
			});

			// Release the trap when tab is used in navigation modes that support arrows
			const hasNavigatedOutside =
				(isTab && isArrowsMode) || (isContentMenu && isTab && focusData.overflow);

			if (hasNavigatedOutside) {
				// Prevent shift + tab event to avoid focus moving after the trap release
				if (isBackTab && !isFocusedOnTrigger) event.preventDefault();

				release();
				onNavigateOutside?.();
				return;
			}

			// We return after the last condition because Tab can be used for releasing in arrows mode
			if (!isPrev && !isNext) return;

			event.preventDefault();

			if (!focusData.el) return;

			focusElement(focusData.el, mode);
		};

		// Reset event listeners if focus is trapped elsewhere
		if (resetListeners) resetListeners();
		if (isDialog) srTrap = trapScreenReader(root);

		observer.observe(root, { childList: true, subtree: true });
		if (!focusable.length) return null;

		document.addEventListener("keydown", handleKeyDown);
		resetListeners = () => document.removeEventListener("keydown", handleKeyDown);

		// Don't add back to the chain if we're traversing back
		const tailItem = chain.tailId && chain.get(chain.tailId);
		if (!tailItem || root !== tailItem.data.root) {
			chainId = chain.add({ root, trigger: triggerElement, options });

			focusElement(focusable[0], mode);
		}

		return release;
	};
})();
