import { opensKeyboardOnFocus, getClosestScrollableParent } from "./helpers";
import { resetStyles, setStyle } from "./styles";

/**
 * iOS safari doesn't respect overflow hidden when keyboard is shown
 * so we need to implement a custom way to lock the scroll just for this browser
 *
 * Based on: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/usePreventScroll.ts
 */

export const lockSafariScroll = () => {
	let scrollable: Element;
	let originalScrollableStyle: string;
	let scrollX: number;
	let scrollY: number;

	const onWindowScroll = () => {
		// Last resort. If the window scrolled, scroll it back to the top.
		// It should always be at the top because the body will have a negative margin (see below).
		window.scrollTo(0, 0);
	};

	const resetSafariLock = () => {
		window.removeEventListener("scroll", onWindowScroll);
		window.scrollTo(scrollX, scrollY);
	};

	const setupSafariLock = () => {
		resetSafariLock();

		// Record the original scroll position so we can restore it.
		// Then apply a negative margin to the body to offset it by the scroll position. This will
		// enable us to scroll the window to the top, which is required for the rest of this to work.
		scrollX = window.scrollX;
		scrollY = window.scrollY;

		setStyle(document.documentElement, "overflow", "hidden");
		setStyle(document.body, "marginTop", `-${window.scrollY}px`);

		// Scroll to the top. The negative margin on the body will make this appear the same.
		window.scrollTo(0, 0);
		window.addEventListener("scroll", onWindowScroll);
	};

	const onTouchStart = (e: TouchEvent) => {
		scrollable = getClosestScrollableParent(e.target as Element, {
			checkScrollableHeight: true,
		});

		if (scrollable === document.documentElement && scrollable === document.body) {
			return;
		}

		// Prevent scrolling up when at the top and scrolling down when at the bottom
		// of a nested scrollable area, otherwise mobile Safari will start scrolling
		// the window instead.
		if (
			scrollable instanceof HTMLElement &&
			window.getComputedStyle(scrollable).overscrollBehavior === "auto"
		) {
			scrollable.style.overscrollBehavior = "contain";
		}
	};

	const onTouchMove = (e: TouchEvent) => {
		// Prevent scrolling the window.
		if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
			e.preventDefault();
			return;
		}

		// overscroll-behavior should prevent scroll chaining, but currently does not
		// if the element doesn't actually overflow. https://bugs.webkit.org/show_bug.cgi?id=243452
		// This checks that both the width and height do not overflow, otherwise we might
		// block horizontal scrolling too. In that case, adding `touch-action: pan-x` to
		// the element will prevent vertical page scrolling. We can't add that automatically
		// because it must be set before the touchstart event.
		if (
			scrollable.scrollHeight === scrollable.clientHeight &&
			scrollable.scrollWidth === scrollable.clientWidth
		) {
			e.preventDefault();
		}
	};

	const onTouchEnd = (e: TouchEvent) => {
		const target = e.target as HTMLElement;

		// Apply this change if we're not already focused on the target element
		if (opensKeyboardOnFocus(target) && target !== document.activeElement) {
			e.preventDefault();
			setupSafariLock();

			// Apply a transform to trick Safari into thinking the input is at the top of the page
			// so it doesn't try to scroll it into view. When tapping on an input, this needs to
			// be done before the "focus" event, so we have to focus the element ourselves.
			target.style.transform = "translateY(-2000px)";
			target.focus();
			requestAnimationFrame(() => {
				target.style.transform = "";
			});
		}

		if (originalScrollableStyle && scrollable instanceof HTMLElement) {
			scrollable.style.overscrollBehavior = originalScrollableStyle;
		}
	};

	const onFocus = (e: FocusEvent) => {
		const target = e.target as HTMLElement;
		if (opensKeyboardOnFocus(target)) {
			setupSafariLock();

			// Transform also needs to be applied in the focus event in cases where focus moves
			// other than tapping on an input directly, e.g. the next/previous buttons in the
			// software keyboard. In these cases, it seems applying the transform in the focus event
			// is good enough, whereas when tapping an input, it must be done before the focus event. 🤷‍♂️
			target.style.transform = "translateY(-2000px)";
			requestAnimationFrame(() => {
				target.style.transform = "";

				// This will have prevented the browser from scrolling the focused element into view,
				// so we need to do this ourselves in a way that doesn't cause the whole page to scroll.
				if (visualViewport) {
					if (visualViewport.height < window.innerHeight) {
						// If the keyboard is already visible, do this after one additional frame
						// to wait for the transform to be removed.
						requestAnimationFrame(() => {
							target.scrollIntoView({ block: "nearest" });
						});
					} else {
						// Otherwise, wait for the visual viewport to resize before scrolling so we can
						// measure the correct position to scroll to.
						visualViewport.addEventListener(
							"resize",
							() => target.scrollIntoView({ block: "nearest" }),
							{ once: true }
						);
					}
				}
			});
		}
	};

	document.addEventListener("touchstart", onTouchStart, {
		passive: false,
		capture: true,
	});
	document.addEventListener("touchmove", onTouchMove, {
		passive: false,
		capture: true,
	});
	document.addEventListener("touchend", onTouchEnd, {
		passive: false,
		capture: true,
	});
	document.addEventListener("focus", onFocus, true);

	return () => {
		resetSafariLock();

		document.removeEventListener("touchstart", onTouchStart, {
			capture: true,
		});
		document.removeEventListener("touchmove", onTouchMove, {
			capture: true,
		});
		document.removeEventListener("touchend", onTouchEnd, {
			capture: true,
		});
		document.removeEventListener("focus", onFocus, true);
	};
};
