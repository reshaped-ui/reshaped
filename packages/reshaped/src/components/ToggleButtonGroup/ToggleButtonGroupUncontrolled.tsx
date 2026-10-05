"use client";

import React from "react";

import type * as T from "./ToggleButtonGroup.types.js";
import ToggleButtonGroupControlled from "./ToggleButtonGroupControlled.js";

const ToggleButtonGroupUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue || []);

	const handleChange: T.Props["onChange"] = (args) => {
		if (!args.value) return;

		setValue(args.value);
		if (onChange) onChange(args);
	};

	return (
		<ToggleButtonGroupControlled
			{...props}
			value={value}
			defaultValue={undefined}
			onChange={handleChange}
		/>
	);
};

ToggleButtonGroupUncontrolled.displayName = "ToggleButtonGroupUncontrolled";

export default ToggleButtonGroupUncontrolled;
