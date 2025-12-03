"use client";

import React from "react";

import CheckboxGroupControlled from "./CheckboxGroupControlled";

import type * as T from "./CheckboxGroup.types";

const CheckboxGroupUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue || []);

	const handleChange: T.Props["onChange"] = (args) => {
		if (!args.value) return;

		setValue(args.value);
		if (onChange) onChange(args);
	};

	return (
		<CheckboxGroupControlled
			{...props}
			value={value}
			defaultValue={undefined}
			onChange={handleChange}
		/>
	);
};

CheckboxGroupUncontrolled.displayName = "CheckboxGroupUncontrolled";

export default CheckboxGroupUncontrolled;
