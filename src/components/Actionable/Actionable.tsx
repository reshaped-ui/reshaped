"use client";

import React, { forwardRef } from "react";
import { classNames } from "utilities/helpers";
import * as keys from "constants/keys";
import type * as T from "./Actionable.types";
import s from "./Actionable.module.css";

const Actionable = forwardRef<T.Ref, T.Props>((props, ref) => {
	const {
		children,
		href,
		onClick,
		type,
		disabled,
		insetFocus,
		disableFocusRing,
		borderRadius,
		as,
		stopPropagation,
		fullWidth,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		disabled && s["--disabled"],
		borderRadius && s[`--radius-${borderRadius}`],
		insetFocus && s["--inset"],
		disableFocusRing && s["--disabled-focus-ring"],
		fullWidth && s["--full-width"]
	);
	const rootAttributes: T.Props["attributes"] = { ...attributes };
	const hasClickHandler = onClick || (attributes?.onClick as T.Props["onClick"]);
	const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
	const isLink = Boolean(href || attributes?.href);
	// Including attributes ref for the cases when event listeners are added through it
	// To make sure it doesn't render a span
	const isButton = Boolean(hasClickHandler || hasFocusHandler || type || attributes?.ref);
	const renderedAsButton = !isLink && isButton && (!as || as === "button");
	// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let TagName: any;

	if (isLink) {
		TagName = "a";
		rootAttributes.href = disabled ? undefined : href || attributes?.href;
	} else if (renderedAsButton) {
		TagName = "button";
		rootAttributes.type = type || attributes?.type || "button";
		rootAttributes.disabled = disabled || attributes?.disabled;
	} else if (isButton) {
		const isFocusable = as === "label";
		const simulateButton = !isFocusable || hasClickHandler || hasFocusHandler;

		TagName = as || "span";
		rootAttributes.role = simulateButton ? "button" : undefined;
		rootAttributes.tabIndex = simulateButton ? 0 : undefined;
	} else {
		TagName = as || "span";
	}

	const handlePress: T.Props["onClick"] = (event) => {
		if (disabled) return;
		if (stopPropagation) event.stopPropagation();

		onClick?.(event);
		attributes?.onClick?.(event as React.MouseEvent<HTMLButtonElement>);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		const isSpace = event.key === keys.SPACE;
		const isEnter = event.key === keys.ENTER;

		if (!isSpace && !isEnter) return;
		if (rootAttributes.role !== "button") return;

		if (stopPropagation) event.stopPropagation();
		event.preventDefault();
		handlePress(event);
	};

	return (
		<TagName
			ref={ref}
			// rootAttributes can receive ref from Flyout
			{...rootAttributes}
			aria-disabled={disabled ? true : undefined}
			className={rootClassNames}
			onClick={handlePress}
			onKeyDown={handleKeyDown}
		>
			{children}
		</TagName>
	);
});

Actionable.displayName = "Actionable";

export default Actionable;
