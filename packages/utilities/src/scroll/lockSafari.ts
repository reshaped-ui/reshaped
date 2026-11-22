import { StyleCache } from "@/css";
import { preventKeyboardPan } from "./keyboardPan";

const styleCache = new StyleCache();

/**
 * Viewport overflow comes from <html> when it has its own overflow value,
 * and propagates from <body> otherwise, so an overflow style on the other element doesn't lock the page.
 */
const getViewportScroller = () => {
	const html = document.documentElement;
	const { overflowX, overflowY } = window.getComputedStyle(html);
	const htmlHasOverflow = overflowX !== "visible" || overflowY !== "visible";

	return htmlHasOverflow ? html : document.body;
};

/**
 * iOS uses overlay scrollbars, so the document scroll is locked with overflow only.
 * Body is not moved to a fixed position since that collapses the document height,
 * which makes Safari lose its translucent toolbars and resets the scroll position on unlock.
 * Overflow doesn't stop Safari from panning the page for the on-screen keyboard, so that is prevented separately
 */
const lockSafariScroll = () => {
	const el = getViewportScroller();

	// Longhands keep the original value of each axis when unlocking, e.g. overflow-x: hidden on body
	styleCache.set(el, { overflowX: "hidden", overflowY: "hidden" });

	const allowKeyboardPan = preventKeyboardPan();

	return () => {
		styleCache.reset(el);
		allowKeyboardPan();
	};
};

export default lockSafariScroll;
