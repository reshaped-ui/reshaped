"use client";

import React from "react";

import TabsControlled from "./TabsControlled";

import type * as T from "./Tabs.types";

const TabsUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
	const { defaultValue, onChange } = props;
	const [value, setValue] = React.useState(defaultValue);

	const handleChange: T.BaseProps["onChange"] = ({ value }) => {
		setValue(value);
		if (onChange) onChange({ value });
	};

	// Silently handle the default id selection if it's not passed
	const handleSilentChange: T.PrivateControlledProps["onSilentChange"] = ({ value }) => {
		setValue(value);
	};

	return (
		<TabsControlled
			{...props}
			onChange={handleChange}
			onSilentChange={handleSilentChange}
			value={value}
			defaultValue={undefined}
		/>
	);
};

TabsUncontrolled.displayName = "TabsUncontrolled";

export default TabsUncontrolled;
