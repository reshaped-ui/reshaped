"use client";

import React from "react";
import type * as T from "./Flyout.types";
import { useFlyoutContext } from "./Flyout.context";

const FlyoutTrigger = (props: T.TriggerProps) => {
	const { children } = props;
	const {
		id,
		triggerElRef,
		triggerType,
		flyout,
		handleFocus,
		handleBlur,
		handleMouseEnter,
		handleMouseLeave,
		handleClick,
		trapFocusMode,
	} = useFlyoutContext();

	let childrenAttributes: Partial<T.TriggerAttributes> = {
		onClick: handleClick,
		onBlur: handleBlur,
		ref: triggerElRef,
	};

	if (triggerType === "hover") {
		childrenAttributes.onMouseEnter = handleMouseEnter;
		childrenAttributes.onMouseLeave = handleMouseLeave;
	}

	if (triggerType === "hover" && trapFocusMode !== "action-menu") {
		childrenAttributes.onFocus = handleFocus;
		childrenAttributes["aria-describedby"] = id;
	}

	if (triggerType === "click" || trapFocusMode === "action-menu") {
		childrenAttributes["aria-haspopup"] = trapFocusMode === "dialog" ? "dialog" : "menu";
		childrenAttributes["aria-expanded"] = flyout.status !== "idle";
		childrenAttributes["aria-controls"] = flyout.status !== "idle" ? id : undefined;
	}

	return <>{children(childrenAttributes as T.TriggerAttributes)}</>;
};

export default FlyoutTrigger;
