"use client";

import {
	Actionable as UnstyledActionable,
	type ActionableRef as UnstyledActionableRef,
} from "@reshaped/core";
import { forwardRef } from "react";

import s from "./Actionable.module.css";

import type * as T from "./Actionable.types";

const Actionable = forwardRef<UnstyledActionableRef, T.Props>((props, ref) => {
	const {
		// Styled props
		insetFocus,
		disableFocusRing,
		borderRadius,
		fullWidth,
		touchHitbox,

		// Unstyled props used for internal behavior
		children,
		className,
		disabled,

		...unstyledProps
	} = props;
	const rootClassNames = [
		s.root,
		className,
		disabled && s["--disabled"],
		borderRadius && s[`--radius-${borderRadius}`],
		insetFocus && s["--inset"],
		disableFocusRing && s["--disabled-focus-ring"],
		fullWidth && s["--full-width"],
	];

	return (
		<UnstyledActionable {...unstyledProps} className={rootClassNames} disabled={disabled} ref={ref}>
			{touchHitbox && !disabled && <span className={s.touch} />}
			{children}
		</UnstyledActionable>
	);
});

Actionable.displayName = "Actionable";

export default Actionable;
