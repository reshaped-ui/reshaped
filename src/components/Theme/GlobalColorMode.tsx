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
		document.documentElement.setAttribute("data-rs-color-mode", targetMode);
		setMode((prevMode) => {
			if (prevMode !== targetMode) {
				// Avoid components styles animating when switching to another color mode
				disableTransitions();
			}

			return targetMode;
		});
	}, []);

	useIsomorphicLayoutEffect(() => {
		onNextFrame(() => {
			enableTransitions();
		});
	}, [mode]);

	/**
	 * In case color mode was set in html but was not provided to the provider - hydrate the state
	 * This could happen if we're receiving the mode on the client but before React hydration
	 */
	useIsomorphicLayoutEffect(() => {
		const nextColorMode = document.documentElement.getAttribute("data-rs-color-mode") as
			| T.ColorMode
			| undefined;

		if (nextColorMode) changeColorMode(nextColorMode);
	}, []);

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
