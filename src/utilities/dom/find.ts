import { getShadowRoot } from "./shadowDom";

export const findParent = (element: HTMLElement, condition: (el: HTMLElement) => boolean) => {
	let currentElement = element.parentElement;

	while (currentElement) {
		if (condition(currentElement)) return currentElement;
		currentElement = currentElement.parentElement;
	}

	return null;
};

export const findClosestPositionContainer = (args: {
	el: HTMLElement | null;
	iteration?: number;
}): HTMLElement => {
	const { el, iteration = 0 } = args;
	const style = el && window.getComputedStyle(el);
	const position = style?.position;
	const isFixed = position === "fixed" || position === "sticky";

	if (iteration === 0) {
		const shadowRoot = getShadowRoot(el);
		if (shadowRoot?.firstElementChild) return shadowRoot.firstElementChild as HTMLElement;
	}

	if (el === document.body || !el) return document.body;
	if (isFixed) return el;
	return findClosestPositionContainer({ el: el.parentElement, iteration: iteration + 1 });
};

export const findClosestScrollableContainer = (args: {
	el: HTMLElement;
	iteration?: number;
	overflowOnly?: boolean;
}): HTMLElement => {
	const { el, iteration = 0 } = args;
	const style = el && window.getComputedStyle(el);
	const overflowY = style?.overflowY;
	const isScrollable = overflowY?.includes("scroll") || overflowY?.includes("auto");

	if (!el.parentElement) return el;
	if (isScrollable && el.scrollHeight > el.clientHeight) return el;
	return findClosestScrollableContainer({ el: el.parentElement, iteration: iteration + 1 });
};
