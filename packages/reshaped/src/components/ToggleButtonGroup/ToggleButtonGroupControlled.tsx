"use client";

import React from "react";

import Button from "components/Button";
import useKeyboardArrowNavigation from "hooks/useKeyboardArrowNavigation";

import Context from "./ToggleButtonGroup.context";

import type * as T from "./ToggleButtonGroup.types";

const ToggleButtonGroupControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		onChange,
		value,
		selectionMode = "single",
		children,
		color,
		selectedColor,
		...buttonGroupProps
	} = props;
	const rootRef = React.useRef<HTMLDivElement>(null);

	const handleChange: T.Context["onChange"] = (args) => {
		const { event, value: itemValue, checked } = args;
		if (!itemValue) return;

		let nextValue = selectionMode === "single" ? [itemValue] : [...value];

		if (selectionMode === "multiple") {
			if (checked) {
				nextValue.push(itemValue);
			} else {
				nextValue = nextValue.filter((v) => v !== itemValue);
			}
		}

		if (onChange) onChange({ value: nextValue, event });
	};

	useKeyboardArrowNavigation({
		ref: rootRef,
	});

	return (
		<Context.Provider value={{ onChange: handleChange, value, selectedColor, color }}>
			<Button.Group
				{...buttonGroupProps}
				attributes={{ ref: rootRef, ...buttonGroupProps?.attributes }}
			>
				{children}
			</Button.Group>
		</Context.Provider>
	);
};

ToggleButtonGroupControlled.displayName = "ToggleButtonGroupControlled";

export default ToggleButtonGroupControlled;
