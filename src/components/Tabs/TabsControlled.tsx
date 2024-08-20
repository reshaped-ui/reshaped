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
	const elActiveRef = React.useRef<HTMLDivElement>(null);
	const elPrevActiveRef = React.useRef<HTMLDivElement>(elActiveRef.current);
	const elScrollableRef = React.useRef<HTMLDivElement>(null);
	const [selection, setSelection] = React.useState<T.SelectionState>({
		scaleX: 0,
		scaleY: 0,
		left: 0,
		top: 0,
		status: "idle",
	});

	const setDefaultValue = (value: string) => {
		if (value === undefined) return;
		if (onSilentChange) onSilentChange({ value, name });
	};

	return (
		<TabsProvider
			value={{
				value,
				name,
				size,
				direction,
				itemWidth,
				variant,
				onChange,
				id,
				setDefaultValue,
				elActiveRef,
				elPrevActiveRef,
				elScrollableRef,
				selection,
				setSelection,
			}}
		>
			{children}
		</TabsProvider>
	);
};

export default TabsControlled;
