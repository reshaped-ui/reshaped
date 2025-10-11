"use client";

import type * as T from "./ToggleButton.types";
import Button, { ButtonProps } from "components/Button";
import { useToggleButtonGroup } from "components/ToggleButtonGroup";

const ToggleButtonControlled: React.FC<T.ControlledProps> = (props) => {
	const { variant = "outline", value, onChange, onClick, ...buttonProps } = props;
	const toggleButtonGroup = useToggleButtonGroup();
	const checked = (value ? toggleButtonGroup?.value?.includes(value) : undefined) ?? props.checked;

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
			onClick={handleClick}
			highlighted={checked}
			attributes={{
				...buttonProps.attributes,
				"aria-pressed": checked,
				tabIndex: toggleButtonGroup?.value?.length ? (checked ? 0 : -1) : undefined,
			}}
		/>
	);
};

ToggleButtonControlled.displayName = "ToggleButtonControlled";

export default ToggleButtonControlled;
