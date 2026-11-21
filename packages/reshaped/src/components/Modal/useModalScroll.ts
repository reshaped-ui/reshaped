"use client";

import { useRef, useState } from "react";
import { rafThrottle } from "@reshaped/utilities/internal";

import type { OverlayInstance } from "@/components/Overlay";
import useHandlerRef from "@/hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import type * as T from "./Modal.types";

/** Screen side the modal is attached to and moves towards when it's swiped away */
export type Side = "bottom" | "left" | "right";

/** Time in ms without the scroll events after which the scrolling is considered to be over */
const SCROLL_END_TIMEOUT = 150;

/** Time in ms given to the close handler to update the active state before the modal is returned back */
const KEEP_OPEN_TIMEOUT = 100;

/**
 * Element can scroll its own content in the direction of the wheel event
 */
const canScrollWithWheel = (el: HTMLElement, e: WheelEvent) => {
	const style = window.getComputedStyle(el);

	if (e.deltaY && (style.overflowY === "auto" || style.overflowY === "scroll")) {
		const maxScroll = el.scrollHeight - el.clientHeight;

		if (e.deltaY > 0 ? maxScroll - el.scrollTop >= 1 : el.scrollTop >= 1) return true;
	}

	if (e.deltaX && (style.overflowX === "auto" || style.overflowX === "scroll")) {
		// Sign of the horizontal scroll position depends on the content direction, so any scrollable distance counts
		if (el.scrollWidth - el.clientWidth >= 1) return true;
	}

	return false;
};

/**
 * Swipe gesture closing the modal, based on the native scrolling.
 *
 * Modal is rendered next to a spacer inside a scroll container with the snap points
 * at its open and closed positions. Swiping the modal scrolls that container,
 * so the browser moves it with the finger on its own, without waiting for the page scripts,
 * and applies the native momentum, rubber banding and the gesture arbitration with the modal content.
 */
const useModalScroll = (args: {
	side: Side;
	overlayRef: React.RefObject<OverlayInstance | null>;
	active?: boolean;
	enabled?: boolean;
	onClose?: T.Props["onClose"];
}) => {
	const { side, overlayRef, active, enabled } = args;
	const onCloseRef = useHandlerRef(args.onClose);
	// Stored in the state since the container is only rendered while the modal is displayed
	const [scrollerEl, setScrollerEl] = useState<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const edgeRef = useRef<HTMLDivElement>(null);
	// Modal is already out of the view when it's swiped away, so it doesn't need a close animation
	const [dismissed, setDismissed] = useState(false);
	const activeRef = useRef(active);

	activeRef.current = active;

	useIsomorphicLayoutEffect(() => {
		if (active) setDismissed(false);
	}, [active]);

	useIsomorphicLayoutEffect(() => {
		const trackEl = trackRef.current;
		if (!scrollerEl || !trackEl || !enabled) return;

		const vertical = side === "bottom";
		// Finger is on the screen
		let touching = false;
		// Current scrolling was started with a touch, any other scrolling can't move the modal
		let gesture = false;
		// Modal is scrolling back to its open position after it was kept open
		let returning = false;
		// Position of the modal during the previous check, used for detecting if it's still moving
		let settledHidden: number | null = null;
		let timer: ReturnType<typeof setTimeout> | null = null;
		let keepOpenTimer: ReturnType<typeof setTimeout> | null = null;

		/**
		 * Size of the modal on the scroll axis, including its offset from the screen edge,
		 * and how much of it is currently scrolled out of the view
		 */
		const measure = () => {
			const scrollerRect = scrollerEl.getBoundingClientRect();
			const trackRect = trackEl.getBoundingClientRect();
			let hidden = 0;

			if (side === "bottom") hidden = trackRect.bottom - scrollerRect.bottom;
			if (side === "right") hidden = trackRect.right - scrollerRect.right;
			if (side === "left") hidden = scrollerRect.left - trackRect.left;

			return { hidden, size: vertical ? trackRect.height : trackRect.width };
		};

		/** Scroll offset change bringing the modal to its open position */
		const getOpenDelta = () => {
			const { hidden } = measure();
			return side === "left" ? -hidden : hidden;
		};

		const align = () => {
			const delta = getOpenDelta();
			if (Math.abs(delta) < 0.5) return;

			if (vertical) scrollerEl.scrollTop += delta;
			else scrollerEl.scrollLeft += delta;
		};

		const render = () => {
			const { hidden, size } = measure();
			const progress = size ? Math.min(1, Math.max(0, hidden / size)) : 0;

			overlayRef.current?.setOpacity(1 - progress);
			// Strip filling the browser toolbar area moves away together with the modal
			edgeRef.current?.style.setProperty("transform", `translateY(${Math.max(0, hidden)}px)`);
		};
		const renderOnNextFrame = rafThrottle(render);

		/** Marks the gesture and the return animation as finished */
		const resetGesture = () => {
			gesture = false;
			returning = false;
			settledHidden = null;
		};

		const dismiss = () => {
			setDismissed(true);
			onCloseRef.current?.({ reason: "drag" });

			// Modal stays open when its active state is not updated in the close handler
			keepOpenTimer = setTimeout(() => {
				if (!activeRef.current) return;

				returning = true;
				setDismissed(false);
				scrollerEl.scrollBy({
					[vertical ? "top" : "left"]: getOpenDelta(),
					behavior: "smooth",
				});
			}, KEEP_OPEN_TIMEOUT);
		};

		/** Called when the scrolling seems to be over to check where the browser has snapped the modal to */
		const settle = () => {
			if (timer) clearTimeout(timer);
			timer = null;

			// Modal can still be moved back while it's held with a finger
			if (touching) return;

			const { hidden, size } = measure();
			const moved = settledHidden === null || Math.abs(hidden - settledHidden) >= 0.5;

			settledHidden = hidden;

			if (gesture && size > 0 && hidden >= size - 1) {
				resetGesture();
				dismiss();
				return;
			}

			// Browser is still moving the modal to one of its positions, e.g. while it bounces back after an overscroll
			if (Math.abs(hidden) >= 1 && (gesture || returning) && moved) {
				scheduleSettle();
				return;
			}

			resetGesture();
			// Keeps the modal open in case the browser hasn't snapped it back
			align();
			render();
		};

		function scheduleSettle() {
			if (timer) clearTimeout(timer);
			timer = setTimeout(settle, SCROLL_END_TIMEOUT);
		}

		const handleScroll = () => {
			// Scrolling with a keyboard or a mouse wheel is not a part of the swipe gesture
			if (!gesture && !touching && !returning) align();

			scheduleSettle();
			renderOnNextFrame();
		};

		const handleTouchStart = () => {
			touching = true;
			gesture = true;
			returning = false;
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (e.touches.length) return;

			touching = false;
			// Modal released without moving doesn't trigger any other scroll events
			scheduleSettle();
		};

		const handleWheel = (e: WheelEvent) => {
			// Pinch gestures of the trackpads are reported as wheel events
			if (e.ctrlKey) return;

			let el = e.target as HTMLElement | null;

			while (el && el !== scrollerEl) {
				if (canScrollWithWheel(el, e)) return;
				el = el.parentElement;
			}

			// Wheel scrolling that can't be used by the modal content would move the modal itself
			e.preventDefault();
		};

		const touchOptions = { passive: true, capture: true };
		/**
		 * Container is clipped to the area of the open modal, so the touches and clicks outside of it reach the overlay.
		 * Pointer events can't be disabled for the container instead, since iOS doesn't scroll containers without them
		 */
		const clip = () => {
			const scrollerSize = vertical ? scrollerEl.clientHeight : scrollerEl.clientWidth;
			const offset = Math.max(0, scrollerSize - measure().size);
			const insets = {
				bottom: [offset, 0, 0, 0],
				left: [0, offset, 0, 0],
				right: [0, 0, 0, offset],
			};

			scrollerEl.style.setProperty("clip-path", `inset(${insets[side].join("px ")}px)`);
		};

		const resizeObserver = new ResizeObserver(() => {
			clip();

			if (touching || gesture || returning) return;
			align();
		});

		// Scroll position starts at the closed position of the modals attached to the bottom and the end sides
		align();
		render();

		resizeObserver.observe(scrollerEl);
		resizeObserver.observe(trackEl);
		scrollerEl.addEventListener("scroll", handleScroll, { passive: true });
		// Supported browsers report the end of the scrolling right away, others resolve it with a timeout
		scrollerEl.addEventListener("scrollend", settle);
		// Handled in the capture phase to track the touches even when the modal content stops their propagation
		scrollerEl.addEventListener("touchstart", handleTouchStart, touchOptions);
		scrollerEl.addEventListener("touchend", handleTouchEnd, touchOptions);
		scrollerEl.addEventListener("touchcancel", handleTouchEnd, touchOptions);
		scrollerEl.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			if (timer) clearTimeout(timer);
			if (keepOpenTimer) clearTimeout(keepOpenTimer);

			resizeObserver.disconnect();
			scrollerEl.style.removeProperty("clip-path");
			scrollerEl.removeEventListener("scroll", handleScroll);
			scrollerEl.removeEventListener("scrollend", settle);
			scrollerEl.removeEventListener("touchstart", handleTouchStart, touchOptions);
			scrollerEl.removeEventListener("touchend", handleTouchEnd, touchOptions);
			scrollerEl.removeEventListener("touchcancel", handleTouchEnd, touchOptions);
			scrollerEl.removeEventListener("wheel", handleWheel);
		};
	}, [scrollerEl, enabled, side, overlayRef, onCloseRef]);

	return { scrollerRef: setScrollerEl, trackRef, edgeRef, dismissed };
};

export default useModalScroll;
