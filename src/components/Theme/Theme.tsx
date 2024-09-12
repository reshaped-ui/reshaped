"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { ThemeContext } from "./Theme.context";
import { getRootThemeEl } from "./Theme.utilities";
import { useTheme, useGlobalColorMode } from "./useTheme";
import * as T from "./Theme.types";
import s from "./Theme.module.css";

const Theme = (props: T.Props) => <PrivateTheme {...props} />;

export const PrivateTheme = (props: T.PrivateProps) => {
	const { name, defaultName, colorMode, scoped, children, className } = props;
	const [mounted, setMounted] = React.useState(false);
	const [stateTheme, setStateTheme] = React.useState(defaultName);
	const globalColorMode = useGlobalColorMode();
	const parentTheme = useTheme();
	const isRootProvider = !parentTheme.theme;
	const usedTheme = name || stateTheme || parentTheme.theme;
	const rootTheme = isRootProvider ? usedTheme : parentTheme.rootTheme;
	const parentColorMode = isRootProvider ? globalColorMode : parentTheme.colorMode;
	const invertedColorMode = parentColorMode === "light" ? "dark" : "light";
	const usedColorMode = colorMode === "inverted" ? invertedColorMode : colorMode || parentColorMode;
	const rootClassNames = classNames(s.root, className);

	const setRootTheme = React.useCallback(
		(theme: string) => {
			if (isRootProvider) {
				setStateTheme(theme);
			} else {
				parentTheme.setRootTheme(theme);
			}
		},
		[isRootProvider, parentTheme]
	);

	const setTheme = React.useCallback((theme: string) => {
		setStateTheme(theme);
	}, []);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (!document || !isRootProvider) return;
		const themeRootEl = getRootThemeEl();
		const hasColorModeApplied = themeRootEl.getAttribute("data-rs-color-mode");

		themeRootEl.setAttribute("data-rs-theme", usedTheme);
		if (!hasColorModeApplied) themeRootEl.setAttribute("data-rs-color-mode", usedColorMode);

		return () => {
			themeRootEl.removeAttribute("data-rs-theme");
			if (!hasColorModeApplied) themeRootEl.removeAttribute("data-rs-color-mode");
		};
	}, [usedTheme, usedColorMode, isRootProvider]);

	const value = React.useMemo(
		() => ({
			theme: usedTheme,
			rootTheme,
			colorMode: usedColorMode,
			setTheme,
			setRootTheme,
		}),
		[usedTheme, usedColorMode, setTheme, setRootTheme, rootTheme]
	);

	return (
		<ThemeContext.Provider value={value}>
			<div
				className={rootClassNames}
				data-rs-root={scoped ? true : undefined}
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
