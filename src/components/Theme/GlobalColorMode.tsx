"use client";

import React from "react";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { enableTransitions, disableTransitions, onNextFrame } from "utilities/animation";
import { GlobalColorModeContext } from "./Theme.context";
import type * as T from "./Theme.types";

const GlobalColorMode = (props: T.GlobalColorModeProps) => {
	const { defaultMode, children } = props;
	const [mode, setMode] = React.useState<T.ColorMode>(defaultMode || "light");

	const changeColorMode = React.useCallback((targetMode: T.ColorMode) => {
		setMode((prevMode) => {
			// Avoid components styles animating when switching to another color mode
			if (prevMode !== targetMode) disableTransitions();
			return targetMode;
		});
	}, []);

	useIsomorphicLayoutEffect(() => {
		onNextFrame(() => {
			enableTransitions();
		});
	}, [mode]);

	const value = React.useMemo(
		() => ({
			mode,
			setMode: changeColorMode,
			invertMode: () => {
				changeColorMode(mode === "light" ? "dark" : "light");
			},
		}),
		[mode, changeColorMode]
	);

	return (
		<GlobalColorModeContext.Provider value={value}>{children}</GlobalColorModeContext.Provider>
	);
};

export default GlobalColorMode;
