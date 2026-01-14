type Args = {
	el: HTMLElement;
};

const findClosestScrollableContainer = (args: Args & { iteration: number }): HTMLElement | null => {
	const { el, iteration } = args;
	const style = el && window.getComputedStyle(el);
	const overflowY = style.overflowY;
	const isScrollable = overflowY.includes("scroll") || overflowY.includes("auto");

	if (!el.parentElement) return null;
	if (isScrollable && el.scrollHeight > el.clientHeight) return el;

	return findClosestScrollableContainer({ el: el.parentElement, iteration: iteration + 1 });
};

export default (args: Args) => findClosestScrollableContainer({ ...args, iteration: 0 });
