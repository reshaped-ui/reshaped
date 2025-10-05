"use client";

import React from "react";
import SelectCustomControlled from "./SelectCustomControlled";
import type * as T from "./Select.types";

const SelectCustomUncontrolled: React.FC<T.CustomUncontrolledProps> = (props) => {
	const { defaultValue, onChange, ...controlledProps } = props;
	const [value, setValue] = React.useState(defaultValue || "");

	const handleChange: T.CustomControlledProps["onChange"] = (args) => {
		setValue(args.value);
		onChange?.(args);
	};

	return <SelectCustomControlled {...controlledProps} value={value} onChange={handleChange} />;
};

SelectCustomUncontrolled.displayName = "SelectCustomUncontrolled";

export default SelectCustomUncontrolled;
