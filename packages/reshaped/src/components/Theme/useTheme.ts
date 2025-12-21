"use client";

import React from "react";

import { ThemeContext, GlobalColorModeContext } from "./Theme.context";

export const useGlobalColorMode = () => {
	return React.useContext(GlobalColorModeContext);
};

export const useTheme = () => {
	const { colorMode, theme, setTheme, rootTheme, setRootTheme } = React.useContext(ThemeContext);
	const { mode, setMode, invertMode } = React.useContext(GlobalColorModeContext);

	return React.useMemo(
		() => ({
			theme,
			setTheme,
			rootTheme,
			setRootTheme,
			colorMode: colorMode || mode,
			setColorMode: setMode,
			invertColorMode: invertMode,
		}),
		[colorMode, mode, setMode, invertMode, theme, setTheme, setRootTheme, rootTheme]
	);
};
