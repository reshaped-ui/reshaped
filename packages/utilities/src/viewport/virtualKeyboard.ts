type Listener = () => void;

const listeners = new Set<Listener>();
let height = 0;

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

const update = () => {
	const nextHeight = measure();
	if (nextHeight === height) return;

	height = nextHeight;
	listeners.forEach((listener) => listener());
};

/**
 * Height of the area the on-screen keyboard covers at the bottom of the viewport,
 * 0 when it's closed or when the browser resizes the layout to fit above the keyboard.
 * Updated while there is at least one subscriber
 */
export const getVirtualKeyboardHeight = () => height;

export const subscribeVirtualKeyboard = (listener: Listener) => {
	if (!listeners.size) {
		window.visualViewport?.addEventListener("resize", update);
		update();
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (!listeners.size) window.visualViewport?.removeEventListener("resize", update);
	};
};
