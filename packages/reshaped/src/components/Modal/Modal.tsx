"use client";

import React from "react";

import Overlay from "components/Overlay";
import Text from "components/Text";
import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import { resolveMixin } from "styles/mixin";
import { classNames, responsiveVariables, responsiveClassNames } from "utilities/props";
import { enableScroll, disableScroll } from "utilities/scroll";

import s from "./Modal.module.css";

import type * as T from "./Modal.types";

const DRAG_THRESHOLD = 32;
const DRAG_OPPOSITE_THRESHOLD = 100;
const DRAG_EDGE_BOUNDARY = 32;

const Context = React.createContext<T.Context>({
	id: "",
	titleMounted: false,
	setTitleMounted: () => {},
	subtitleMounted: false,
	setSubtitleMounted: () => {},
});
const useModal = () => React.useContext(Context);

export const ModalTitle: React.FC<T.TitleProps> = (props) => {
	const { children } = props;
	const { id, setTitleMounted } = useModal();

	React.useEffect(() => {
		setTitleMounted(true);
		return () => setTitleMounted(false);
	}, [setTitleMounted]);

	return (
		<Text variant="featured-3" weight="bold" attributes={{ id: `${id}-title` }}>
			{children}
		</Text>
	);
};

export const ModalSubtitle: React.FC<T.SubtitleProps> = (props) => {
	const { children } = props;
	const { id, setSubtitleMounted } = useModal();

	React.useEffect(() => {
		setSubtitleMounted(true);
		return () => setSubtitleMounted(false);
	}, [setSubtitleMounted]);

	return (
		<Text variant="body-3" color="neutral-faded" attributes={{ id: `${id}-subtitle` }}>
			{children}
		</Text>
	);
};

const Modal: React.FC<T.Props> = (props) => {
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
		overlayClassName,
		className,
		attributes,
	} = props;
	const onCloseRef = useHandlerRef(onClose);
	const id = useElementId();
	const clientPosition = useResponsiveClientValue(position)!;
	const [titleMounted, setTitleMounted] = React.useState(false);
	const [subtitleMounted, setSubtitleMounted] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const internalRootRef = React.useRef<HTMLDivElement>(null);
	const rootRef = attributes?.ref || internalRootRef;
	const dragStartCoordinatesRef = React.useRef({ x: 0, y: 0 });
	const dragLastCoordinateRef = React.useRef(0);
	const dragDistanceRef = React.useRef(0);
	const dragDirectionRef = React.useRef(0);
	const [dragDistance, setDragDistance] = React.useState(0);
	const [hideProgress, setHideProgress] = React.useState(0);
	const mixinStyles = resolveMixin({ padding });

	const value = React.useMemo(
		() => ({
			titleMounted,
			setTitleMounted,
			subtitleMounted,
			setSubtitleMounted,
			id,
		}),
		[id, subtitleMounted, titleMounted]
	);

	const resetDragData = () => {
		dragStartCoordinatesRef.current = { x: 0, y: 0 };
		dragLastCoordinateRef.current = 0;
		dragDirectionRef.current = 0;
		setDragDistance(0);
	};

	const handleDragStart = (e: React.TouchEvent) => {
		if (disableSwipeGesture) return;

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

		disableScroll();
		setDragging(true);
	};

	// Once modal is closed - reset its drag data
	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (active) return;
		if (e.propertyName !== "transform") return;
		if (e.currentTarget !== e.target) return;

		resetDragData();
	};

	React.useEffect(() => {
		if (!dragging) return;

		const handleDragEnd = () => {
			enableScroll();
			setDragging(false);

			// Close only when dragging in the closing direction
			// Changing to a different direction will keep the modal opened
			const shouldClose =
				clientPosition === "start" ? dragDirectionRef.current < 0 : dragDirectionRef.current > 0;

			if (Math.abs(dragDistanceRef.current) > DRAG_THRESHOLD && shouldClose) {
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

			setDragDistance((prev) =>
				clientPosition === "start"
					? Math.min(0, prev + dragDirectionRef.current)
					: Math.max(0, prev + dragDirectionRef.current)
			);
		};

		document.addEventListener("touchmove", handleDrag, { passive: true });
		document.addEventListener("touchend", handleDragEnd, { passive: true });

		return () => {
			document.removeEventListener("touchmove", handleDrag);
			document.removeEventListener("touchend", handleDragEnd);
		};
	}, [dragging, clientPosition, onCloseRef, position, rootRef]);

	// Syncing distance to the ref to avoid having a dependency on dragDistance in handleDragEnd
	React.useEffect(() => {
		const rootEl = rootRef.current;

		if (!rootEl || !clientPosition) return;

		const isInline = ["start", "end"].includes(clientPosition);

		const size = isInline ? rootEl.clientWidth : rootEl.clientHeight;
		const progress = Math.abs(dragDistance) / size;

		setHideProgress(progress / 2);
		dragDistanceRef.current = dragDistance;
	}, [dragDistance, clientPosition, rootRef]);

	return (
		<Overlay
			onClose={onClose}
			onOpen={onOpen}
			onAfterClose={onAfterClose}
			onAfterOpen={onAfterOpen}
			disableCloseOnClick={disableCloseOnOutsideClick}
			active={active}
			transparent={transparentOverlay || hideProgress}
			blurred={blurredOverlay}
			overflow={clientPosition === "center" ? "auto" : "hidden"}
			className={overlayClassName}
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
					containerRef && s["--contained"],
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
									"--rs-modal-drag":
										Math.abs(dragDistance) < DRAG_THRESHOLD
											? "0px"
											: `${
													dragDistance + DRAG_THRESHOLD * (clientPosition === "start" ? 1 : -1)
												}px`,
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
