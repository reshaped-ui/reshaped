export const getClosestScrollableParent = (el: HTMLElement | null): HTMLElement => {
	const overflowY = el && window.getComputedStyle(el).overflowY;
	const isScrollable = overflowY?.includes("scroll");

	if (el === document.body || !el) return document.body;
	if (isScrollable && el.scrollHeight > el.clientHeight) return el;
	return getClosestScrollableParent(el.parentElement);
};
