import { isIOS } from "utilities/platform";
import { getScrollbarWidth } from "./helpers";
import { lockSafariScroll } from "./lockSafari";
import { setStyle, resetStyles } from "./styles";

const lockedIds: Record<string, boolean> = {};
let unlockSafariScroll: ReturnType<typeof lockSafariScroll> | null = null;

export const lockScroll = (id: string, cb?: () => void) => {
	lockedIds[id] = true;

	if (Object.keys(lockedIds).length > 1) return;

	const { body } = document;
	const rect = body.getBoundingClientRect();
	const isOverflowing = rect.left + rect.right < window.innerWidth;

	if (isIOS()) {
		unlockSafariScroll = lockSafariScroll();
	} else {
		setStyle(body, "overflow", "hidden");
	}

	if (isOverflowing) {
		const scrollBarWidth = getScrollbarWidth();
		setStyle(body, "paddingRight", `${scrollBarWidth}px`);
	}

	cb?.();
};

export const unlockScroll = (id: string, cb?: () => void) => {
	delete lockedIds[id];
	if (Object.keys(lockedIds).length) return;

	resetStyles();

	if (unlockSafariScroll) {
		unlockSafariScroll();
		unlockSafariScroll = null;
	}

	cb?.();
};
