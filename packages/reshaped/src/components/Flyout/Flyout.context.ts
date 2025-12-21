"use client";

import React from "react";

import type * as T from "./Flyout.types";

const FlyoutContext = React.createContext({} as T.ContextProps);
const FlyoutTriggerContext = React.createContext<T.TriggerContextProps | null>(null);
const FlyoutContentContext = React.createContext<T.ContentContextProps | null>(null);

const useFlyoutContext = () => React.useContext(FlyoutContext);
const useFlyoutTriggerContext = () => React.useContext(FlyoutTriggerContext);
const useFlyoutContentContext = () => React.useContext(FlyoutContentContext);
const Provider = FlyoutContext.Provider;
const TriggerProvider = FlyoutTriggerContext.Provider;
const ContentProvider = FlyoutContentContext.Provider;

export {
	Provider,
	TriggerProvider,
	ContentProvider,
	useFlyoutContext,
	useFlyoutTriggerContext,
	useFlyoutContentContext,
};
export default FlyoutContext;
