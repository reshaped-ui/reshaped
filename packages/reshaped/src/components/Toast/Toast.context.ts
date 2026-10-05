"use client";

import React from "react";

import { defaultContextData } from "./Toast.constants.js";
import type * as T from "./Toast.types.js";

const context = React.createContext<T.Context>(defaultContextData);

export default context;
