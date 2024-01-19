"use client";

import React, { forwardRef } from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./Actionable.types";
import s from "./Actionable.module.css";

const Actionable = (props: T.Props, ref: T.Ref) => {
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
	const repeatRef = React.useRef(false);
	const hasClickHandler = onClick || (attributes?.onClick as T.Props["onClick"]);
	const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
	const isLink = Boolean(href || attributes?.href);
	const isButton = Boolean(hasClickHandler || hasFocusHandler || type);
	let TagName: any;

	if (isLink) {
		rootAttributes.href = disabled ? undefined : href || attributes?.href;
		TagName = "a";
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
		/**
		 * - Holding enter keep onClick getting triggered
		 * - Storybook environment is triggering onClick twice on each enter press
		 */
		if (repeatRef.current) return;

		onClick?.(event);
		attributes?.onClick?.(event as any);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		const simulatingButton = rootAttributes.role === "button";

		// These cases are handled correctly by the browsers
		if (simulatingButton || isLink) return;
		const isSpace = event.key === " ";
		const isEnter = event.key === "Enter";
		if (!isSpace && !isEnter) return;

		event.preventDefault();
		handlePress(event);

		repeatRef.current = true;
		requestAnimationFrame(() => {
			repeatRef.current = false;
		});
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
};

export default forwardRef(Actionable);
