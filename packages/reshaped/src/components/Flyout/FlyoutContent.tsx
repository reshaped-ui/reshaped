"use client";

import React from "react";

import Portal from "components/_private/Portal";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { findClosestPositionContainer, findClosestScrollableContainer } from "utilities/dom";
import { rafThrottle } from "utilities/helpers";
import { classNames } from "utilities/props";

import { useFlyoutContext, ContentProvider } from "./Flyout.context";
import s from "./Flyout.module.css";
import cooldown from "./utilities/cooldown";

import type * as T from "./Flyout.types";

const FlyoutContent: React.FC<T.ContentProps> = (props) => {
	const { children, className, attributes } = props;
	const {
		flyout,
		id,
		flyoutElRef,
		triggerElRef,
		handleClose,
		handleTransitionEnd,
		handleTransitionStart,
		triggerType,
		handleMouseEnter,
		handleMouseLeave,
		handleContentMouseDown,
		handleContentMouseUp,
		contentClassName,
		contentAttributes,
		contentGap,
		contentMaxHeight,
		contentMaxWidth,
		trapFocusMode,
		disableContentHover,
		autoFocus,
		width,
		containerRef: passedContainerRef,
		isSubmenu,
	} = useFlyoutContext();
	const { status, position } = flyout;
	const [mounted, setMounted] = React.useState(false);
	const closestFixedContainer = React.useMemo(() => {
		if (!mounted) return null;
		if (!triggerElRef) return null;
		// eslint-disable-next-line react-hooks/refs
		return findClosestPositionContainer({ el: triggerElRef.current });
	}, [mounted, triggerElRef]);
	const closestScrollableContainer = React.useMemo(() => {
		if (!mounted) return;
		// eslint-disable-next-line react-hooks/refs
		if (!triggerElRef?.current) return;
		// eslint-disable-next-line react-hooks/refs
		return findClosestScrollableContainer({ el: triggerElRef.current });
	}, [mounted, triggerElRef]);
	const containerRef = passedContainerRef || { current: closestFixedContainer };

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	/**
	 * transitionStart doesn't exist as a jsx event handler and needs to be handled with vanilla js
	 */
	React.useEffect(() => {
		const el = flyoutElRef.current;
		if (!el) return;

		el.addEventListener("transitionstart", handleTransitionStart);
		return () => el.removeEventListener("transitionstart", handleTransitionStart);
	}, [handleTransitionStart, flyoutElRef, status]);

	React.useEffect(() => {
		if (status !== "visible") return;

		if (!closestScrollableContainer) return;

		const triggerEl = triggerElRef?.current;
		const containerEl = closestScrollableContainer;

		const handleScroll = rafThrottle(() => {
			const triggerBounds = triggerEl?.getBoundingClientRect();
			const containerBounds = containerEl.getBoundingClientRect();

			if (
				triggerBounds &&
				(triggerBounds.top < containerBounds.top ||
					triggerBounds.left < containerBounds.left ||
					triggerBounds.right > containerBounds.right ||
					triggerBounds.bottom > containerBounds.bottom)
			) {
				handleClose({});
			} else {
				flyout.updatePosition({ sync: true, fallback: false });
			}
		});

		closestScrollableContainer.addEventListener("scroll", handleScroll, { passive: true });
		return () => closestScrollableContainer.removeEventListener("scroll", handleScroll);
	}, [closestScrollableContainer, flyout, status, handleClose, triggerElRef]);

	if (status === "idle" || !mounted) return null;

	const rootClassNames = classNames(
		s.content,
		triggerType === "hover" && s["--hover"],
		status === "visible" && s["--visible"],
		// animating only when we're opening the first flyout or closing the last flyout within the same cooldown
		// content is rendered only once flyout is already warm so checking for timer instead
		(cooldown.status === "cooling" || !cooldown.timer || isSubmenu || triggerType !== "hover") &&
			s["--animated"],
		position && s[`--position-${position}`],
		width === "trigger" && s["--width-trigger"],
		triggerType === "hover" && disableContentHover && s["--hover-disabled"]
	);
	// className is applied to inner element because it has the transform and is treated like a real root element
	const innerClassNames = classNames(s.inner, className, contentClassName);
	let role = attributes?.role;

	if (triggerType === "hover") {
		role = "tooltip";
	} else if (trapFocusMode === "dialog") {
		role = "dialog";
	} else if (trapFocusMode === "selection-menu") {
		role = "listbox";
	} else if (trapFocusMode === "action-menu") {
		role = "menu";
	} else if (trapFocusMode === "action-bar") {
		role = "menubar";
	}

	const content = (
		<ContentProvider value={{ elRef: flyoutElRef }}>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				className={rootClassNames}
				style={
					{
						"--rs-flyout-gap": contentGap,
						"--rs-flyout-max-h": contentMaxHeight,
						"--rs-flyout-max-w": contentMaxWidth,
					} as React.CSSProperties
				}
				ref={flyoutElRef}
				onTransitionEnd={handleTransitionEnd}
				onMouseEnter={triggerType === "hover" ? handleMouseEnter : undefined}
				onMouseLeave={triggerType === "hover" ? handleMouseLeave : undefined}
				onMouseDown={handleContentMouseDown}
				onTouchStart={handleContentMouseDown}
				onMouseUp={handleContentMouseUp}
				onTouchEnd={handleContentMouseUp}
			>
				<div
					role={role}
					{...attributes}
					id={id}
					tabIndex={!autoFocus ? -1 : undefined}
					aria-modal={role === "dialog" ? true : undefined}
					style={{ ...attributes?.style, ...contentAttributes?.style }}
					className={innerClassNames}
				>
					{children}
				</div>
			</div>
		</ContentProvider>
	);

	return <Portal targetRef={containerRef}>{content}</Portal>;
};

FlyoutContent.displayName = "Flyout.Content";

export default FlyoutContent;
