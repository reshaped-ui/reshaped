"use client";

import React from "react";
import { classNames, responsiveVariables, responsiveClassNames } from "utilities/helpers";
import useResponsiveClientValue from "hooks/useResponsiveClientValue";
import Text from "components/Text";
import Overlay from "components/Overlay";
import useElementId from "hooks/useElementId";
import type * as T from "./Modal.types";
import s from "./Modal.module.css";
import getPaddingStyles from "styles/padding";

const DRAG_THRESHOLD = 16;
const DRAG_EDGE_BOUNDARY = 32;

const Context = React.createContext<T.Context>({
	id: "",
	titleMounted: false,
	setTitleMounted: () => {},
	subtitleMounted: false,
	setSubtitleMounted: () => {},
});
const useModal = () => React.useContext(Context);

const ModalTitle = (props: T.TitleProps) => {
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

const ModalSubtitle = (props: T.SubtitleProps) => {
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

const Modal = (props: T.Props) => {
	const {
		children,
		onClose,
		active,
		size,
		padding = 4,
		position = "center",
		transparentOverlay,
		className,
		attributes,
	} = props;
	const id = useElementId();
	const clientPosition = useResponsiveClientValue(position);
	const [titleMounted, setTitleMounted] = React.useState(false);
	const [subtitleMounted, setSubtitleMounted] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const rootRef = React.useRef<HTMLDivElement>(null);
	const dragClientCoordinatesRef = React.useRef(0);
	const dragDistanceRef = React.useRef(0);
	const dragDirectionRef = React.useRef<-1 | 0 | 1>(0);
	const [dragDistance, setDragDistance] = React.useState(0);
	const [hideProgress, setHideProgress] = React.useState(0);
	const paddingStyles = getPaddingStyles(padding);

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
		dragDirectionRef.current = 0;
		dragClientCoordinatesRef.current = 0;
		setDragDistance(0);
		setHideProgress(0);
	};

	const handleDragStart = (e: React.TouchEvent) => {
		const el = e.target as HTMLElement;

		// Prioritize scrolling over modal swiping
		if (el.scrollTop !== 0 || el.scrollLeft !== 0) return;
		// Start dragging only when starting on static elements
		if (el.matches("input,textarea")) return;
		// Prevent the drag handling when browser tab swiping is triggering
		if (clientPosition === "start" && e.targetTouches[0].clientX < DRAG_EDGE_BOUNDARY) return;

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
			setDragging(false);

			// Close only when dragging in the closing direction
			// Changing to a different direction will keep the modal opened
			const shouldClose =
				clientPosition && ["bottom", "end"].includes(clientPosition)
					? dragDirectionRef.current > 0
					: dragDirectionRef.current < 0;

			if (Math.abs(dragDistanceRef.current) > DRAG_THRESHOLD && shouldClose) {
				onClose?.();
			} else {
				resetDragData();
			}
		};

		const handleDrag = (e: TouchEvent) => {
			if (!dragging || clientPosition === "center") return;

			const prev = dragClientCoordinatesRef.current;
			const target = e.targetTouches[0];
			dragClientCoordinatesRef.current =
				clientPosition === "bottom" ? target.clientY : target.clientX;

			if (!prev) return;

			const delta = dragClientCoordinatesRef.current - prev;
			dragDirectionRef.current = delta < 0 ? -1 : 1;

			setDragDistance((prev) => {
				const next = prev + delta;
				return clientPosition === "start" ? Math.min(0, next) : Math.max(0, next);
			});
		};

		document.addEventListener("touchmove", handleDrag);
		document.addEventListener("touchend", handleDragEnd);

		return () => {
			document.removeEventListener("touchmove", handleDrag);
			document.removeEventListener("touchend", handleDragEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dragging, clientPosition]);

	// Syncing distance to the ref to avoid having a dependency on dragDistance in handleDragEnd
	React.useEffect(() => {
		const rootEl = rootRef.current;

		if (!rootEl || !clientPosition) return;

		const isInline = ["start", "end"].includes(clientPosition);

		const size = isInline ? rootEl.clientWidth : rootEl.clientHeight;
		const progress = Math.abs(dragDistance) / size;

		dragDistanceRef.current = dragDistance;
		setHideProgress(progress / 2);
	}, [dragDistance, clientPosition]);

	return (
		<Overlay onClose={onClose} active={active} transparent={transparentOverlay || hideProgress}>
			{({ active }) => {
				const rootClassNames = classNames(
					s.root,
					className,
					paddingStyles?.classNames,
					active && s["--active"],
					dragging && s["--dragging"],
					responsiveClassNames(s, "--position", position)
				);

				return (
					<Context.Provider value={value}>
						{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
						<div
							{...attributes}
							style={
								{
									...paddingStyles?.variables,
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
							className={rootClassNames}
							aria-modal="true"
							role="dialog"
							onTouchStart={handleDragStart}
							onTransitionEnd={handleTransitionEnd}
							ref={rootRef}
						>
							{children}
						</div>
					</Context.Provider>
				);
			}}
		</Overlay>
	);
};

Modal.Title = ModalTitle;
Modal.Subtitle = ModalSubtitle;
export default Modal;
