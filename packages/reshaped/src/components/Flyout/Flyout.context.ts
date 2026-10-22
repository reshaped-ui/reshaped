"use client";

import React from "react";

import type * as T from "./Flyout.types";

const FlyoutContext = React.createContext({} as T.ContextProps);
const FlyoutTriggerContext = React.createContext<T.TriggerContextProps | null>(null);
const FlyoutContentContext = React.createContext<T.ContentContextProps | null>(null);
/**
 * Element that opens the flyout with a right click without being its trigger, used by ContextMenu
 */
const FlyoutOriginContext = React.createContext<T.OriginContextProps | null>(null);

const useFlyoutContext = () => React.useContext(FlyoutContext);
const useFlyoutTriggerContext = () => React.useContext(FlyoutTriggerContext);
const useFlyoutContentContext = () => React.useContext(FlyoutContentContext);
const useFlyoutOriginContext = () => React.useContext(FlyoutOriginContext);
const Provider = FlyoutContext.Provider;
const TriggerProvider = FlyoutTriggerContext.Provider;
const ContentProvider = FlyoutContentContext.Provider;
const OriginProvider = FlyoutOriginContext.Provider;

export {
	ContentProvider,
	OriginProvider,
	Provider,
	TriggerProvider,
	useFlyoutContentContext,
	useFlyoutContext,
	useFlyoutOriginContext,
	useFlyoutTriggerContext,
};
export default FlyoutContext;
