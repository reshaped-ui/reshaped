type Listener = () => void;

const listeners = new Set<Listener>();
let height = 0;
let offset = 0;

/**
 * iOS, and Android by default, keep the layout as it is when the on-screen keyboard opens and only shrink the visual viewport,
 * so the keyboard height is the part of the dynamic viewport the visual viewport doesn't reach.
 * The dynamic viewport is measured with an element since there is no other way to resolve its units
 */
const measure = () => {
	const viewport = window.visualViewport;
	if (!viewport) return 0;

	const probeEl = document.createElement("div");
	probeEl.style.cssText =
		"position:fixed;top:0;left:0;width:0;height:100dvh;visibility:hidden;pointer-events:none";
	document.body.appendChild(probeEl);
	const dynamicHeight = probeEl.getBoundingClientRect().height;
	probeEl.style.height = "100svh";
	const smallHeight = probeEl.getBoundingClientRect().height;
	probeEl.remove();

	// Viewport units include the classic scrollbar of the document, which the visual viewport leaves out
	const scrollbarHeight = Math.max(0, smallHeight - document.documentElement.clientHeight);
	// Visual viewport gets smaller with the pinch zoom, so it's scaled back to the layout size
	const visibleHeight = viewport.height * viewport.scale;

	// Rounded down to keep the subpixel difference of a zoomed page from being treated as a keyboard
	return Math.max(0, Math.floor(dynamicHeight - scrollbarHeight - visibleHeight));
};

/**
 * Browser pans the visual viewport down the layout to reveal the focused field, which moves the fixed elements up with the page.
 * Only the pan that happens with the keyboard open is kept, a pinch zoom pans the viewport as well
 */
const measureOffset = (keyboardHeight: number) => {
	const viewport = window.visualViewport;
	if (!viewport || !keyboardHeight) return 0;

	return Math.min(keyboardHeight, Math.max(0, Math.round(viewport.offsetTop)));
};

const update = () => {
	const nextHeight = measure();
	const nextOffset = measureOffset(nextHeight);
	if (nextHeight === height && nextOffset === offset) return;

	height = nextHeight;
	offset = nextOffset;
	listeners.forEach((listener) => listener());
};

/**
 * Height of the area the on-screen keyboard covers at the bottom of the viewport,
 * 0 when it's closed or when the browser resizes the layout to fit above the keyboard.
 * Updated while there is at least one subscriber
 */
export const getVirtualKeyboardHeight = () => height;

/**
 * Distance the visible area is panned down the layout while the keyboard is open,
 * the part of the keyboard height that is above the visible area instead of below it
 */
export const getVirtualKeyboardOffset = () => offset;

export const subscribeVirtualKeyboard = (listener: Listener) => {
	if (!listeners.size) {
		window.visualViewport?.addEventListener("resize", update);
		window.visualViewport?.addEventListener("scroll", update);
		update();
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (listeners.size) return;

		window.visualViewport?.removeEventListener("resize", update);
		window.visualViewport?.removeEventListener("scroll", update);
	};
};
