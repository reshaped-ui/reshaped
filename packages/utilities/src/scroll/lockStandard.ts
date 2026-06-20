import { StyleCache } from "@/css";
import { getScrollbarWidth } from "./helpers";

const styleCache = new StyleCache();

const lockStandardScroll = (args: { container: HTMLElement }) => {
	const { container } = args;
	const isOverflowing = container.scrollHeight > container.clientHeight;

	styleCache.set(container, { overflow: "hidden" });

	if (isOverflowing) {
		if (CSS.supports("scrollbar-gutter", "stable")) {
			styleCache.set(container, { scrollbarGutter: "stable" });
		} else {
			const scrollBarWidth = getScrollbarWidth();
			styleCache.set(container, { paddingRight: `${scrollBarWidth}px` });
		}
	}

	return () => styleCache.reset();
};

export default lockStandardScroll;
