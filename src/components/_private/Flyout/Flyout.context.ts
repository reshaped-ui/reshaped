"use client";

import React from "react";
import type * as T from "./Flyout.types";

const FlyoutContext = React.createContext({} as T.ContextProps);
const FlyoutTriggerContext = React.createContext({} as T.TriggerContextProps);

const useFlyoutContext = () => React.useContext(FlyoutContext);
const useFlyoutTriggerContext = () => React.useContext(FlyoutTriggerContext);
const Provider = FlyoutContext.Provider;
const TriggerProvider = FlyoutTriggerContext.Provider;

export { Provider, TriggerProvider, useFlyoutContext, useFlyoutTriggerContext };
export default FlyoutContext;
