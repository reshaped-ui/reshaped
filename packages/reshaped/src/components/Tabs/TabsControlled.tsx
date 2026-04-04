"use client";

import React from "react";

import useElementId from "@/hooks/useElementId";
import type * as T from "./Tabs.types";
import { TabsProvider } from "./TabsContext";

const TabsControlled: React.FC<T.ControlledProps> = (props) => {
	const {
		children,
		value,
		onChange,
		itemWidth,
		variant,
		name,
		disableSelectionAnimation,
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
				elActiveRef,
				elPrevActiveRef,
				elScrollableRef,
				selection,
				setSelection,
				disableSelectionAnimation,
			}}
		>
			{children}
		</TabsProvider>
	);
};

TabsControlled.displayName = "TabsControlled";

export default TabsControlled;
