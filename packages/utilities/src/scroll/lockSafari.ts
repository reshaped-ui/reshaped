import { StyleCache } from "@/css";
import { getViewportScroller, handOverKeyboardPan } from "./keyboardPan";

const styleCache = new StyleCache();

/**
 * iOS uses overlay scrollbars, so the document scroll is locked with overflow only.
 * Body is not moved to a fixed position since that collapses the document height,
 * which makes Safari lose its translucent toolbars and resets the scroll position on unlock.
 * Revealing the focused fields above the on-screen keyboard is left to Safari:
 * taking over its focus handling and panning makes the page jump between the positions both of them resolve.
 * A pan Safari leaves on the locked page is handed over to the field's scrollable container once it's settled.
 * The Reshaped provider keeps that running on iOS too, for the pages that can't be scrolled without a lock
 */
const lockSafariScroll = () => {
	const el = getViewportScroller();

	// Longhands keep the original value of each axis when unlocking, e.g. overflow-x: hidden on body
	styleCache.set(el, { overflowX: "hidden", overflowY: "hidden" });
	const releaseKeyboardPan = handOverKeyboardPan();

	return () => {
		releaseKeyboardPan();
		styleCache.reset(el);
	};
};

export default lockSafariScroll;
