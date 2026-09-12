"use client";

import { createContext, useContext, useEffect, useMemo, useState, useRef, type FC } from "react";
import { classNames } from "@reshaped/utilities";

import Overlay, { type OverlayInstance } from "@/components/Overlay";
import Text from "@/components/Text";
import useElementId from "@/hooks/useElementId";
import useResponsiveClientValue from "@/hooks/useResponsiveClientValue";
import { responsiveClassNames, responsiveVariables } from "@/utilities/props";
import { resolveMixin } from "@/styles/mixin";
import type * as T from "./Modal.types";
import useModalDrag from "./useModalDrag";
import s from "./Modal.module.css";

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
	const id = useElementId();
	const clientPosition = useResponsiveClientValue(position)!;
	const [titleMounted, setTitleMounted] = useState(false);
	const [subtitleMounted, setSubtitleMounted] = useState(false);
	const internalRootRef = useRef<HTMLDivElement>(null);
	const rootRef = attributes?.ref || internalRootRef;
	const overlayRef = useRef<OverlayInstance>(null);
	const mixinStyles = resolveMixin({ padding });
	const shouldBeContained = containerRef && contained !== false;
	const { dragging, handleTouchStart, handleTransitionEnd } = useModalDrag({
		position: clientPosition,
		rootRef,
		overlayRef,
		active,
		containerRef,
		transparentOverlay,
		disabled: disableSwipeGesture,
		onClose,
	});

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
				onTouchStart: handleTouchStart,
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
