"use client";

import React from "react";

import type * as T from "./Select.types";
import SelectCustomControlled from "./SelectCustomControlled";

const SelectCustomUncontrolled: React.FC<T.CustomUncontrolledProps> = (props) => {
	const { defaultValue, onChange, multiple, ...controlledProps } = props;
	const [value, setValue] = React.useState<string | string[]>(defaultValue || (multiple ? [] : ""));

	return (
		// @ts-expect-error -- avoid complicating the types and implementation
		<SelectCustomControlled
			{...controlledProps}
			multiple={multiple}
			value={value}
			// @ts-expect-error -- avoid complicating the types and implementation
			onChange={(args) => {
				setValue(args.value);
				onChange?.(args);
			}}
		/>
	);
};

SelectCustomUncontrolled.displayName = "SelectCustomUncontrolled";

export default SelectCustomUncontrolled;
