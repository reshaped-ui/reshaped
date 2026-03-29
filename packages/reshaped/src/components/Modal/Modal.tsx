"use client";

import { classNames, useHandlerRef, useElementId } from "@reshaped/headless";
import { enableScroll, disableScroll } from "@reshaped/headless/internal";
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

import Overlay, { type OverlayInstance } from "@/components/Overlay";
import Text from "@/components/Text";
import useResponsiveClientValue from "@/hooks/useResponsiveClientValue";
import { resolveMixin } from "@/styles/mixin";
import { responsiveClassNames, responsiveVariables } from "@/utilities/props";

import s from "./Modal.module.css";

import type * as T from "./Modal.types";

const DRAG_THRESHOLD = 32;
const DRAG_OPPOSITE_THRESHOLD = 100;
const DRAG_EDGE_BOUNDARY = 32;
const DRAG_SCROLL_LOCK_THRESHOLD = 8;

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
		<Text variant="title-6" weight="bold" attributes={{ id: `${id}-title` }}>
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
		onOpen,
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
	const dragFrameRef = useRef<number | null>(null);
	const dragPendingDistanceRef = useRef(0);
	const dragSizeRef = useRef(1);
	const overlayRef = useRef<OverlayInstance>(null);
	const dragDirectionRef = useRef(0);
	const dragShouldCloseRef = useRef(false);
	const mixinStyles = resolveMixin({ padding });
	const shouldBeContained = containerRef && contained !== false;

	const setDragStyles = useCallback(
		// eslint-disable-next-line react-hooks/preserve-manual-memoization
		(distance: number) => {
			const rootEl = rootRef.current;
			if (!rootEl) return;

			const dragOffset =
				Math.abs(distance) < DRAG_THRESHOLD
					? 0
					: distance + DRAG_THRESHOLD * (clientPosition === "start" ? 1 : -1);

			rootEl.style.setProperty("--rs-modal-drag", `${dragOffset}px`);

			if (!transparentOverlay && overlayRef.current) {
				const progress = Math.min(1, Math.abs(distance) / dragSizeRef.current);
				const opacity = Math.max(0, 1 - progress * 0.5);
				overlayRef.current.setOpacity(opacity);
			}
		},
		[clientPosition, overlayRef, transparentOverlay, rootRef]
	);

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
		setDragStyles(0);
	}, [setDragStyles]);

	// eslint-disable-next-line react-hooks/preserve-manual-memoization
	const unlockDragScroll = useCallback(() => {
		rootRef.current?.style.removeProperty("overflow");
	}, [rootRef]);

	// eslint-disable-next-line react-hooks/preserve-manual-memoization
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

		while (currentEl && (currentEl === rootEl || rootEl?.contains(currentEl))) {
			// Prioritize scrolling over modal swiping
			if (currentEl.scrollTop !== 0 || currentEl.scrollLeft !== 0) return;
			// Start dragging only when starting on static elements
			if (currentEl.matches("input,textarea")) return;

			currentEl = currentEl ? currentEl.parentElement : null;
		}

		// Prevent the drag handling when browser is trying to navigate to a previous page
		if (clientPosition === "start" && e.targetTouches[0].clientX < DRAG_EDGE_BOUNDARY) return;

		if (rootEl) {
			const isInline = ["start", "end"].includes(clientPosition);
			dragSizeRef.current = Math.max(1, isInline ? rootEl.clientWidth : rootEl.clientHeight);
		}

		if (containerRef?.current) disableScroll();
		setDragging(true);
	};

	// Once modal is closed - reset its drag data
	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (active) return;
		if (e.propertyName !== "transform") return;
		if (e.currentTarget !== e.target) return;

		resetDragData();
		unlockDragScroll();
	};

	useEffect(() => {
		if (!dragging) return;

		const handleDragEnd = () => {
			const shouldClose =
				clientPosition === "start" ? dragDirectionRef.current < 0 : dragDirectionRef.current > 0;
			dragShouldCloseRef.current =
				Math.abs(dragDistanceRef.current) > DRAG_THRESHOLD && shouldClose;

			if (containerRef?.current) enableScroll();
			if (!dragShouldCloseRef.current) unlockDragScroll();
			setDragging(false);

			if (dragShouldCloseRef.current) {
				onCloseRef.current?.({ reason: "drag" });
			} else {
				resetDragData();
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

			const isClosingDirection =
				clientPosition === "start" ? dragDirectionRef.current < 0 : dragDirectionRef.current > 0;

			if (next > DRAG_SCROLL_LOCK_THRESHOLD && isClosingDirection) {
				lockDragScroll();
			}

			dragDistanceRef.current =
				clientPosition === "start"
					? Math.min(0, dragDistanceRef.current + dragDirectionRef.current)
					: Math.max(0, dragDistanceRef.current + dragDirectionRef.current);

			dragPendingDistanceRef.current = dragDistanceRef.current;

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
		onCloseRef,
		position,
		rootRef,
		containerRef,
		setDragStyles,
		resetDragData,
		lockDragScroll,
		unlockDragScroll,
	]);

	return (
		<Overlay
			instanceRef={overlayRef}
			onClose={onClose}
			onOpen={onOpen}
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
