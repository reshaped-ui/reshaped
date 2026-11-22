import { findClosestScrollableContainer } from "@/dom";

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

/** Distance in px kept between the revealed field and the edges of the area visible above the keyboard */
const REVEAL_MARGIN = 16;

/** Field that opens the on-screen keyboard when it's focused */
const isKeyboardField = (el: Element | null): el is HTMLElement => {
	if (el instanceof HTMLTextAreaElement) return !el.disabled && !el.readOnly;
	if (el instanceof HTMLInputElement) {
		return !el.disabled && !el.readOnly && !NON_TEXT_INPUT_TYPES.has(el.type);
	}

	return el instanceof HTMLElement && el.isContentEditable;
};

/**
 * Field a press is about to focus.
 * Controls rendered inside an editable area handle their presses themselves, so they don't resolve to the area around them
 */
const getPressedField = (target: Element) => {
	const el = target.closest<HTMLElement>(
		"input, textarea, select, button, a[href], [contenteditable]"
	);

	if (!el || el.matches("select, button, a[href]") || !isKeyboardField(el)) return null;
	if (!el.isContentEditable) return el;

	// Editable area takes the focus as a whole, with its outermost editable element
	let host = el;
	while (host.parentElement?.isContentEditable) host = host.parentElement;
	return host;
};

/**
 * Safari resolves where to pan the page from the geometry the field has while it's getting focused,
 * and pans it for the fields inside the transformed containers even when the focus prevents scrolling.
 * The field is moved above the screen only for the synchronous focus call, so it's never painted there
 */
const focusWithoutPan = (field: HTMLElement) => {
	const { opacity, transform, transition } = field.style;

	field.style.transition = "none";
	field.style.opacity = "0";
	field.style.transform = "translateY(-2000px)";

	try {
		field.focus({ preventScroll: true });
	} finally {
		field.style.opacity = opacity;
		field.style.transform = transform;
		field.style.transition = transition;
	}
};

/** Safari keeps the caret where the field last had it when the field is focused before its own tap handling */
const placeCaret = (field: HTMLElement, point: { x: number; y: number }) => {
	const position = document.caretPositionFromPoint?.(point.x, point.y);
	if (!position) return;

	const node = position.offsetNode;

	if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
		// Fields without a text selection, like an email input, don't have a caret to place
		if (node !== field || field.selectionStart === null) return;
		field.setSelectionRange(position.offset, position.offset);
		return;
	}

	const el = node instanceof HTMLElement ? node : node.parentElement;
	if (!field.contains(node) || !el?.isContentEditable) return;

	window.getSelection()?.collapse(node, position.offset);
};

/** Area the focused field should be visible in, the caret for the editable areas that can be taller than the screen */
const getRevealRect = (field: HTMLElement) => {
	const selection = window.getSelection();

	if (field.isContentEditable && selection?.rangeCount && field.contains(selection.focusNode)) {
		const range = selection.getRangeAt(0).cloneRange();
		range.collapse(false);
		const rect = range.getBoundingClientRect();

		// Collapsed range can have no size, e.g. at the start of an empty line
		if (rect.height) return rect;
	}

	return field.getBoundingClientRect();
};

/**
 * Focusing without scrolling also skips scrolling the field into view inside its own scrollable container,
 * so it's revealed there without moving the page
 */
const revealFocusedField = () => {
	const field = document.activeElement;
	const viewport = window.visualViewport;
	if (!viewport || !isKeyboardField(field) || !field.parentElement) return;

	// Field scrolling its own content can't move itself from under the keyboard
	const scrollEl = findClosestScrollableContainer({ el: field.parentElement });
	if (!scrollEl) return;

	const rect = getRevealRect(field);
	const scrollRect = scrollEl.getBoundingClientRect();
	const top = Math.max(scrollRect.top, viewport.offsetTop) + REVEAL_MARGIN;
	const bottom = Math.min(scrollRect.bottom, viewport.offsetTop + viewport.height) - REVEAL_MARGIN;

	if (rect.bottom > bottom) {
		// Fields taller than the visible area keep their start in view
		scrollEl.scrollTop += Math.min(rect.bottom - bottom, rect.top - top);
	} else if (rect.top < top) {
		scrollEl.scrollTop -= top - rect.top;
	}
};

/**
 * iOS covers the page with the on-screen keyboard instead of resizing it,
 * and pans the whole page to reveal the focused field even while the page scroll is locked with overflow.
 * That moves the fixed content rendered above the locked page, like modals, outside of the screen.
 * While the page scroll is locked:
 * - Fields are focused without letting Safari pan the page for them
 * - Page panned anyway, e.g. by moving between the fields with the keyboard arrows, is put back
 * - Focused field is revealed inside its own scrollable container instead
 */
export const preventKeyboardPan = () => {
	const viewport = window.visualViewport;
	const baseX = window.scrollX;
	const baseY = window.scrollY;
	let frame: number | undefined;

	const scheduleReveal = () => {
		if (frame !== undefined) cancelAnimationFrame(frame);
		// Waits for the layout reacting to the keyboard, e.g. modals ending above it
		frame = requestAnimationFrame(revealFocusedField);
	};

	const handleMouseDown = (e: MouseEvent) => {
		if (e.button !== 0 || !(e.target instanceof Element)) return;

		const field = getPressedField(e.target);
		// Focused field handles the press natively to move its caret
		if (!field || field === document.activeElement) return;

		focusWithoutPan(field);
		placeCaret(field, { x: e.clientX, y: e.clientY });
		// Keyboard that is already open doesn't resize the viewport for the next field
		scheduleReveal();
	};

	const handleScroll = () => {
		// Zoomed page is panned by the user
		if (viewport && viewport.scale !== 1) return;
		if (!isKeyboardField(document.activeElement)) return;

		const scrolled = Math.abs(window.scrollX - baseX) >= 1 || Math.abs(window.scrollY - baseY) >= 1;
		const panned = Boolean(viewport && viewport.offsetTop >= 1);
		if (!scrolled && !panned) return;

		// Instant behavior ignores the smooth scrolling that could be enabled for the page
		window.scrollTo({ left: baseX, top: baseY, behavior: "instant" });
	};

	// Captured to focus the field before the handlers of the page do it without the geometry override
	document.addEventListener("mousedown", handleMouseDown, true);
	window.addEventListener("scroll", handleScroll, { passive: true });
	viewport?.addEventListener("scroll", handleScroll);
	viewport?.addEventListener("resize", scheduleReveal);

	return () => {
		if (frame !== undefined) cancelAnimationFrame(frame);

		document.removeEventListener("mousedown", handleMouseDown, true);
		window.removeEventListener("scroll", handleScroll);
		viewport?.removeEventListener("scroll", handleScroll);
		viewport?.removeEventListener("resize", scheduleReveal);
	};
};
