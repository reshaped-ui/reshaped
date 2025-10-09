"use client";

import type * as T from "./ToggleButton.types";
import Button, { ButtonProps } from "components/Button";
import { useToggleButtonGroup } from "components/ToggleButtonGroup";

const ToggleButtonControlled: React.FC<T.ControlledProps> = (props) => {
	const { variant = "outline", value, onChange, onClick, color, ...buttonProps } = props;
	const toggleButtonGroup = useToggleButtonGroup();
	const checked = (value ? toggleButtonGroup?.value?.includes(value) : undefined) ?? props.checked;

	// Determine the color to use based on priority:
	// 1. Individual button color (highest priority)
	// 2. Group selectedColor (when checked/highlighted)
	// 3. Group color (fallback)
	const effectiveColor =
		color || (checked && toggleButtonGroup?.selectedColor) || toggleButtonGroup?.color;

	const handleClick: ButtonProps["onClick"] = (event) => {
		const changeArgs = { checked: !checked, value: value ?? "", event };

		onClick?.(event);

		if (toggleButtonGroup) {
			toggleButtonGroup?.onChange?.(changeArgs);
		} else {
			onChange?.(changeArgs);
		}
	};

	return (
		<Button
			{...buttonProps}
			variant={variant}
			color={effectiveColor}
			onClick={handleClick}
			highlighted={checked}
			attributes={{ ...buttonProps.attributes, "aria-pressed": checked }}
		/>
	);
};

ToggleButtonControlled.displayName = "ToggleButtonControlled";

export default ToggleButtonControlled;
