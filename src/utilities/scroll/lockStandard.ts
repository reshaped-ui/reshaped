import { findClosestRenderContainer } from "utilities/dom";
import { getScrollbarWidth } from "./helpers";
import { StyleCache } from "utilities/css";

const styleCache = new StyleCache();

const lockStandardScroll = (args: {
	containerEl?: HTMLElement | null;
	originEl?: HTMLElement | null;
}) => {
	let container = document.body;
	if (args.originEl) container = findClosestRenderContainer({ el: args.originEl }).el;
	if (args.containerEl) container = args.containerEl;

	const rect = container.getBoundingClientRect();
	const isOverflowing = rect.left + rect.right < window.innerWidth;

	styleCache.set(container, { overflow: "hidden" });

	if (isOverflowing) {
		const scrollBarWidth = getScrollbarWidth();
		styleCache.set(container, { paddingRight: `${scrollBarWidth}px` });
	}

	return () => {
		styleCache.reset();
	};
};

export default lockStandardScroll;
