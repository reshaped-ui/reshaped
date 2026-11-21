"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { enableScroll, disableScroll } from "@reshaped/utilities/internal";

import type { OverlayInstance } from "@/components/Overlay";
import useHandlerRef from "@/hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useRTL from "@/hooks/useRTL";
import { resolveSpringTransition } from "@/utilities/animation";
import type * as T from "./Modal.types";

/** Screen edge zones in px reserved for the browser back and forward gestures */
const EDGE_BOUNDARY = 32;
/**
 * Distance in px the finger has to travel before the gesture resolves into a swipe or a scroll,
 * a swipe also stops the modal content from scrolling for the rest of the gesture
 */
const DIRECTION_THRESHOLD = 8;
/**
 * Time in ms used for projecting where the modal would stop after the release with the current velocity,
 * matches the normal deceleration rate of the iOS scroll views
 */
const PROJECTION_TIME = 0.998 / (1 - 0.998);
/** Resistance of the rubber band applied when the modal is dragged past its open position, same as in iOS */
const RUBBER_BAND_COEFFICIENT = 0.55;
/** Time in ms given to the close handler to update the active state before the modal returns to its open position */
const KEEP_OPEN_TIMEOUT = 100;
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
	/** Coordinate on the drag axis from the previous move, used for resolving the per-move delta */
	previous: number;
	/**
	 * Distance the gesture started from, non-zero when it picked up an animation in flight.
	 * Negative when the modal was past its open position, stored as the undamped distance
	 */
	seed: number;
	/** Distance dragged since the gesture started */
	distance: number;
	/** Modal can be dragged past its open position, false when its content can scroll in that direction */
	overshoot: boolean;
	/**
	 * Elements under the touch that can scroll their content towards the closing direction.
	 * They scroll first and the modal starts following the finger once they reach their edge
	 */
	scrollers: HTMLElement[];
	/** Offset the modal is currently rendered at, resolved from the seed and the distance */
	offset: number;
	/** Distance on the drag axis in px from the open to the closed position, used as the closing target */
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
	overshoot: false,
	scrollers: [],
	offset: 0,
	size: 1,
	samples: [],
	intent: null,
	closing: false,
	returning: false,
});

/**
 * Dragging past the open position is damped the same way as the iOS scroll views,
 * so the modal resists the finger more the further it's dragged.
 * Distances are negative past the open position and the dimension limits how far it can go
 */
const dampOvershoot = (distance: number, dimension: number) => {
	const ratio = (-distance * RUBBER_BAND_COEFFICIENT) / dimension;
	return -(1 - 1 / (ratio + 1)) * dimension;
};

const undampOvershoot = (offset: number, dimension: number) => {
	const ratio = 1 / (1 + offset / dimension) - 1;
	return -(ratio * dimension) / RUBBER_BAND_COEFFICIENT;
};

/**
 * Distance in px the modal is currently rendered at from its open position, towards the closing direction,
 * negative when it's past the open position.
 * Resolved from the transform so a gesture can pick up an animation that is still in flight,
 * the dragging class disables transitions and would otherwise snap the modal to the animation target
 */
const getRenderedOffset = (
	style: CSSStyleDeclaration,
	args: { axis: "x" | "y"; closingSign: number }
) => {
	const { transform } = style;
	if (!transform || transform === "none") return 0;

	const matrix = new DOMMatrixReadOnly(transform);
	return (args.axis === "y" ? matrix.m42 : matrix.m41) * args.closingSign;
};

/**
 * Distance in px the modal travels to its closed position, including its offset from the container edge
 */
const getClosingSize = (
	el: HTMLElement,
	style: CSSStyleDeclaration,
	args: { axis: "x" | "y"; closingSign: number }
) => {
	const size = args.axis === "y" ? el.offsetHeight : el.offsetWidth;
	const edgeOffset =
		args.axis === "y" ? style.bottom : args.closingSign === -1 ? style.left : style.right;

	return Math.max(1, size + (parseFloat(edgeOffset) || 0));
};

/**
 * Element can still scroll its content in the direction the finger moves when closing the modal,
 * this scroll takes priority over the swipe
 */
const canScrollTowardsClosing = (
	el: HTMLElement,
	args: { axis: "x" | "y"; closingSign: number }
) => {
	const vertical = args.axis === "y";
	const maxScroll = vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
	if (maxScroll <= 0) return false;

	// Content with overflow hidden can't be scrolled with the finger
	const style = window.getComputedStyle(el);
	const overflow = vertical ? style.overflowY : style.overflowX;
	if (overflow !== "auto" && overflow !== "scroll") return false;

	// Distance left to scroll towards the top or left side, scrollLeft goes from 0 to negative values in RTL
	const rtl = !vertical && style.direction === "rtl";
	const scroll = vertical ? el.scrollTop : el.scrollLeft;
	const startDistance = rtl ? maxScroll + scroll : scroll;

	// Finger moving down or right reveals the content on the top or left side and vice versa
	return (args.closingSign === 1 ? startDistance : maxScroll - startDistance) >= 1;
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
	/** Strip filling the browser toolbar area behind the bottom modal, moved together with it */
	edgeRef: React.RefObject<HTMLDivElement | null>;
	active?: boolean;
	disabled?: boolean;
	transparentOverlay?: boolean;
	containerRef?: T.Props["containerRef"];
	onClose?: T.Props["onClose"];
}) => {
	const {
		position,
		rootRef,
		overlayRef,
		edgeRef,
		active,
		disabled,
		transparentOverlay,
		containerRef,
	} = args;
	const onCloseRef = useHandlerRef(args.onClose);
	const [dragging, setDragging] = useState(false);
	const stateRef = useRef<State>(getInitialState());
	const activeRef = useRef(active);
	const keepOpenTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	activeRef.current = active;
	const [rtl] = useRTL();
	const axis: "x" | "y" = position === "bottom" ? "y" : "x";
	// Drawers attached to the left side close towards the negative coordinates,
	// full-screen modals close towards the end side
	const leftSide = rtl ? position === "end" || position === "full-screen" : position === "start";
	const closingSign = leftSide ? -1 : 1;

	const render = useCallback(() => {
		const rootEl = rootRef.current;
		const state = stateRef.current;
		if (!rootEl) return;

		const closingDistance = state.seed + state.distance;

		state.offset =
			closingDistance < 0 ? dampOvershoot(closingDistance, state.size) : closingDistance;
		rootEl.style.setProperty("--rs-modal-drag", `${state.offset * closingSign}px`);
		edgeRef.current?.style.setProperty("transform", `translateY(${Math.max(0, state.offset)}px)`);

		if (transparentOverlay) return;

		const progress = Math.min(1, Math.max(0, state.offset) / state.size);
		overlayRef.current?.setOpacity(1 - progress);
	}, [closingSign, transparentOverlay, rootRef, overlayRef, edgeRef]);

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
		// Modal released towards its closed position is already closing, so it can't be caught again
		if (!active) return;
		// Prevent swipe to close from happening when user is working with text selection
		if (window.getSelection()?.toString()) return;

		const rootEl = rootRef.current;
		const touch = e.targetTouches[0];
		let currentEl = e.target as HTMLElement | null;
		let overshoot = true;
		const scrollers: HTMLElement[] = [];

		while (currentEl && (currentEl === rootEl || rootEl?.contains(currentEl))) {
			// Content that can scroll on the drag axis takes priority over the modal until it reaches its edge,
			// scrolling on the perpendicular axis is resolved from the gesture direction instead
			if (canScrollTowardsClosing(currentEl, { axis, closingSign })) scrollers.push(currentEl);
			// Start dragging only when starting on static elements
			if (currentEl.matches("input,textarea")) return;
			// Content scrolling in the opposite direction takes priority over dragging past the open position
			if (canScrollTowardsClosing(currentEl, { axis, closingSign: -closingSign }))
				overshoot = false;

			currentEl = currentEl.parentElement;
		}

		// Prevent the drag handling when browser is trying to navigate to the previous or the next page
		if (axis === "x" && touch.clientX < EDGE_BOUNDARY) return;
		if (axis === "x" && touch.clientX > window.innerWidth - EDGE_BOUNDARY) return;

		// Measured before the state is replaced, a transition in flight resolves to its current position
		const rootStyle = rootEl && window.getComputedStyle(rootEl);
		const renderedOffset = rootStyle ? getRenderedOffset(rootStyle, { axis, closingSign }) : 0;
		const size = rootEl && rootStyle ? getClosingSize(rootEl, rootStyle, { axis, closingSign }) : 1;
		// Damped offset past the open position is converted back to the dragged distance
		const seed = renderedOffset < 0 ? undampOvershoot(renderedOffset, size) : renderedOffset;
		const origin = axis === "y" ? touch.clientY : touch.clientX;

		// Background of the bottom modal is extended below it while it's dragged past its open position
		if (axis === "y") rootEl?.style.setProperty("--rs-modal-height", `${rootEl.offsetHeight}px`);

		// The previous gesture can be left unresolved, e.g. when the modal stays open after a drag close
		stateRef.current = {
			...getInitialState(),
			origin,
			oppositeOrigin: axis === "y" ? touch.clientX : touch.clientY,
			previous: origin,
			seed,
			overshoot,
			scrollers,
			size,
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

	useEffect(() => () => clearTimeout(keepOpenTimerRef.current), []);

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
			}

			if (state.intent === "scroll") return;

			const rootEl = rootRef.current;
			const contentScrolls = [...state.scrollers, rootEl].some((el) => {
				return el && canScrollTowardsClosing(el, { axis, closingSign });
			});

			// Content scrolls with the finger until it reaches its edge and the modal follows it from that point,
			// so the distance travelled while scrolling the content doesn't move the modal
			if (contentScrolls) {
				state.previous = coordinate;
				return;
			}

			// Positive when moving towards the closing direction
			const delta = (coordinate - state.previous) * closingSign;

			state.previous = coordinate;

			if (delta > 0) setScrollLock(true);

			state.distance += delta;
			// Clamped at the open position when the content scrolls in that direction instead
			if (!state.overshoot) state.distance = Math.max(-state.seed, state.distance);
			state.samples.push({ time: e.timeStamp, coordinate });
			if (state.samples.length > VELOCITY_SAMPLES) state.samples.shift();

			// Touch events are dispatched once per frame, so the modal is moved right away without waiting for the next one
			render();
		};

		const handleTouchEnd = (e: TouchEvent) => {
			const state = stateRef.current;
			// Gesture taken over by the system, e.g. by an incoming call or a system swipe, is not released by the user,
			// so the modal returns to its open position instead of staying where the gesture has stopped
			const cancelled = e.type === "touchcancel";
			// Positive when moving towards the closing direction
			const velocity = cancelled ? 0 : getVelocity(state, e.timeStamp) * closingSign;
			// Modal closes when it would stop past the middle of its size after the release, like the iOS sheets
			const projectedOffset = state.offset + velocity * PROJECTION_TIME;

			state.closing = !cancelled && state.intent === "swipe" && projectedOffset > state.size / 2;
			state.returning = !state.closing;

			// Finger velocity doesn't match the damped movement past the open position, so it settles from rest
			setReleaseTransition({ closing: state.closing, velocity: state.offset < 0 ? 0 : velocity });

			if (containerRef?.current) enableScroll();
			if (state.returning) setScrollLock(false);
			setDragging(false);

			if (!state.closing) return;

			onCloseRef.current?.({ reason: "drag" });

			// Modal stays open when its active state is not updated in the close handler,
			// so it returns to its open position instead of staying where it was released
			keepOpenTimerRef.current = setTimeout(() => {
				if (!activeRef.current || stateRef.current !== state) return;

				state.closing = false;
				setReleaseTransition({ closing: false, velocity: 0 });
				reset();
			}, KEEP_OPEN_TIMEOUT);
		};

		document.addEventListener("touchmove", handleTouchMove, { passive: true });
		document.addEventListener("touchend", handleTouchEnd, { passive: true });
		document.addEventListener("touchcancel", handleTouchEnd, { passive: true });

		return () => {
			if (!stateRef.current.closing) setScrollLock(false);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
			document.removeEventListener("touchcancel", handleTouchEnd);
		};
	}, [
		dragging,
		axis,
		closingSign,
		containerRef,
		rootRef,
		onCloseRef,
		render,
		reset,
		setScrollLock,
		setReleaseTransition,
	]);

	return { dragging, handleTouchStart, handleTransitionEnd };
};

export default useModalDrag;
