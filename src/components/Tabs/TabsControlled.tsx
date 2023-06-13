"use client";

import React from "react";
import useElementId from "hooks/useElementId";
import { TabsProvider } from "./TabsContext";
import type * as T from "./Tabs.types";

const TabsControlled = (props: T.PrivateControlledProps) => {
	const {
		children,
		value,
		onChange,
		onSilentChange,
		itemWidth,
		variant,
		name,
		direction = "row",
		size = "medium",
	} = props;
	const id = useElementId();

	const setDefaultValue = (value: string) => {
		if (value === undefined) return;
		if (onSilentChange) onSilentChange({ value, name });
	};

	return (
		<TabsProvider
			value={{ value, name, size, direction, itemWidth, variant, onChange, id, setDefaultValue }}
		>
			{children}
		</TabsProvider>
	);
};

export default TabsControlled;
