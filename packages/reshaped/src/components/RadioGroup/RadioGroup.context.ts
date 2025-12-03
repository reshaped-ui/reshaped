"use client";

import React from "react";

import type * as T from "./RadioGroup.types";

const RadioContext = React.createContext<T.Context | null>(null);

export const useRadioGroup = () => React.useContext(RadioContext);
export default RadioContext;
