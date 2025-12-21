"use client";

import React from "react";

import NumberFieldControlled from "./NumberFieldControlled";

import type * as T from "./NumberField.types";

const NumberFieldUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue ?? null);

	const handleChange: T.Props["onChange"] = (args) => {
		setValue(args.value);
		if (onChange) onChange(args);
	};

	return (
		<NumberFieldControlled
			{...props}
			value={value}
			defaultValue={undefined}
			onChange={handleChange}
		/>
	);
};

NumberFieldUncontrolled.displayName = "NumberFieldUncontrolled";

export default NumberFieldUncontrolled;
