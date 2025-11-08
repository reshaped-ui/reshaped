import { StyleCache } from "utilities/css";

import { getScrollbarWidth } from "./helpers";

const styleCache = new StyleCache();

const lockStandardScroll = (args: { container: HTMLElement }) => {
	const { container } = args;
	const rect = container.getBoundingClientRect();
	const isOverflowing = rect.left + rect.right < window.innerWidth;

	styleCache.set(container, { overflow: "hidden" });

	if (isOverflowing) {
		const scrollBarWidth = getScrollbarWidth();
		styleCache.set(container, { paddingRight: `${scrollBarWidth}px` });
	}

	return () => styleCache.reset();
};

export default lockStandardScroll;
