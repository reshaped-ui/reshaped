export const getScrollbarWidth = (() => {
	let scrollbarWidth: number;

	return () => {
		if (scrollbarWidth) return scrollbarWidth;

		const scrollDiv = document.createElement("div");
		scrollDiv.style.position = "absolute";
		scrollDiv.style.top = "-9999px";
		scrollDiv.style.width = "50px";
		scrollDiv.style.height = "50px";
		scrollDiv.style.overflow = "scroll";
		document.body.appendChild(scrollDiv);
		scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);

		return scrollbarWidth;
	};
})();

const isScrollable = (node: Element, options?: { checkScrollableHeight?: boolean }) => {
	const style = window.getComputedStyle(node);
	let scrollable = /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);

	if (scrollable && options?.checkScrollableHeight) {
		scrollable = node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth;
	}

	return scrollable;
};

export const getClosestScrollableParent = (...args: Parameters<typeof isScrollable>) => {
	const [node, options] = args;
	let scrollableNode: Element | null = node.parentElement;

	while (scrollableNode && !isScrollable(scrollableNode, options)) {
		scrollableNode = scrollableNode.parentElement;
	}

	return scrollableNode || document.scrollingElement || document.documentElement;
};

export const opensKeyboardOnFocus = (node: Element) => {
	return (
		(node instanceof HTMLInputElement && node.type === "text") ||
		node instanceof HTMLTextAreaElement ||
		(node instanceof HTMLElement && node.isContentEditable)
	);
};
