"use client";

import React from "react";

import type * as T from "./Tabs.types";

const Context = React.createContext({} as T.Context);

export const TabsProvider = Context.Provider;

export const useTabs = (value?: string) => {
	const { id, ...data } = React.useContext(Context);

	return {
		...data,
		panelId: value !== undefined ? `${id}-tabs-panel-${value}` : undefined,
		buttonId: value !== undefined ? `${id}-tabs-button-${value}` : undefined,
	};
};
