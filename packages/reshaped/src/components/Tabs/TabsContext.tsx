"use client";

import React from "react";

import type * as T from "./Tabs.types";

const Context = React.createContext({} as T.Context);

export const TabsProvider = Context.Provider;

export const useTabs = (value?: string) => {
	const { id, hasPanel, ...data } = React.useContext(Context);
	const hasValue = value !== undefined;

	return {
		...data,
		panelId: hasValue && hasPanel(value) ? `${id}-tabs-panel-${value}` : undefined,
		buttonId: hasValue && hasPanel(value) ? `${id}-tabs-button-${value}` : undefined,
	};
};
