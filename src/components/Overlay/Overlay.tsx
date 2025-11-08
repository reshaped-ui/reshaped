"use client";

import React from "react";

import Portal from "components/_private/Portal";
import useIsDismissible from "hooks/_private/useIsDismissible";
import useHandlerRef from "hooks/useHandlerRef";
import useHotkeys from "hooks/useHotkeys";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useScrollLock from "hooks/useScrollLock";
import useToggle from "hooks/useToggle";
import { TrapFocus, type FocusableElement } from "utilities/a11y";
import { onNextFrame } from "utilities/animation";
import { classNames } from "utilities/props";

import s from "./Overlay.module.css";

import type * as T from "./Overlay.types";

const Overlay: React.FC<T.Props> = (props) => {
	const {
		active,
		children,
		transparent,
		blurred,
		overflow,
		onClose,
		onOpen,
		onAfterClose,
		onAfterOpen,
		disableCloseOnClick,
		containerRef,
		className,
		attributes,
	} = props;

	// Selectors wrapped with refs to simplify working with useEffect dependency array
	const onCloseRef = useHandlerRef(onClose);
	const onOpenRef = useHandlerRef(onOpen);

	const isTransparent = transparent === true;
	const opacity = isTransparent ? 0 : (1 - (transparent || 0)) * 0.7;
	const [mounted, setMounted] = React.useState(false);
	const [animated, setAnimated] = React.useState(false);
	const [offset, setOffset] = React.useState([0, 0]);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll } = useScrollLock({ containerRef });

	// Store overflow value in case we override it when rendering inside containerRef
	const originalOverflowRef = React.useRef<string | null>(null);

	// Store mouseDown clicks that should close the overlay to then use it in mouseUp
	const isMouseDownValidRef = React.useRef(false);

	// Separating rendered and visible states to make sure animation is triggered only once overlay was added to the dom
	const { active: rendered, activate: render, deactivate: remove } = useToggle(active || false);
	const { active: visible, activate: show, deactivate: hide } = useToggle(active || false);
	const isDismissible = useIsDismissible({ active, contentRef, hasTrigger: false });

	const rootClassNames = classNames(
		s.root,
		visible && s["--visible"],
		isTransparent && s["--click-through"],
		blurred && s["--blurred"],
		animated && s["--animated"],
		containerRef && s["--contained"],
		overflow === "auto" && s["--overflow-auto"],
		className
	);

	const isInsideContent = (el: HTMLElement) => {
		if (!contentRef.current) return;
		const firstChild = contentRef.current.firstChild;

		if (!firstChild) return;
		return firstChild.contains(el);
	};

	const close = React.useCallback(
		(args: { reason: T.CloseReason }) => {
			if (!visible || !isDismissible()) return;

			if (originalOverflowRef.current && containerRef?.current) {
				containerRef.current.style.overflow = originalOverflowRef.current;
				containerRef.current.style.removeProperty("isolation");
				originalOverflowRef.current = null;
			}

			onCloseRef.current?.({ reason: args.reason });
		},
		[visible, isDismissible, onCloseRef, containerRef]
	);

	const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
		isMouseDownValidRef.current = !isInsideContent(event.target as HTMLElement);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
		const isMouseUpValid = !isInsideContent(event.target as HTMLElement);
		const shouldClose = isMouseDownValidRef.current && isMouseUpValid && !isTransparent;

		if (!shouldClose || disableCloseOnClick) return;

		close({ reason: "overlay-click" });
	};

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "opacity" || e.target !== e.currentTarget) return;
		setAnimated(false);

		if (visible) {
			onAfterOpen?.();
			return;
		}

		unlockScroll();
		remove();
		onAfterClose?.();
	};

	useHotkeys(
		{
			Escape: () => close({ reason: "escape-key" }),
		},
		[close]
	);

	React.useEffect(() => {
		setAnimated(true);
		if (active && !rendered) render();
		if (!active && rendered) hide();
	}, [active, render, hide, rendered]);

	// Show overlay after it was rendered
	React.useEffect(() => {
		if (!rendered) return;
		if (!isTransparent) lockScroll();
		onNextFrame(() => {
			show();
		});
	}, [rendered, show, lockScroll, isTransparent]);

	React.useEffect(() => {
		if (!rendered || !contentRef.current) return;

		const trapFocus = new TrapFocus();
		const containerEl = containerRef?.current;

		if (containerEl) {
			originalOverflowRef.current = containerEl.style.overflow;
			// eslint-disable-next-line react-hooks/immutability
			containerEl.style.overflow = "hidden";
			containerEl.style.isolation = "isolate";
			setOffset([containerEl.scrollLeft, containerEl.scrollTop]);
		}

		trapFocus.trap(contentRef.current, {
			initialFocusEl: contentRef.current.querySelector("[role=dialog][tabindex='-1']") as
				| FocusableElement
				| undefined,
		});

		onOpenRef.current?.();

		return () => trapFocus.release();
	}, [rendered, onOpenRef, containerRef]);

	// Unlock scroll on unmount
	React.useEffect(() => {
		return () => unlockScroll();
	}, [unlockScroll]);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (!rendered || !mounted) return null;

	return (
		<Portal targetRef={containerRef}>
			<Portal.Scope>
				{(ref) => (
					<div
						{...attributes}
						ref={ref}
						style={
							{
								"--rs-overlay-opacity": opacity,
								"--rs-overlay-offset-x": containerRef ? `${offset[0]}px` : undefined,
								"--rs-overlay-offset-y": containerRef ? `${offset[1]}px` : undefined,
							} as React.CSSProperties
						}
						role="button"
						tabIndex={-1}
						className={rootClassNames}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onTransitionEnd={handleTransitionEnd}
					>
						<div className={s.wrapper}>
							<div className={s.inner}>
								<div className={s.content} ref={contentRef}>
									{typeof children === "function" ? children({ active: visible }) : children}
								</div>
							</div>
						</div>
					</div>
				)}
			</Portal.Scope>
		</Portal>
	);
};

Overlay.displayName = "Overlay";

export default Overlay;
