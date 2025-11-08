import { getShadowRoot } from "utilities/dom";

import type { FocusableElement, FocusableOptions } from "./types";

const pseudoFocusAttribute = "data-rs-focus";

export const focusableSelector =
	'a,button,input:not([type="hidden"]),textarea,select,details,[tabindex],[contenteditable]';

export const getActiveElement = (originEl?: HTMLElement | null) => {
	const shadowRoot = originEl ? getShadowRoot(originEl) : null;
	const rootEl = shadowRoot ?? document;

	const pseudoFocusedEl = rootEl.querySelector(`[${pseudoFocusAttribute}]`);
	return (pseudoFocusedEl || rootEl.activeElement) as HTMLButtonElement;
};

export const focusElement = (el: FocusableElement, options?: { pseudoFocus?: boolean }) => {
	const shadowRoot = getShadowRoot(el);
	const rootEl = shadowRoot ?? document;

	rootEl.querySelector(`[${pseudoFocusAttribute}]`)?.removeAttribute(pseudoFocusAttribute);

	if (options?.pseudoFocus) {
		el.setAttribute(pseudoFocusAttribute, "true");
	} else {
		el.focus();
	}
};

export const getFocusableElements = (rootEl: HTMLElement, options?: FocusableOptions) => {
	const focusableElements = Array.from(
		rootEl.querySelectorAll(focusableSelector)
	) as FocusableElement[];
	const filteredElements = focusableElements.filter((el) => {
		if (el.hasAttribute("disabled")) return false;
		if (el.clientHeight === 0) return false;
		// Using getAttribute here since browser sets el.tabIndex to -1 by default
		if (!options?.includeNegativeTabIndex && el.getAttribute("tabindex") === "-1") return false;

		if (el.type === "radio") {
			let sameNameRadioEls: HTMLInputElement[];

			if (el.form) {
				const formInputs = el.form.elements.namedItem(el.name);

				// Synthetic error handling for narrowing down types
				// Radio element can't find itself in the form, so we don't need to include it in the array
				if (!formInputs) return false;

				const multipleElementsFound = "length" in formInputs;

				if (!multipleElementsFound) {
					// Single element found is always an input radio since we're inside the condition
					sameNameRadioEls = [formInputs as HTMLInputElement];
				} else {
					sameNameRadioEls = Array.from(formInputs).filter(
						(el) => "type" in el && el.type === "radio"
					) as HTMLInputElement[];
				}
			} else {
				sameNameRadioEls = Array.from(
					rootEl.querySelectorAll<HTMLInputElement>(`[type="radio"][name="${el.name}"]`)
				);
			}

			if (sameNameRadioEls?.length) {
				const checkedEl = Array.from(sameNameRadioEls).find((el) => el.checked);

				if (checkedEl && el !== checkedEl) return false;
				if (!checkedEl && el !== sameNameRadioEls[0]) return false;
			}
		}

		return true;
	});

	if (options?.additionalElement && filteredElements.length) {
		filteredElements.unshift(options.additionalElement);
	}

	return filteredElements;
};

export const getFocusData = (args: {
	root: HTMLElement;
	target: "next" | "prev" | "first" | "last";
	options?: FocusableOptions & {
		circular?: boolean;
	};
}) => {
	const { root, target, options } = args;
	const focusable = getFocusableElements(root, {
		additionalElement: options?.additionalElement,
		includeNegativeTabIndex: options?.includeNegativeTabIndex,
	});
	const focusableLimit = focusable.length - 1;
	const currentElement = getActiveElement(root);
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
		if (options?.circular) {
			nextIndex = target === "prev" ? positions.last : positions.first;
		} else {
			nextIndex = target === "prev" ? positions.first : positions.last;
		}
	}

	return { overflow: isOverflow, el: focusable[nextIndex], focusableElements: focusable };
};

const focusTargetElement = (
	root: HTMLElement,
	target: "next" | "prev" | "first" | "last",
	options?: Pick<FocusableOptions, "includeNegativeTabIndex"> & { circular?: boolean }
) => {
	const data = getFocusData({ root, target, options });
	focusElement(data.el);

	return { el: data.el, focusableElements: data.focusableElements };
};

export const focusNextElement = (root: HTMLElement, options?: { circular?: boolean }) =>
	focusTargetElement(root, "next", { ...options, includeNegativeTabIndex: true });

export const focusPreviousElement = (root: HTMLElement, options?: { circular?: boolean }) =>
	focusTargetElement(root, "prev", { ...options, includeNegativeTabIndex: true });

export const focusFirstElement = (root: HTMLElement) =>
	focusTargetElement(root, "first", { includeNegativeTabIndex: true });

export const focusLastElement = (root: HTMLElement) =>
	focusTargetElement(root, "last", { includeNegativeTabIndex: true });
