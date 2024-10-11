import { getScrollbarWidth } from "./helpers";

let originalBodyStyles: Pick<React.CSSProperties, "overflow" | "paddingRight"> = {};

const lockStandardScroll = () => {
	const { body } = document;
	const rect = body.getBoundingClientRect();
	const isOverflowing = rect.left + rect.right < window.innerWidth;

	originalBodyStyles.overflow = body.style.overflow;
	body.style.overflow = "hidden";

	if (isOverflowing) {
		const scrollBarWidth = getScrollbarWidth();

		originalBodyStyles.paddingRight = body.style.paddingRight;
		body.style.paddingRight = `${scrollBarWidth}px`;
	}

	return () => {
		Object.assign(body.style, originalBodyStyles);
		originalBodyStyles = {};
	};
};

export default lockStandardScroll;
