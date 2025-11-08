"use client";

import React from "react";

import type * as T from "./CheckboxGroup.types";

const CheckboxContext = React.createContext<T.Context | null>(null);

export const useCheckboxGroup = () => React.useContext(CheckboxContext);
export default CheckboxContext;
