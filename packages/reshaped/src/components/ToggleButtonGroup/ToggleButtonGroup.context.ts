"use client";

import React from "react";

import type * as T from "./ToggleButtonGroup.types.js";

const ToggleButtonGroupContext = React.createContext<T.Context | null>(null);

export const useToggleButtonGroup = () => React.useContext(ToggleButtonGroupContext);
export default ToggleButtonGroupContext;
