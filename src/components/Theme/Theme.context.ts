"use client";

import React from "react";
import type * as T from "./Theme.types";

/* Context used to store data responsible for switching between modes of a theme */
export const ThemeContext = React.createContext<T.ThemeContextData>({
	theme: "",
	rootTheme: "",
	colorMode: "light",
	setTheme: () => {},
	setRootTheme: () => {},
});

/* Context used to globally define mode, used only within the library */
export const GlobalColorModeContext = React.createContext<T.GlobalColorModeContextData>({
	mode: "light",
	setMode: () => {},
	invertMode: () => {},
});
