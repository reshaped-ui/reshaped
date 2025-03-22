"use client";

import type * as T from "./Flyout.types";
import { useFlyoutContext, TriggerProvider } from "./Flyout.context";

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
		handleMouseDown,
		handleTouchStart,
		handleClick,
		trapFocusMode,
		isSubmenu,
	} = useFlyoutContext();

	const childrenAttributes: Partial<T.TriggerAttributes> = {
		ref: triggerElRef,
	};

	if (triggerType === "click" || trapFocusMode === "action-menu") {
		childrenAttributes.onClick = handleClick;
		childrenAttributes.onMouseDown = handleMouseDown;
	}

	if (triggerType === "hover") {
		childrenAttributes.onMouseEnter = handleMouseEnter;
		childrenAttributes.onMouseLeave = handleMouseLeave;
		childrenAttributes.onTouchStart = handleTouchStart;
	}

	// Submenus open on keypress instead of hover
	if ((triggerType === "hover" && !isSubmenu) || triggerType === "focus") {
		childrenAttributes.onFocus = handleFocus;
		childrenAttributes.onBlur = handleBlur;
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

	return (
		<TriggerProvider value={{ elRef: triggerElRef }}>
			{children(childrenAttributes as T.TriggerAttributes)}
		</TriggerProvider>
	);
};

export default FlyoutTrigger;
