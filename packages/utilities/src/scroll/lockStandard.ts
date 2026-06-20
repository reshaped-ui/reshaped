import { StyleCache } from "@/css";
import { getScrollbarWidth } from "./helpers";

const styleCache = new StyleCache();

const lockStandardScroll = (args: { container: HTMLElement }) => {
	const { container } = args;
	const isOverflowing = container.scrollHeight > container.clientHeight;
	const styles: Record<string, string> = { overflow: "hidden" };

	if (isOverflowing) {
		if (CSS.supports("scrollbar-gutter", "stable")) {
			styles.scrollbarGutter = "stable";
		} else {
			styles.paddingRight = `${getScrollbarWidth()}px`;
		}
	}

	styleCache.set(container, styles);

	return () => styleCache.reset(container);
};

export default lockStandardScroll;
