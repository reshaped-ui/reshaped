import { findClosestScrollableContainer } from "@/dom";
import { getVirtualKeyboardHeight, subscribeVirtualKeyboard } from "@/viewport";

/** Input types that don't open the on-screen keyboard */
const NON_TEXT_INPUT_TYPES = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset",
]);

/** Time the page has to hold still before it's handed over, longer than the pan Safari animates with the keyboard */
const SETTLE_DELAY = 200;

/** Field that opens the on-screen keyboard when it's focused */
const isKeyboardField = (el: Element | null): el is HTMLElement => {
	if (el instanceof HTMLTextAreaElement) return !el.disabled && !el.readOnly;
	if (el instanceof HTMLInputElement) {
		return !el.disabled && !el.readOnly && !NON_TEXT_INPUT_TYPES.has(el.type);
	}

	return el instanceof HTMLElement && el.isContentEditable;
};

/**
 * iOS Safari pans the whole page to reveal a focused field when its scrollable container can't scroll far enough,
 * for example when it's scrolled to its end, and does that even while the page scroll is locked with overflow.
 * Fixed content, like modals, moves up with the page, and nothing can pan it back while the keyboard is open,
 * so the top of the modal stays off screen.
 *
 * Once Safari is done panning, the pan is handed over to the scrollable container of the focused field:
 * the container is scrolled by the pan and the page is scrolled back in the same frame,
 * so the field stays where Safari revealed it and the rest of the fixed content comes back on screen.
 * Revealing the field is still left to Safari: focus isn't taken over and nothing moves while it's panning.
 */
export const handOverKeyboardPan = () => {
	const viewport = window.visualViewport;
	if (!viewport) return () => {};

	const baseX = window.scrollX;
	const baseY = window.scrollY;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let touching = false;
	let slack: { el: HTMLElement; paddingBottom: string; basePadding: number; value: number } | null =
		null;

	const resetSlack = () => {
		if (!slack) return;
		slack.el.style.paddingBottom = slack.paddingBottom;
		slack = null;
	};

	/** Room at the end of the container for the part of the pan it can't scroll by, kept while the keyboard is open */
	const addSlack = (el: HTMLElement, value: number) => {
		if (slack?.el !== el) {
			resetSlack();
			slack = {
				el,
				paddingBottom: el.style.paddingBottom,
				basePadding: parseFloat(window.getComputedStyle(el).paddingBottom) || 0,
				value: 0,
			};
		}

		slack.value += Math.ceil(value);
		el.style.paddingBottom = `${slack.basePadding + slack.value}px`;
	};

	const handOver = () => {
		timeout = undefined;

		// Zoomed page and a finger on the screen pan the page themselves
		if (touching || viewport.scale !== 1 || !getVirtualKeyboardHeight()) return;

		const pan = window.scrollY - baseY;
		const field = document.activeElement;
		if (pan < 1 || !isKeyboardField(field) || !field.parentElement) return;

		// Field scrolling its own content can't take the page pan
		const container = findClosestScrollableContainer({ el: field.parentElement });
		if (!container) return;

		const room = container.scrollHeight - container.clientHeight - container.scrollTop;
		if (room < pan) {
			const clientHeight = container.clientHeight;
			addSlack(container, pan - room);
			// Container sized by its content grows with the padding instead of scrolling further
			if (container.clientHeight !== clientHeight) resetSlack();
		}

		const scrollTop = container.scrollTop;
		container.scrollTop = scrollTop + pan;
		const scrolled = container.scrollTop - scrollTop;

		// Instant behavior ignores the smooth scrolling that could be enabled for the page
		window.scrollTo({ left: baseX, top: baseY + pan - scrolled, behavior: "instant" });
	};

	const scheduleHandOver = () => {
		clearTimeout(timeout);
		timeout = setTimeout(handOver, SETTLE_DELAY);
	};

	const handleTouch = (e: TouchEvent) => {
		touching = e.touches.length > 0;
		if (!touching) scheduleHandOver();
	};

	const handleKeyboardChange = () => {
		if (getVirtualKeyboardHeight()) scheduleHandOver();
		else resetSlack();
	};

	const unsubscribeKeyboard = subscribeVirtualKeyboard(handleKeyboardChange);
	window.addEventListener("scroll", scheduleHandOver, { passive: true });
	viewport.addEventListener("scroll", scheduleHandOver);
	document.addEventListener("focusin", scheduleHandOver);
	document.addEventListener("touchstart", handleTouch, { passive: true, capture: true });
	document.addEventListener("touchend", handleTouch, { passive: true, capture: true });
	document.addEventListener("touchcancel", handleTouch, { passive: true, capture: true });

	return () => {
		clearTimeout(timeout);
		resetSlack();
		unsubscribeKeyboard();
		window.removeEventListener("scroll", scheduleHandOver);
		viewport.removeEventListener("scroll", scheduleHandOver);
		document.removeEventListener("focusin", scheduleHandOver);
		document.removeEventListener("touchstart", handleTouch, { capture: true });
		document.removeEventListener("touchend", handleTouch, { capture: true });
		document.removeEventListener("touchcancel", handleTouch, { capture: true });
	};
};
