export const getClosestScrollableParent = (el: HTMLElement | null): HTMLElement => {
	if (el === document.body || !el) return document.body;
	if (el.scrollHeight > el.clientHeight) return el;
	return getClosestScrollableParent(el.parentElement);
};
