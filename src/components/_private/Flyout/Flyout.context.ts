"use client";

import React from "react";
import type * as T from "./Flyout.types";

const FlyoutContext = React.createContext<T.ContextProps>({} as any);

export const useFlyoutContext = () => React.useContext(FlyoutContext);
export const Provider = FlyoutContext.Provider;
export default FlyoutContext;
