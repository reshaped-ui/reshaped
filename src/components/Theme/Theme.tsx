"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { ThemeContext } from "./Theme.context";
import { useTheme, useGlobalColorMode } from "./useTheme";
import * as T from "./Theme.types";
import s from "./Theme.module.css";

const Theme = (props: T.Props) => {
	const { name, defaultName, colorMode, children, className } = props;
	const [mounted, setMounted] = React.useState(false);
	const [stateTheme, setStateTheme] = React.useState(defaultName);
	const globalColorMode = useGlobalColorMode();
	const parentTheme = useTheme();
	const isRootProvider = !parentTheme.theme;
	const usedTheme = name || stateTheme || parentTheme.theme;
	const parentColorMode = isRootProvider ? globalColorMode : parentTheme.colorMode;
	const invertedColorMode = parentColorMode === "light" ? "dark" : "light";
	const usedColorMode = colorMode === "inverted" ? invertedColorMode : colorMode || parentColorMode;
	const rootClassNames = classNames(s.root, className);

	const setTheme = (theme: string) => {
		setStateTheme(theme);
	};

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (!document || !isRootProvider) return;
		const hasColorModeApplied = document.documentElement.getAttribute("data-rs-color-mode");

		document.documentElement.setAttribute("data-rs-theme", usedTheme);
		if (!hasColorModeApplied) {
			document.documentElement.setAttribute("data-rs-color-mode", usedColorMode);
		}

		return () => {
			document.documentElement.removeAttribute("data-rs-theme");
			if (!hasColorModeApplied) {
				document.documentElement.removeAttribute("data-rs-color-mode");
			}
		};
	}, [usedTheme, usedColorMode, isRootProvider]);

	return (
		<ThemeContext.Provider
			value={{
				theme: usedTheme,
				colorMode: usedColorMode,
				setTheme,
			}}
		>
			<div
				className={rootClassNames}
				data-rs-theme={isRootProvider ? undefined : usedTheme}
				/**
				 * Root provider uses theme and color mode from <html>
				 */
				data-rs-color-mode={isRootProvider || (!colorMode && !mounted) ? undefined : usedColorMode}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export default Theme;
