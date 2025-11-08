"use client";

import React from "react";

import PinFieldControlled from "./PinFieldControlled";

import type * as T from "./PinField.types";

const PinFieldUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange, ...controlledProps } = props;
	const [value, setValue] = React.useState(defaultValue || "");

	const handleChange: T.Props["onChange"] = (args) => {
		setValue(args.value);
		onChange?.(args);
	};

	return <PinFieldControlled {...controlledProps} value={value} onChange={handleChange} />;
};

PinFieldUncontrolled.displayName = "PinFieldUncontrolled";

export default PinFieldUncontrolled;
