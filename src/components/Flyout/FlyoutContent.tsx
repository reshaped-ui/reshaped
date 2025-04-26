"use client";

import React from "react";
import { classNames, throttleHandler } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import Portal from "components/_private/Portal";
import { findClosestRenderContainer } from "utilities/dom";
import cooldown from "./utilities/cooldown";
import { useFlyoutContext, ContentProvider } from "./Flyout.context";
import type * as T from "./Flyout.types";
import s from "./Flyout.module.css";

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
		contentGap,
		contentClassName,
		contentAttributes,
		trapFocusMode,
		disableContentHover,
		width,
		containerRef,
		isSubmenu,
	} = useFlyoutContext();
	const { styles, status, position } = flyout;
	const [mounted, setMounted] = React.useState(false);
	const closestContainer = React.useMemo(() => {
		if (!mounted) return;
		if (!triggerElRef) return;
		return findClosestRenderContainer({ el: triggerElRef.current });
	}, [mounted, triggerElRef]);
	const scrollableRef =
		(mounted && closestContainer?.el === document.body) ||
		!closestContainer?.el ||
		closestContainer.scrollable
			? undefined
			: { current: closestContainer.el };

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
		if (!closestContainer?.scrollable) return;

		const triggerEl = triggerElRef?.current;
		const containerEl = closestContainer.el;

		const handleScroll = throttleHandler(() => {
			const triggerBounds = triggerEl?.getBoundingClientRect();
			const containerBounds = containerEl.getBoundingClientRect();

			if (
				triggerBounds &&
				(triggerBounds.bottom < containerBounds.top ||
					triggerBounds.right < containerBounds.left ||
					triggerBounds.left > containerBounds.right ||
					triggerBounds.top > containerBounds.bottom)
			) {
				handleClose({});
			} else {
				flyout.updatePosition({ sync: true });
			}
		}, 16);

		closestContainer.el.addEventListener("scroll", handleScroll, { passive: true });
		return () => closestContainer.el.removeEventListener("scroll", handleScroll);
	}, [closestContainer, flyout, handleClose, triggerElRef]);

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
	let role;

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
						...styles,
						"--rs-flyout-gap": contentGap,
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
					aria-modal={role === "dialog" ? true : undefined}
					style={contentAttributes?.style}
					className={innerClassNames}
				>
					{children}
				</div>
			</div>
		</ContentProvider>
	);

	return <Portal targetRef={containerRef || scrollableRef}>{content}</Portal>;
};

FlyoutContent.displayName = "Flyout.Content";

export default FlyoutContent;
