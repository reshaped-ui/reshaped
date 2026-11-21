"use client";

import { createContext, useContext, useEffect, useMemo, useState, useRef, type FC } from "react";
import { classNames } from "@reshaped/utilities";

import Overlay, { type OverlayInstance } from "@/components/Overlay";
import Text from "@/components/Text";
import useElementId from "@/hooks/useElementId";
import useResponsiveClientValue from "@/hooks/useResponsiveClientValue";
import useRTL from "@/hooks/useRTL";
import useVirtualKeyboard from "@/hooks/useVirtualKeyboard";
import { responsiveClassNames, responsiveVariables } from "@/utilities/props";
import type * as T from "./Modal.types";
import useModalScroll, { type Side } from "./useModalScroll";
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
	const keyboard = useVirtualKeyboard();
	const [titleMounted, setTitleMounted] = useState(false);
	const [subtitleMounted, setSubtitleMounted] = useState(false);
	const internalRootRef = useRef<HTMLDivElement>(null);
	const rootRef = attributes?.ref || internalRootRef;
	const overlayRef = useRef<OverlayInstance>(null);
	const shouldBeContained = containerRef && contained !== false;
	const [rtl] = useRTL();
	// Swiping is based on the native scrolling of the touch devices, modal is positioned without it everywhere else
	const touch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
	const scrollable = touch && !disableSwipeGesture && clientPosition !== "center";
	// Side modals move the same way the bottom one does, so they share its animation
	const sheet = scrollable && clientPosition !== "full-screen";
	// Full-screen modal is swiped away towards the end side
	const startSide = clientPosition === "start";
	const side: Side = clientPosition === "bottom" ? "bottom" : startSide !== rtl ? "left" : "right";
	const clientSize = useResponsiveClientValue(size);
	// Percentage sizes are relative to the screen, which the element wrapping the modal has to resolve
	const trackSize = scrollable && clientSize?.includes("%") ? clientSize : undefined;
	const { scrollerRef, trackRef, edgeRef, dismissed } = useModalScroll({
		side,
		overlayRef,
		active,
		enabled: scrollable,
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
			className={[
				// Modal stays opaque while it's moving and only the backdrop fades,
				// except for the blur that is applied to the overlay itself
				sheet && (blurredOverlay ? s["overlay--sheet-fade"] : s["overlay--sheet"]),
				dismissed && s["overlay--dismissed"],
				overlayClassName,
			]}
			backdropClassName={[sheet && s["overlay--sheet-fade"], dismissed && s["overlay--dismissed"]]}
			contained={contained}
			containerRef={containerRef}
		>
			{({ active }) => {
				const rootClassNames = classNames(
					s.root,
					className,
					active && s["--active"],
					overflow && s[`--overflow-${overflow}`],
					shouldBeContained && s["--contained"],
					responsiveClassNames(s, "--position", position)
				);
				const scrollerClassNames = classNames(
					s.scroller,
					scrollable && s["--scrollable"],
					scrollable && s[`--scrollable-${clientPosition}`],
					scrollable && shouldBeContained && s["--scroller-contained"]
				);

				return (
					<Context.Provider value={value}>
						{/* Rendered before the modal so it stays behind it */}
						{active && clientPosition === "bottom" && !shouldBeContained && (
							<div className={s.edge} ref={edgeRef} aria-hidden="true" />
						)}
						{/* Wrappers are always rendered to keep the modal content mounted when its position changes */}
						<div className={scrollerClassNames} ref={scrollerRef}>
							<div className={s.spacer} aria-hidden="true" />
							<div
								className={classNames(s.track, trackSize && s["--sized"])}
								style={{ "--rs-modal-track-size": trackSize } as React.CSSProperties}
								ref={trackRef}
							>
								<div
									{...attributes}
									style={
										{
											...responsiveVariables("--rs-modal-size", size),
											...responsiveVariables("--rs-modal-p", padding),
											"--rs-modal-keyboard-height": `${keyboard.height}px`,
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
								>
									{children}
								</div>
							</div>
							<div className={s.spacer} aria-hidden="true" />
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
