"use client";

import React from "react";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { enableTransitions, disableTransitions, onNextFrame } from "utilities/animation";
import { GlobalColorModeContext } from "./Theme.context";
import type * as T from "./Theme.types";

const GlobalColorMode = (props: T.GlobalColorModeProps) => {
	const { defaultMode, children } = props;
	const [mode, setMode] = React.useState<T.ColorMode>(defaultMode || "light");

	useIsomorphicLayoutEffect(() => {
		// Avoid components styles animating when switching to another color mode
		disableTransitions();
		document.documentElement.setAttribute("data-rs-color-mode", mode);

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

		if (nextColorMode) setMode(nextColorMode);
	}, []);

	const value = React.useMemo(
		() => ({
			mode,
			setMode,
			invertMode: () => {
				setMode(mode === "light" ? "dark" : "light");
			},
		}),
		[mode]
	);

	return (
		<GlobalColorModeContext.Provider value={value}>{children}</GlobalColorModeContext.Provider>
	);
};

export default GlobalColorMode;
