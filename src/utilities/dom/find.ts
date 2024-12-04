import { getShadowRoot } from "./shadowDom";

export const findParent = (element: HTMLElement, condition: (el: HTMLElement) => boolean) => {
	let currentElement = element.parentElement;

	while (currentElement) {
		if (condition(currentElement)) return currentElement;
		currentElement = currentElement.parentElement;
	}

	return null;
};

/**
 * Containers used for scoping the rendering,
 * mostly used in flyouts since the have to accommodate for positioning and overflow
 */
export const findClosestRenderContainer = (args: {
	el: HTMLElement | null;
	iteration?: number;
	overflowOnly?: boolean;
}): HTMLElement => {
	const { el, iteration = 0, overflowOnly } = args;
	const style = el && window.getComputedStyle(el);
	const overflowY = style?.overflowY;
	const position = style?.position;
	const isScrollable = overflowY?.includes("scroll") || overflowY?.includes("auto");
	const isFixed = position === "fixed" || position === "sticky";

	// Only check shadow root on the first run
	if (iteration === 0) {
		const shadowRoot = getShadowRoot(el);
		if (shadowRoot?.firstElementChild) return shadowRoot.firstElementChild as HTMLElement;
	}

	if (el === document.body || !el) return document.body;
	if (isScrollable && el.scrollHeight > el.clientHeight) return el;
	if (isFixed && !overflowOnly) return el;
	return findClosestRenderContainer({ el: el.parentElement, iteration: iteration + 1 });
};
