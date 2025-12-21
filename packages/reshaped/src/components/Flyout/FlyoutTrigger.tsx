"use client";

import { useFlyoutContext, TriggerProvider } from "./Flyout.context";

import type * as T from "./Flyout.types";

const FlyoutTrigger: React.FC<T.TriggerProps> = (props) => {
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
	const active = flyout.status !== "idle";

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
		childrenAttributes["aria-describedby"] = active ? id : undefined;
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

		childrenAttributes["aria-expanded"] = active;
		childrenAttributes["aria-controls"] = active ? id : undefined;
	}

	return (
		<TriggerProvider value={{ elRef: triggerElRef }}>
			{children(childrenAttributes as T.TriggerAttributes)}
		</TriggerProvider>
	);
};

FlyoutTrigger.displayName = "Flyout.Trigger";

export default FlyoutTrigger;
