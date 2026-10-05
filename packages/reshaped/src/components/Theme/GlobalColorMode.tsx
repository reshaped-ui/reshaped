"use client";

import React from "react";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect.js";
import { disableTransitions, enableTransitions, onNextFrame } from "@/utilities/animation.js";
import type * as G from "@/types/global.js";
import { GlobalColorModeContext } from "./Theme.context.js";
import type * as T from "./Theme.types.js";
import { getRootThemeEl } from "./Theme.utilities.js";
import { useGlobalColorMode } from "./useTheme.js";

const GlobalColorMode: React.FC<T.GlobalColorModeProps> = (props) => {
	const { defaultMode, mode: passedMode, scopeRef, children } = props;
	const [mode, setMode] = React.useState<G.ColorMode>(defaultMode);
	const parentGlobalColorMode = useGlobalColorMode();

	const changeColorMode = React.useCallback(
		(targetMode: G.ColorMode) => {
			getRootThemeEl(scopeRef?.current).setAttribute("data-rs-color-mode", targetMode);

			if (parentGlobalColorMode.mode && !scopeRef) {
				parentGlobalColorMode.setMode(targetMode);
			}

			setMode(targetMode);
		},
		[scopeRef, parentGlobalColorMode]
	);

	useIsomorphicLayoutEffect(() => {
		disableTransitions();

		onNextFrame(() => {
			enableTransitions();
		});
	}, [mode, passedMode]);

	/**
	 * In case color mode was set in html but was not provided to the provider - hydrate the state
	 * This could happen if we're receiving the mode on the client but before React hydration
	 */
	useIsomorphicLayoutEffect(() => {
		const nextColorMode = getRootThemeEl(scopeRef?.current).getAttribute("data-rs-color-mode") as
			| G.ColorMode
			| undefined;

		if (nextColorMode) changeColorMode(nextColorMode);
	}, [changeColorMode, scopeRef]);

	const value = React.useMemo(
		() => ({
			mode: passedMode || mode,
			setMode: changeColorMode,
			invertMode: () => {
				changeColorMode(mode === "light" ? "dark" : "light");
			},
		}),
		[mode, passedMode, changeColorMode]
	);

	return (
		<GlobalColorModeContext.Provider value={value}>{children}</GlobalColorModeContext.Provider>
	);
};

GlobalColorMode.displayName = "GlobalColorMode";

export default GlobalColorMode;
