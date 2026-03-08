"use client";

import { classNames, useIsomorphicLayoutEffect } from "@reshaped/headless";
import React from "react";

import Portal from "@/components/_private/Portal";

import { ContentProvider, useFlyoutContext } from "./Flyout.context";
import s from "./Flyout.module.css";
import cooldown from "./utilities/cooldown";

import type * as T from "./Flyout.types";

const FlyoutContent: React.FC<T.ContentProps> = (props) => {
	const { children, className, attributes } = props;
	const {
		flyout,
		id,
		flyoutElRef,
		handleTransitionEnd,
		triggerType,
		handleContentMouseEnter,
		handleMouseLeave,
		handleContentMouseDown,
		handleContentMouseUp,
		contentClassName,
		contentAttributes,
		contentMaxHeight,
		contentMaxWidth,
		contentZIndex,
		trapFocusMode,
		disableContentHover,
		autoFocus,
		width,
		isSubmenu,
	} = useFlyoutContext();
	const { status, position } = flyout;
	const [mounted, setMounted] = React.useState(false);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

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
						"--rs-flyout-max-h": contentMaxHeight,
						"--rs-flyout-max-w": contentMaxWidth,
						"--rs-flyout-z-index": contentZIndex,
					} as React.CSSProperties
				}
				ref={flyoutElRef}
				onTransitionEnd={handleTransitionEnd}
				onMouseEnter={triggerType === "hover" ? handleContentMouseEnter : undefined}
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

	return <Portal>{content}</Portal>;
};

FlyoutContent.displayName = "Flyout.Content";

export default FlyoutContent;
