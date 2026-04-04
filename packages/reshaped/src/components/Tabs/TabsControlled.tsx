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
	const [registeredPanels, setRegisteredPanels] = React.useState<Record<string, boolean>>({});
	const [selection, setSelection] = React.useState<T.SelectionState>({
		scaleX: 0,
		scaleY: 0,
		left: 0,
		top: 0,
		status: "idle",
	});

	const registerPanel = React.useCallback((panelValue: string) => {
		setRegisteredPanels((prev) => ({ ...prev, [panelValue]: true }));
	}, []);

	const unregisterPanel = React.useCallback((panelValue: string) => {
		setRegisteredPanels((prev) => ({ ...prev, [panelValue]: false }));
	}, []);

	const hasPanel = React.useCallback(
		(panelValue: string) => registeredPanels[panelValue],
		[registeredPanels]
	);

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
				registerPanel,
				unregisterPanel,
				hasPanel,
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
