"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import Portal from "components/_private/Portal";
import { useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";
import s from "./Flyout.module.css";

const FlyoutContent = (props: T.ContentProps) => {
	const { children, className, attributes } = props;
	const {
		flyout,
		id,
		flyoutElRef,
		handleTransitionEnd,
		triggerType,
		handleMouseEnter,
		handleMouseLeave,
		contentGap,
		contentClassName,
		contentAttributes,
		trapFocusMode,
	} = useFlyoutContext();
	const { styles, status, position } = flyout;
	const [mounted, setMounted] = React.useState(false);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (status === "idle" || !mounted) return null;

	const contentClassNames = classNames(
		s.content,
		status === "visible" && s["--visible"],
		// Animate after correct position has been assigned
		["visible", "hidden"].includes(status) && s["--animated"],
		position && s[`--position-${position}`]
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
		<div
			className={contentClassNames}
			style={{ ...styles, "--rs-flyout-gap": contentGap } as React.CSSProperties}
			ref={flyoutElRef}
			onTransitionEnd={handleTransitionEnd}
			onMouseEnter={triggerType === "hover" ? handleMouseEnter : undefined}
			onMouseLeave={triggerType === "hover" ? handleMouseLeave : undefined}
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

	return <Portal>{content}</Portal>;
};

export default FlyoutContent;
