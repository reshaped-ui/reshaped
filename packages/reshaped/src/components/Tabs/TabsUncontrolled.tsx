"use client";

import React from "react";

import type * as T from "./Tabs.types";
import TabsControlled from "./TabsControlled";

const TabsUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue);

	const handleChange: T.BaseProps["onChange"] = ({ value }) => {
		setValue(value);
		if (onChange) onChange({ value });
	};

	return (
		<TabsControlled {...props} onChange={handleChange} value={value} defaultValue={undefined} />
	);
};

TabsUncontrolled.displayName = "TabsUncontrolled";

export default TabsUncontrolled;
