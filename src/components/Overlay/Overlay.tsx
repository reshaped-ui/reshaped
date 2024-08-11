"use client";

import React from "react";
import { onNextFrame } from "utilities/animation";
import { classNames } from "utilities/helpers";
import TrapFocus from "utilities/a11y/TrapFocus";
import { type FocusableElement } from "utilities/a11y/types";
import useToggle from "hooks/useToggle";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useHotkeys from "hooks/useHotkeys";
import useScrollLock from "hooks/useScrollLock";
import useIsDismissible from "hooks/_private/useIsDismissible";
import Portal from "components/_private/Portal";
import type * as T from "./Overlay.types";
import s from "./Overlay.module.css";
import useHandlerRef from "hooks/useHandlerRef";

const Overlay = (props: T.Props) => {
	const {
		active,
		children,
		transparent,
		onClose,
		onOpen,
		disableCloseOnClick,
		className,
		attributes,
	} = props;
	const onCloseRef = useHandlerRef(onClose);
	const onOpenRef = useHandlerRef(onOpen);
	const clickThrough = transparent === true;
	const opacity = clickThrough ? 0 : (1 - (transparent || 0)) * 0.7;
	const [mounted, setMounted] = React.useState(false);
	const [animated, setAnimated] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement | null>(null);
	const isMouseDownValidRef = React.useRef(false);
	const { lockScroll, unlockScroll } = useScrollLock();
	const { active: rendered, activate: render, deactivate: remove } = useToggle(active || false);
	const { active: visible, activate: show, deactivate: hide } = useToggle(active || false);
	const isDismissible = useIsDismissible(active, contentRef);
	const rootClassNames = classNames(
		s.root,
		visible && s["--visible"],
		clickThrough && s["--click-through"],
		animated && s["--animated"],
		className
	);

	const isInsideChild = (el: HTMLElement) => {
		if (!contentRef.current) return;
		const firstChild = contentRef.current!.firstChild;

		if (!firstChild) return;
		return firstChild.contains(el);
	};

	const close = React.useCallback(() => {
		if (!visible || !isDismissible()) return;
		onCloseRef.current?.();
	}, [visible, isDismissible, onCloseRef]);

	const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
		isMouseDownValidRef.current = !isInsideChild(event.target as HTMLElement);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
		const isMouseUpValid = !isInsideChild(event.target as HTMLElement);
		const shouldClose = isMouseDownValidRef.current && isMouseUpValid && !clickThrough;

		if (!shouldClose || disableCloseOnClick) return;
		close();
	};

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "background-color") return;
		setAnimated(false);

		if (visible) return;
		if (!clickThrough) unlockScroll();

		remove();
	};

	useHotkeys({ Escape: close }, [close]);

	React.useEffect(() => {
		setAnimated(true);
		if (active && !rendered) render();
		if (!active && rendered) hide();
	}, [active, render, hide, rendered]);

	// Show overlay after it was rendered
	React.useEffect(() => {
		if (!rendered) return;
		if (!clickThrough) lockScroll();
		onNextFrame(() => {
			show();
		});
	}, [rendered, show, lockScroll, clickThrough]);

	React.useEffect(() => {
		if (!rendered || !contentRef.current) return;

		const trapFocus = new TrapFocus(contentRef.current);

		trapFocus.trap({
			initialFocusEl: contentRef.current.querySelector("[role=dialog][tabindex='-1']") as
				| FocusableElement
				| undefined,
		});

		onOpenRef.current?.();

		return () => trapFocus.release();
		// Ignoring onOpen since it might be not memoized when passed
	}, [rendered, onOpenRef]);

	// Unlock scroll on unmount
	React.useEffect(() => {
		return () => {
			if (!clickThrough) unlockScroll();
		};
	}, [unlockScroll, clickThrough]);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (!rendered || !mounted) return null;

	return (
		<Portal>
			<Portal.Scope<HTMLDivElement>>
				{(ref) => (
					<div
						{...attributes}
						ref={ref}
						style={{ "--rs-overlay-opacity": opacity } as React.CSSProperties}
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

export default Overlay;
