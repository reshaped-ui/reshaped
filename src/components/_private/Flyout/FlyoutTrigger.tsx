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
		onBlur: handleBlur,
		ref: triggerElRef,
	};

	if (triggerType === "click") {
		childrenAttributes.onClick = handleClick;
	}

	if (triggerType === "hover") {
		childrenAttributes.onMouseEnter = handleMouseEnter;
		childrenAttributes.onMouseLeave = handleMouseLeave;
	}

	if ((triggerType === "hover" && trapFocusMode !== "action-menu") || triggerType === "focus") {
		childrenAttributes.onFocus = handleFocus;
		childrenAttributes["aria-describedby"] = id;
	}

	if (triggerType === "click" || triggerType === "focus" || trapFocusMode === "action-menu") {
		if (trapFocusMode === "dialog") {
			childrenAttributes["aria-haspopup"] = "dialog";
		} else if (trapFocusMode === "selection-menu") {
			childrenAttributes["aria-haspopup"] = "listbox";
			childrenAttributes["aria-autocomplete"] = "list";
		} else {
			childrenAttributes["aria-haspopup"] = "menu";
		}

		childrenAttributes["aria-expanded"] = flyout.status !== "idle";
		childrenAttributes["aria-controls"] = flyout.status !== "idle" ? id : undefined;
	}

	return <>{children(childrenAttributes as T.TriggerAttributes)}</>;
};

export default FlyoutTrigger;
