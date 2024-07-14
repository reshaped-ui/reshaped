"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import Portal from "components/_private/Portal";
import { getClosestFlyoutTarget } from "utilities/dom";
import cooldown from "./utilities/cooldown";
import { useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";
import s from "./Flyout.module.css";

const FlyoutContent = (props: T.ContentProps) => {
	const { children, className, attributes } = props;
	const {
		flyout,
		id,
		flyoutElRef,
		triggerElRef,
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
		width,
		containerRef,
	} = useFlyoutContext();
	const { styles, status, position } = flyout;
	const [mounted, setMounted] = React.useState(false);

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

	if (status === "idle" || !mounted) return null;

	const contentClassNames = classNames(
		s.content,
		status === "visible" && s["--visible"],
		// animating only when we're opening the first flyout or closing the last flyout within the same cooldown
		// content is rendered only once flyout is already warm so checking for timer instead
		(cooldown.status === "cooling" || !cooldown.timer) && s["--animated"],
		position && s[`--position-${position}`],
		width === "trigger" && s["--width-trigger"]
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
	}

	const content = (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={contentClassNames}
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
				aria-modal={triggerType === "click"}
				style={contentAttributes?.style}
				className={innerClassNames}
			>
				{children}
			</div>
		</div>
	);

	const closestScrollable = getClosestFlyoutTarget(triggerElRef.current);
	const scrollableRef =
		closestScrollable === document.body ? undefined : { current: closestScrollable };

	return <Portal targetRef={containerRef || scrollableRef}>{content}</Portal>;
};

export default FlyoutContent;
