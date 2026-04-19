"use client";

import {
	TrapFocus,
	useHotkeys,
	useIsomorphicLayoutEffect,
	useHandlerRef,
	useScrollLock,
	useToggle,
} from "@reshaped/headless";
import { classNames, useIsDismissible } from "@reshaped/headless";
import { type FocusableElement } from "@reshaped/headless/internal";
import React from "react";

import Portal from "@/components/_private/Portal";
import { checkTransitions, onNextFrame } from "@/utilities/animation";

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
		contained,
		className,
		attributes,
	} = props;

	// Selectors wrapped with refs to simplify working with useEffect dependency array
	const onCloseRef = useHandlerRef(onClose);
	const onOpenRef = useHandlerRef(onOpen);
	const onAfterCloseRef = useHandlerRef(onAfterClose);

	const isTransparent = transparent === true;
	const opacity = isTransparent ? 0 : (1 - (transparent || 0)) * 0.7;
	const [mounted, setMounted] = React.useState(false);
	const [animated, setAnimated] = React.useState(false);
	const [offset, setOffset] = React.useState([0, 0]);
	const scopeRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const { lockScroll, unlockScroll } = useScrollLock({ containerRef });

	// Store overflow value in case we override it when rendering inside containerRef
	const originalOverflowRef = React.useRef<string | null>(null);

	// Store mouseDown clicks that should close the overlay to then use it in mouseUp
	const isMouseDownValidRef = React.useRef(false);

	// Separating rendered and visible states to make sure animation is triggered only once overlay was added to the dom
	const { active: rendered, activate: render, deactivate: remove } = useToggle(active || false);
	const { active: visible, activate: show, deactivate: hide } = useToggle(active || false);
	const isDismissible = useIsDismissible({ active, contentRef });
	const shouldBeContained = containerRef && contained !== false;

	const rootClassNames = classNames(
		s.root,
		visible && s["--visible"],
		isTransparent && s["--click-through"],
		blurred && s["--blurred"],
		animated && s["--animated"],
		shouldBeContained && s["--contained"],
		overflow === "auto" && s["--overflow-auto"],
		className
	);

	const isInsideContent = (el: HTMLElement) => {
		// Clicked on another portal rendered above the overlay so it's considered as a part of the modal
		if (!scopeRef.current?.contains(el)) return true;

		if (el === contentRef.current && el.firstElementChild) return false;
		return Boolean(contentRef.current?.contains(el));
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
		const hasTransitions = checkTransitions();

		if (hasTransitions) setAnimated(true);
		if (active && !rendered) render();
		if (!active && rendered) {
			if (!hasTransitions) {
				unlockScroll();
				remove();
				onAfterCloseRef.current?.();
				return;
			}

			hide();
		}
	}, [active, render, hide, rendered, remove, unlockScroll, onAfterCloseRef]);

	// Show overlay after it was rendered
	React.useEffect(() => {
		if (!rendered) return;
		if (!isTransparent) lockScroll();
		onNextFrame(() => show());
	}, [rendered, show, lockScroll, isTransparent]);

	React.useEffect(() => {
		if (!rendered || !contentRef.current) return;

		const trapFocus = new TrapFocus();
		const containerEl = containerRef?.current;

		if (containerEl) {
			originalOverflowRef.current = containerEl.style.overflow;

			containerEl.style.setProperty("overflow", "hidden");
			containerEl.style.setProperty("isolation", "isolate");
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
			<Portal.Scope scopeRef={scopeRef}>
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
