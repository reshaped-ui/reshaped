"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { enableScroll, disableScroll } from "@reshaped/utilities/internal";

import type { OverlayInstance } from "@/components/Overlay";
import useHandlerRef from "@/hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useRTL from "@/hooks/useRTL";
import { resolveSpringTransition } from "@/utilities/animation";
import type * as T from "./Modal.types";

/** Distance in px the modal has to be dragged before it starts following the finger */
const THRESHOLD = 32;
/** Screen edge zone in px reserved for the browser back gesture */
const EDGE_BOUNDARY = 32;
/**
 * Distance in px the finger has to travel before the gesture resolves into a swipe or a scroll,
 * a swipe also stops the modal content from scrolling for the rest of the gesture
 */
const DIRECTION_THRESHOLD = 8;
/** Velocity in px/ms closing the modal on release regardless of the dragged distance */
const VELOCITY_THRESHOLD = 0.4;
/** Time window in ms used for measuring the release velocity */
const VELOCITY_WINDOW = 100;
const VELOCITY_SAMPLES = 10;

/**
 * Gesture state, all distances are measured on the drag axis
 * and are positive towards the direction the modal closes in
 */
type State = {
	/** Coordinate on the drag axis the gesture started from */
	origin: number;
	/** Coordinate on the perpendicular axis the gesture started from */
	oppositeOrigin: number;
	/** Coordinate on the drag axis from the previous move, used for resolving the direction */
	previous: number;
	/** Offset the gesture started from, above zero when it picked up an animation in flight */
	seed: number;
	/** Distance dragged since the gesture started, clamped at the open position */
	distance: number;
	/** Offset the modal is currently rendered at, resolved from the seed and the distance */
	offset: number;
	/** Modal size on the drag axis in px, used as the closing target */
	size: number;
	/** Recent coordinates on the drag axis, used for measuring the release velocity */
	samples: { time: number; coordinate: number }[];
	/**
	 * Resolved once the gesture travels past the direction threshold:
	 * swipe when it moves along the drag axis, scroll when it moves along the perpendicular axis
	 */
	intent: "swipe" | "scroll" | null;
	/** Gesture is released and the modal is closing */
	closing: boolean;
	/** Gesture is released and the modal is animating back to its open position */
	returning: boolean;
};

const getInitialState = (): State => ({
	origin: 0,
	oppositeOrigin: 0,
	previous: 0,
	seed: 0,
	distance: 0,
	offset: 0,
	size: 1,
	samples: [],
	intent: null,
	closing: false,
	returning: false,
});

/**
 * Distance in px the modal is currently rendered at from its open position, towards the closing direction.
 * Resolved from the transform so a gesture can pick up an animation that is still in flight,
 * the dragging class disables transitions and would otherwise snap the modal to the animation target
 */
const getRenderedOffset = (el: HTMLElement, args: { axis: "x" | "y"; closingSign: number }) => {
	const { transform } = window.getComputedStyle(el);
	if (!transform || transform === "none") return 0;

	const matrix = new DOMMatrixReadOnly(transform);
	return Math.max(0, (args.axis === "y" ? matrix.m42 : matrix.m41) * args.closingSign);
};

/**
 * Element can still scroll its content in the direction the finger moves when closing the modal,
 * this scroll takes priority over the swipe
 */
const canScrollTowardsClosing = (
	el: HTMLElement,
	args: { axis: "x" | "y"; closingSign: number }
) => {
	// Bottom modals close with the finger moving down, which scrolls the content towards the top
	if (args.axis === "y") return el.scrollTop !== 0;

	const maxScroll = el.scrollWidth - el.clientWidth;
	if (maxScroll <= 0) return false;

	// Content with overflow hidden can't be scrolled with the finger
	const style = window.getComputedStyle(el);
	if (style.overflowX !== "auto" && style.overflowX !== "scroll") return false;

	// Distances left to scroll towards the physical sides, scrollLeft goes from 0 to negative values in RTL
	const rtl = style.direction === "rtl";
	const leftDistance = rtl ? maxScroll + el.scrollLeft : el.scrollLeft;
	const rightDistance = rtl ? -el.scrollLeft : maxScroll - el.scrollLeft;

	// Finger moving right reveals the content on the left side and vice versa
	return (args.closingSign === 1 ? leftDistance : rightDistance) >= 1;
};

/** Velocity in px/ms measured over the most recent samples, signed on the drag axis */
const getVelocity = (state: State, time: number) => {
	const samples = state.samples.filter((sample) => time - sample.time <= VELOCITY_WINDOW);
	const first = samples[0];
	const last = samples[samples.length - 1];

	if (!first || !last || first === last) return 0;

	return (last.coordinate - first.coordinate) / (last.time - first.time);
};

/**
 * Swipe gesture closing the modal, moving it with the finger and continuing
 * the release animation from the velocity the gesture ended with
 */
const useModalDrag = (args: {
	position: T.Position;
	rootRef: React.RefObject<HTMLDivElement | null>;
	overlayRef: React.RefObject<OverlayInstance | null>;
	active?: boolean;
	disabled?: boolean;
	transparentOverlay?: boolean;
	containerRef?: T.Props["containerRef"];
	onClose?: T.Props["onClose"];
}) => {
	const { position, rootRef, overlayRef, active, disabled, transparentOverlay, containerRef } =
		args;
	const onCloseRef = useHandlerRef(args.onClose);
	const [dragging, setDragging] = useState(false);
	const stateRef = useRef<State>(getInitialState());
	const frameRef = useRef<number | null>(null);
	const [rtl] = useRTL();
	const axis: "x" | "y" = position === "bottom" ? "y" : "x";
	// Drawers attached to the left side close towards the negative coordinates
	const leftSide = rtl ? position === "end" : position === "start";
	const closingSign = leftSide ? -1 : 1;

	const render = useCallback(() => {
		const rootEl = rootRef.current;
		const state = stateRef.current;
		if (!rootEl) return;

		// A gesture picking up an animation starts on an already moving modal, so it skips the dead zone
		const threshold = state.seed ? 0 : THRESHOLD;
		const closingDistance = state.seed + state.distance;

		state.offset = Math.max(0, closingDistance - threshold);
		rootEl.style.setProperty("--rs-modal-drag", `${state.offset * closingSign}px`);

		if (transparentOverlay) return;

		const progress = Math.min(1, closingDistance / state.size);
		overlayRef.current?.setOpacity(1 - progress * 0.5);
	}, [closingSign, transparentOverlay, rootRef, overlayRef]);

	const reset = useCallback(() => {
		stateRef.current = getInitialState();
		render();
	}, [render]);

	const setScrollLock = useCallback(
		(locked: boolean) => {
			const style = rootRef.current?.style;

			if (locked) style?.setProperty("overflow", "hidden");
			else style?.removeProperty("overflow");
		},
		[rootRef]
	);

	/**
	 * Continues the release animation from the current gesture velocity,
	 * velocity is passed in px/ms and is positive when moving towards the closing direction
	 */
	const setReleaseTransition = useCallback(
		(releaseArgs: { closing: boolean; velocity: number }) => {
			const rootEl = rootRef.current;
			const { offset, size } = stateRef.current;
			const displacement = offset - (releaseArgs.closing ? size : 0);

			// Without a displacement no transition will run and the override would stay applied
			if (!rootEl || !displacement) return;

			const { duration, easing } = resolveSpringTransition({
				displacement,
				velocity: releaseArgs.velocity,
			});

			rootEl.style.setProperty("transition-duration", `${Math.round(duration)}ms`);
			rootEl.style.setProperty("transition-timing-function", easing);
		},
		[rootRef]
	);

	const resetReleaseTransition = useCallback(() => {
		const style = rootRef.current?.style;

		style?.removeProperty("transition-duration");
		style?.removeProperty("transition-timing-function");
	}, [rootRef]);

	const handleTouchStart = (e: React.TouchEvent) => {
		if (disabled || position === "center") return;
		// Prevent swipe to close from happening when user is working with text selection
		if (window.getSelection()?.toString()) return;

		const rootEl = rootRef.current;
		const touch = e.targetTouches[0];
		let currentEl = e.target as HTMLElement | null;

		while (currentEl && (currentEl === rootEl || rootEl?.contains(currentEl))) {
			// Prioritize scrolling over modal swiping when content can scroll on the drag axis,
			// scrolling on the perpendicular axis is resolved from the gesture direction instead
			if (canScrollTowardsClosing(currentEl, { axis, closingSign })) return;
			// Start dragging only when starting on static elements
			if (currentEl.matches("input,textarea")) return;

			currentEl = currentEl.parentElement;
		}

		// Prevent the drag handling when browser is trying to navigate to a previous page
		if (axis === "x" && closingSign === -1 && touch.clientX < EDGE_BOUNDARY) return;

		// Measured before the state is replaced, a transition in flight resolves to its current position
		const seed = active && rootEl ? getRenderedOffset(rootEl, { axis, closingSign }) : 0;
		const origin = axis === "y" ? touch.clientY : touch.clientX;

		// The previous gesture can be left unresolved, e.g. when the modal stays open after a drag close
		stateRef.current = {
			...getInitialState(),
			origin,
			oppositeOrigin: axis === "y" ? touch.clientX : touch.clientY,
			previous: origin,
			seed,
			size: rootEl ? Math.max(1, axis === "y" ? rootEl.clientHeight : rootEl.clientWidth) : 1,
		};

		resetReleaseTransition();
		render();

		if (containerRef?.current) disableScroll();
		setDragging(true);
	};

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "transform") return;
		if (e.currentTarget !== e.target) return;

		resetReleaseTransition();

		// Once modal is closed - reset its drag data
		if (active) return;
		reset();
		setScrollLock(false);
	};

	// Modal returns to its open position after the dragging class is removed,
	// so the transition is applied to the reset instead of snapping back
	useIsomorphicLayoutEffect(() => {
		if (dragging || !stateRef.current.returning) return;
		reset();
	}, [dragging, reset]);

	useEffect(() => {
		if (!dragging) return;

		const handleTouchMove = (e: TouchEvent) => {
			const state = stateRef.current;
			const rootEl = rootRef.current;
			if (state.intent === "scroll") return;

			const touch = e.targetTouches[0];
			const coordinate = axis === "y" ? touch.clientY : touch.clientX;
			const oppositeCoordinate = axis === "y" ? touch.clientX : touch.clientY;
			const travel = Math.abs(coordinate - state.origin);
			const oppositeTravel = Math.abs(oppositeCoordinate - state.oppositeOrigin);

			// Resolve the gesture direction once, so scrolling the content on the perpendicular axis
			// doesn't move the modal and swiping the modal doesn't scroll the content.
			// The previous coordinate stays at the origin until then, so the swipe doesn't lose the travelled distance
			if (!state.intent) {
				if (Math.max(travel, oppositeTravel) < DIRECTION_THRESHOLD) return;

				state.intent = travel > oppositeTravel ? "swipe" : "scroll";
				if (state.intent === "scroll") return;
			}

			if (rootEl && canScrollTowardsClosing(rootEl, { axis, closingSign })) return;

			// Positive when moving towards the closing direction
			const delta = (coordinate - state.previous) * closingSign;

			state.previous = coordinate;

			if (delta > 0) setScrollLock(true);

			// Clamped so the modal can't be dragged past its open position
			state.distance = Math.max(-state.seed, state.distance + delta);
			state.samples.push({ time: e.timeStamp, coordinate });
			if (state.samples.length > VELOCITY_SAMPLES) state.samples.shift();

			if (frameRef.current !== null) return;
			frameRef.current = window.requestAnimationFrame(() => {
				frameRef.current = null;
				render();
			});
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const state = stateRef.current;
			// Positive when moving towards the closing direction
			const velocity = getVelocity(state, e.timeStamp) * closingSign;
			const flicked = velocity > VELOCITY_THRESHOLD;
			const dragged = state.distance > THRESHOLD && velocity >= 0;

			state.closing = flicked || dragged;
			state.returning = !state.closing;

			// Apply the pending frame before the release so the transition starts from the current position
			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
				render();
			}

			setReleaseTransition({ closing: state.closing, velocity });

			if (containerRef?.current) enableScroll();
			if (state.returning) setScrollLock(false);
			setDragging(false);

			if (state.closing) onCloseRef.current?.({ reason: "drag" });
		};

		document.addEventListener("touchmove", handleTouchMove, { passive: true });
		document.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			if (frameRef.current !== null) {
				window.cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}

			if (!stateRef.current.closing) setScrollLock(false);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};
	}, [
		dragging,
		axis,
		closingSign,
		containerRef,
		rootRef,
		onCloseRef,
		render,
		setScrollLock,
		setReleaseTransition,
	]);

	return { dragging, handleTouchStart, handleTransitionEnd };
};

export default useModalDrag;
