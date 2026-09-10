"use client";

import {
	useCallback,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	useRef,
	type FC,
} from "react";
import { classNames } from "@reshaped/utilities";
import { enableScroll, disableScroll } from "@reshaped/utilities/internal";

import Overlay, { type OverlayInstance } from "@/components/Overlay";
import Text from "@/components/Text";
import useElementId from "@/hooks/useElementId";
import useHandlerRef from "@/hooks/useHandlerRef";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useResponsiveClientValue from "@/hooks/useResponsiveClientValue";
import { resolveSpringTransition } from "@/utilities/animation";
import { responsiveClassNames, responsiveVariables } from "@/utilities/props";
import { resolveMixin } from "@/styles/mixin";
import type * as T from "./Modal.types";
import s from "./Modal.module.css";

const DRAG_THRESHOLD = 32;
const DRAG_OPPOSITE_THRESHOLD = 100;
const DRAG_EDGE_BOUNDARY = 32;
const DRAG_SCROLL_LOCK_THRESHOLD = 8;
/** Velocity in px/ms closing the modal on release regardless of the dragged distance */
const DRAG_VELOCITY_THRESHOLD = 0.4;
/** Time window in ms used for measuring the release velocity */
const DRAG_VELOCITY_WINDOW = 100;
/** Velocity in px/ms passed to the release spring is capped to keep the overshoot within the modal bleed */
const DRAG_VELOCITY_LIMIT = 3;
/** How far the modal can be rubber-banded past its open position, in px */
const DRAG_OVERDRAG_LIMIT = 40;
/** Initial resistance of the rubber band, 1 follows the finger exactly */
const DRAG_OVERDRAG_RESISTANCE = 0.55;
/** Fallback release duration range in ms for browsers without linear() easing support */
const DRAG_RELEASE_MIN_DURATION = 100;
const DRAG_RELEASE_MAX_DURATION = 300;

/**
 * Rubber band: follows the finger at first and asymptotically approaches the limit
 */
const dampenOverdrag = (distance: number) => {
	const resisted = distance * DRAG_OVERDRAG_RESISTANCE;
	return (DRAG_OVERDRAG_LIMIT * resisted) / (resisted + DRAG_OVERDRAG_LIMIT);
};

const Context = createContext<T.Context>({
	id: "",
	titleMounted: false,
	setTitleMounted: () => {},
	subtitleMounted: false,
	setSubtitleMounted: () => {},
});
const useModal = () => useContext(Context);

export const ModalTitle: FC<T.TitleProps> = (props) => {
	const { children } = props;
	const { id, setTitleMounted } = useModal();

	useEffect(() => {
		setTitleMounted(true);
		return () => setTitleMounted(false);
	}, [setTitleMounted]);

	return (
		<Text variant="featured-6" weight="bold" attributes={{ id: `${id}-title` }}>
			{children}
		</Text>
	);
};

export const ModalSubtitle: FC<T.SubtitleProps> = (props) => {
	const { children } = props;
	const { id, setSubtitleMounted } = useModal();

	useEffect(() => {
		setSubtitleMounted(true);
		return () => setSubtitleMounted(false);
	}, [setSubtitleMounted]);

	return (
		<Text variant="body-2" color="neutral-faded" attributes={{ id: `${id}-subtitle` }}>
			{children}
		</Text>
	);
};

const Modal: FC<T.Props> = (props) => {
	const {
		children,
		onClose,
		onAfterClose,
		onAfterOpen,
		active,
		size,
		padding = 4,
		position = "center",
		overflow,
		transparentOverlay,
		blurredOverlay,
		ariaLabel,
		autoFocus = true,
		disableSwipeGesture,
		disableCloseOnOutsideClick,
		containerRef,
		contained,
		overlayClassName,
		className,
		attributes,
	} = props;
	const onCloseRef = useHandlerRef(onClose);
	const id = useElementId();
	const clientPosition = useResponsiveClientValue(position)!;
	const [titleMounted, setTitleMounted] = useState(false);
	const [subtitleMounted, setSubtitleMounted] = useState(false);
	const [dragging, setDragging] = useState(false);
	const internalRootRef = useRef<HTMLDivElement>(null);
	const rootRef = attributes?.ref || internalRootRef;
	const dragStartCoordinatesRef = useRef({ x: 0, y: 0 });
	const dragLastCoordinateRef = useRef(0);
	const dragDistanceRef = useRef(0);
	const dragOffsetRef = useRef(0);
	const dragFrameRef = useRef<number | null>(null);
	const dragPendingDistanceRef = useRef(0);
	const dragSizeRef = useRef(1);
	const dragSamplesRef = useRef<{ time: number; coordinate: number }[]>([]);
	const dragCanOverdragRef = useRef(false);
	const dragReleasedRef = useRef(false);
	const overlayRef = useRef<OverlayInstance>(null);
	const dragDirectionRef = useRef(0);
	const dragShouldCloseRef = useRef(false);
	// Closing direction on the drag axis, start drawers close towards the negative coordinates
	const dragClosingSign = clientPosition === "start" ? -1 : 1;
	const mixinStyles = resolveMixin({ padding });
	const shouldBeContained = containerRef && contained !== false;

	const setDragStyles = useCallback(
		(distance: number) => {
			const rootEl = rootRef.current;
			if (!rootEl) return;

			// Positive when dragged towards the closing direction
			const closingDistance = distance * dragClosingSign;
			let dragOffset = 0;

			if (closingDistance > DRAG_THRESHOLD) {
				dragOffset = closingDistance - DRAG_THRESHOLD;
			} else if (closingDistance < 0 && dragCanOverdragRef.current) {
				dragOffset = -dampenOverdrag(-closingDistance);
			}

			dragOffsetRef.current = dragOffset;
			rootEl.style.setProperty("--rs-modal-drag", `${dragOffset * dragClosingSign}px`);

			if (!transparentOverlay && overlayRef.current) {
				const progress = Math.min(1, Math.max(0, closingDistance) / dragSizeRef.current);
				const opacity = Math.max(0, 1 - progress * 0.5);
				overlayRef.current.setOpacity(opacity);
			}
		},
		[dragClosingSign, overlayRef, transparentOverlay, rootRef]
	);

	/**
	 * Continues the release animation from the current gesture velocity,
	 * velocity is passed in px/ms and is positive when moving towards the closing direction
	 */
	const setReleaseTransition = useCallback(
		(args: { closing: boolean; velocity: number }) => {
			const rootEl = rootRef.current;
			if (!rootEl) return;

			const { closing, velocity } = args;
			const target = closing ? dragSizeRef.current : 0;
			// Both values are measured on the same axis, positive towards the closing direction
			const displacement = dragOffsetRef.current - target;
			const cappedVelocity =
				Math.sign(velocity) * Math.min(Math.abs(velocity), DRAG_VELOCITY_LIMIT);

			// No transition will run without a displacement, so there is nothing to override
			if (!displacement) return;

			const spring = resolveSpringTransition({ displacement, velocity: cappedVelocity * 1000 });

			if (spring) {
				rootEl.style.setProperty("transition-duration", `${Math.round(spring.duration)}ms`);
				rootEl.style.setProperty("transition-timing-function", spring.easing);
				return;
			}

			const duration = Math.abs(displacement) / Math.max(Math.abs(velocity), 0.001);
			rootEl.style.setProperty(
				"transition-duration",
				`${Math.round(Math.min(Math.max(duration, DRAG_RELEASE_MIN_DURATION), DRAG_RELEASE_MAX_DURATION))}ms`
			);
			rootEl.style.setProperty("transition-timing-function", "var(--rs-easing-decelerate)");
		},
		[rootRef]
	);

	const resetReleaseTransition = useCallback(() => {
		rootRef.current?.style.removeProperty("transition-duration");
		rootRef.current?.style.removeProperty("transition-timing-function");
	}, [rootRef]);

	const getReleaseVelocity = useCallback((time: number) => {
		const samples = dragSamplesRef.current.filter(
			(sample) => time - sample.time <= DRAG_VELOCITY_WINDOW
		);
		const first = samples[0];
		const last = samples[samples.length - 1];

		if (!first || !last || first === last) return 0;

		return (last.coordinate - first.coordinate) / (last.time - first.time);
	}, []);

	const value = useMemo(
		() => ({
			titleMounted,
			setTitleMounted,
			subtitleMounted,
			setSubtitleMounted,
			id,
		}),
		[id, subtitleMounted, titleMounted]
	);

	const resetDragData = useCallback(() => {
		dragDistanceRef.current = 0;
		dragPendingDistanceRef.current = 0;
		dragStartCoordinatesRef.current = { x: 0, y: 0 };
		dragLastCoordinateRef.current = 0;
		dragDirectionRef.current = 0;
		dragShouldCloseRef.current = false;
		dragSamplesRef.current = [];
		setDragStyles(0);
	}, [setDragStyles]);

	const unlockDragScroll = useCallback(() => {
		rootRef.current?.style.removeProperty("overflow");
	}, [rootRef]);

	const lockDragScroll = useCallback(() => {
		rootRef.current?.style.setProperty("overflow", "hidden");
	}, [rootRef]);

	const handleDragStart = (e: React.TouchEvent) => {
		if (disableSwipeGesture) return;
		dragShouldCloseRef.current = false;

		// Prevent swipe to close from happening when user is working with text selection
		if (window.getSelection()?.toString()) return;

		let currentEl = e.target as HTMLElement | null;
		const rootEl = rootRef.current;
		const isInline = ["start", "end"].includes(clientPosition);
		// Rubber band is only applied when there is no content that could scroll in the opposite direction instead
		let canOverdrag = true;

		while (currentEl && (currentEl === rootEl || rootEl?.contains(currentEl))) {
			// Prioritize scrolling over modal swiping
			if (currentEl.scrollTop !== 0 || currentEl.scrollLeft !== 0) return;
			// Start dragging only when starting on static elements
			if (currentEl.matches("input,textarea")) return;

			const scrollable = isInline
				? currentEl.scrollWidth > currentEl.clientWidth
				: currentEl.scrollHeight > currentEl.clientHeight;
			if (scrollable) canOverdrag = false;

			currentEl = currentEl ? currentEl.parentElement : null;
		}

		// Prevent the drag handling when browser is trying to navigate to a previous page
		if (clientPosition === "start" && e.targetTouches[0].clientX < DRAG_EDGE_BOUNDARY) return;

		if (rootEl) {
			dragSizeRef.current = Math.max(1, isInline ? rootEl.clientWidth : rootEl.clientHeight);
		}

		dragCanOverdragRef.current = canOverdrag;
		dragReleasedRef.current = false;
		dragSamplesRef.current = [];
		resetReleaseTransition();

		if (containerRef?.current) disableScroll();
		setDragging(true);
	};

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "transform") return;
		if (e.currentTarget !== e.target) return;

		resetReleaseTransition();

		// Once modal is closed - reset its drag data
		if (active) return;
		resetDragData();
		unlockDragScroll();
	};

	// Modal returns to its open position after the dragging class is removed,
	// so the transition is applied to the reset instead of snapping back
	useIsomorphicLayoutEffect(() => {
		if (dragging || !dragReleasedRef.current) return;
		dragReleasedRef.current = false;
		resetDragData();
	}, [dragging, resetDragData]);

	useEffect(() => {
		if (!dragging) return;

		const handleDragEnd = (e: TouchEvent) => {
			// Positive when moving towards the closing direction
			const velocity = getReleaseVelocity(e.timeStamp) * dragClosingSign;
			const closingDistance = dragDistanceRef.current * dragClosingSign;
			const flicked = velocity > DRAG_VELOCITY_THRESHOLD;
			const dragged = closingDistance > DRAG_THRESHOLD && velocity >= 0;
			dragShouldCloseRef.current = flicked || dragged;

			// Apply the pending frame before the release so the transition starts from the current position
			if (dragFrameRef.current !== null) {
				window.cancelAnimationFrame(dragFrameRef.current);
				dragFrameRef.current = null;
				setDragStyles(dragPendingDistanceRef.current);
			}

			setReleaseTransition({ closing: dragShouldCloseRef.current, velocity });

			if (containerRef?.current) enableScroll();
			if (!dragShouldCloseRef.current) unlockDragScroll();
			setDragging(false);

			if (dragShouldCloseRef.current) {
				onCloseRef.current?.({ reason: "drag" });
			} else {
				dragReleasedRef.current = true;
			}
		};

		const handleDrag = (e: TouchEvent) => {
			if (!dragging || clientPosition === "center") return;
			if (rootRef.current?.scrollTop !== 0 || rootRef.current?.scrollLeft !== 0) return;

			const target = e.targetTouches[0];
			const coordinate = { x: target.clientX, y: target.clientY };
			const key = clientPosition === "bottom" ? "y" : "x";
			const oppositeKey = clientPosition === "bottom" ? "x" : "y";

			// Save the initial coordinates
			if (!dragStartCoordinatesRef.current[key]) {
				dragStartCoordinatesRef.current = coordinate;
				dragLastCoordinateRef.current = coordinate[key];
			}

			const next = Math.abs(coordinate[key] - dragStartCoordinatesRef.current[key]);
			const nextPerpendicular = Math.abs(
				coordinate[oppositeKey] - dragStartCoordinatesRef.current[oppositeKey]
			);

			// For start/end drawers - ignore the swiping
			// If user is scrolling vertically more than swiping
			if (
				position !== "bottom" &&
				(next < nextPerpendicular || nextPerpendicular > DRAG_OPPOSITE_THRESHOLD)
			) {
				dragLastCoordinateRef.current = coordinate[key];
				return;
			}

			dragDirectionRef.current = coordinate[key] - dragLastCoordinateRef.current;
			dragLastCoordinateRef.current = coordinate[key];

			const isClosingDirection = dragDirectionRef.current * dragClosingSign > 0;

			if (next > DRAG_SCROLL_LOCK_THRESHOLD && isClosingDirection) {
				lockDragScroll();
			}

			// Distance is not clamped so the rubber band can follow the finger past the open position
			dragDistanceRef.current += dragDirectionRef.current;
			dragPendingDistanceRef.current = dragDistanceRef.current;

			dragSamplesRef.current.push({ time: e.timeStamp, coordinate: coordinate[key] });
			if (dragSamplesRef.current.length > 10) dragSamplesRef.current.shift();

			if (dragFrameRef.current === null) {
				dragFrameRef.current = window.requestAnimationFrame(() => {
					setDragStyles(dragPendingDistanceRef.current);
					dragFrameRef.current = null;
				});
			}
		};

		document.addEventListener("touchmove", handleDrag, { passive: true });
		document.addEventListener("touchend", handleDragEnd, { passive: true });

		return () => {
			if (dragFrameRef.current !== null) {
				window.cancelAnimationFrame(dragFrameRef.current);
				dragFrameRef.current = null;
			}
			if (!dragShouldCloseRef.current) unlockDragScroll();
			document.removeEventListener("touchmove", handleDrag);
			document.removeEventListener("touchend", handleDragEnd);
		};
	}, [
		dragging,
		clientPosition,
		dragClosingSign,
		onCloseRef,
		position,
		rootRef,
		containerRef,
		setDragStyles,
		setReleaseTransition,
		getReleaseVelocity,
		lockDragScroll,
		unlockDragScroll,
	]);

	return (
		<Overlay
			instanceRef={overlayRef}
			onClose={onClose}
			onAfterClose={onAfterClose}
			onAfterOpen={onAfterOpen}
			disableCloseOnClick={disableCloseOnOutsideClick}
			active={active}
			transparent={transparentOverlay}
			blurred={blurredOverlay}
			overflow={clientPosition === "center" ? "auto" : "hidden"}
			className={overlayClassName}
			contained={contained}
			containerRef={containerRef}
			attributes={{
				onTouchStart: handleDragStart,
			}}
		>
			{({ active }) => {
				const rootClassNames = classNames(
					s.root,
					className,
					active && s["--active"],
					dragging && s["--dragging"],
					overflow && s[`--overflow-${overflow}`],
					shouldBeContained && s["--contained"],
					responsiveClassNames(s, "--position", position),
					mixinStyles.classNames
				);

				return (
					<Context.Provider value={value}>
						{}
						<div
							{...attributes}
							style={
								{
									...mixinStyles.variables,
									...responsiveVariables("--rs-modal-size", size),
									"--rs-modal-drag": "0px",
								} as React.CSSProperties
							}
							aria-labelledby={titleMounted ? `${id}-title` : undefined}
							aria-describedby={subtitleMounted ? `${id}-subtitle` : undefined}
							aria-label={ariaLabel || attributes?.["aria-label"]}
							className={rootClassNames}
							aria-modal="true"
							// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
							role="dialog"
							tabIndex={!autoFocus ? -1 : undefined}
							ref={rootRef}
							onTransitionEnd={handleTransitionEnd}
						>
							{children}
						</div>
					</Context.Provider>
				);
			}}
		</Overlay>
	);
};

Modal.displayName = "Modal";
ModalTitle.displayName = "Modal.Title";
ModalSubtitle.displayName = "Modal.Subtitle";

export default Modal;
