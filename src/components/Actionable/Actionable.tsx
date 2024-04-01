"use client";

import React, { forwardRef } from "react";
import { classNames } from "utilities/helpers";
import * as keys from "constants/keys";
import type * as T from "./Actionable.types";
import s from "./Actionable.module.css";

const Actionable = forwardRef((props: T.Props, ref: T.Ref) => {
	const {
		children,
		href,
		onClick,
		type,
		disabled,
		insetFocus,
		borderRadius,
		as,
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
		fullWidth && s["--full-width"]
	);
	const rootAttributes: T.Props["attributes"] = { ...attributes };
	const hasClickHandler = onClick || (attributes?.onClick as T.Props["onClick"]);
	const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
	const isLink = Boolean(href || attributes?.href);
	const isButton = Boolean(hasClickHandler || hasFocusHandler || type);
	let TagName: any;

	if (isLink) {
		TagName = "a";
		rootAttributes.href = disabled ? undefined : href || attributes?.href;
		rootAttributes.role = hasClickHandler ? "button" : attributes?.role;
	} else if (isButton && (!as || as === "button")) {
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

		onClick?.(event);
		attributes?.onClick?.(event as any);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		const isSpace = event.key === keys.SPACE;
		const isEnter = event.key === keys.ENTER;

		if (!isSpace && !isEnter) return;
		if (!hasClickHandler) return;

		event.preventDefault();
		handlePress(event);
	};

	return (
		<TagName
			ref={ref}
			// rootAttributes can receive ref from Flyout
			{...rootAttributes}
			className={rootClassNames}
			onClick={handlePress}
			onKeyDown={handleKeyDown}
		>
			{children}
		</TagName>
	);
});

export default Actionable;
