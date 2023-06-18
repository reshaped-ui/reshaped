"use client";

import React from "react";
import { onNextFrame } from "utilities/animation";
import { classNames } from "utilities/helpers";
import { trapFocus } from "utilities/a11y";
import useToggle from "hooks/useToggle";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useHotkeys from "hooks/useHotkeys";
import useScrollLock from "hooks/useScrollLock";
import useIsDismissible from "hooks/_private/useIsDismissible";
import Portal from "components/_private/Portal";
import type * as T from "./Overlay.types";
import s from "./Overlay.module.css";

const Overlay = (props: T.Props) => {
	const { active, children, transparent, onClose, className, attributes } = props;
	const [mounted, setMounted] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement | null>(null);
	const rootRef = React.useRef<HTMLDivElement | null>(null);
	const isMouseDownValidRef = React.useRef(false);
	const releaseFocusRef = React.useRef<ReturnType<typeof trapFocus> | null>(null);
	const { lockScroll, unlockScroll } = useScrollLock();
	const { active: rendered, activate: render, deactivate: remove } = useToggle(active || false);
	const { active: visible, activate: show, deactivate: hide } = useToggle(active || false);
	const isDismissible = useIsDismissible(active, contentRef);
	const rootClassNames = classNames(
		s.root,
		visible && s["--visible"],
		transparent && s["--transparent"],
		className
	);

	const isInsideChild = (el: HTMLElement) => {
		if (!contentRef.current) return;
		const firstChild = contentRef.current!.firstChild;

		if (!firstChild) return;
		return firstChild.contains(el);
	};

	const trapFocusInside = () => {
		if (!contentRef.current) return;
		releaseFocusRef.current = trapFocus(contentRef.current!);
	};

	const cancelTrapFocus = () => {
		if (!releaseFocusRef.current) return;
		releaseFocusRef.current();
		releaseFocusRef.current = null;
	};

	const close = React.useCallback(() => {
		if (!visible || !isDismissible()) return;
		if (onClose) onClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible, isDismissible]);

	const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
		isMouseDownValidRef.current = !isInsideChild(event.target as HTMLElement);
	};

	const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
		const isMouseUpValid = !isInsideChild(event.target as HTMLElement);
		const shouldClose = isMouseDownValidRef.current && isMouseUpValid && !transparent;

		if (!shouldClose) return;
		close();
	};

	const handleTransitionEnd = (e: React.TransitionEvent) => {
		if (e.propertyName !== "opacity" || e.target !== e.currentTarget) return;
		if (visible) return;
		if (!transparent) unlockScroll();
		remove();
	};

	useHotkeys({ Escape: close }, [close]);

	React.useEffect(() => {
		if (active && !rendered) render();
		if (!active && rendered) hide();
	}, [active, render, hide, rendered]);

	// Show overlay after it was rendered
	React.useEffect(() => {
		if (!rendered) return;
		if (!transparent) lockScroll();
		onNextFrame(() => show());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rendered, show, lockScroll, transparent]);

	React.useEffect(() => {
		if (!rendered) return;
		trapFocusInside();
		return () => cancelTrapFocus();
	}, [rendered]);

	// Unlock scroll on unmount
	React.useEffect(() => {
		return () => {
			if (!transparent) unlockScroll();
		};
	}, [unlockScroll, transparent]);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (!rendered || !mounted) return null;

	return (
		<Portal scopeRef={rootRef}>
			<div
				{...attributes}
				ref={rootRef}
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
		</Portal>
	);
};

export default Overlay;
