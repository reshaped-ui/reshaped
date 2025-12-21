"use client";

import React from "react";

import { defaultContextData } from "./Toast.constants";

import type * as T from "./Toast.types";

const context = React.createContext<T.Context>(defaultContextData);

export default context;
