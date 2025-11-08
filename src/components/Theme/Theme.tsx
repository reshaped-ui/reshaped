"use client";

import React from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { classNames } from "utilities/props";

import { ThemeContext } from "./Theme.context";
import s from "./Theme.module.css";
import * as T from "./Theme.types";
import { getRootThemeEl } from "./Theme.utilities";
import { useTheme, useGlobalColorMode } from "./useTheme";

const getThemeAttribute = (theme: NonNullable<T.Props["name"]>) => {
	if (typeof theme === "string") return theme;
	return ` ${theme.join(" ")} `;
};

const Theme: React.FC<T.Props> = (props) => <PrivateTheme {...props} />;

export const PrivateTheme: React.FC<T.PrivateProps> = (props) => {
	const { name, defaultName, colorMode, scoped, scopeRef, children, className } = props;
	const [mounted, setMounted] = React.useState(false);
	const [stateTheme, setStateTheme] = React.useState<T.Props["defaultName"]>(defaultName);
	const globalColorMode = useGlobalColorMode();
	const parentTheme = useTheme();
	const isRootProvider = !parentTheme.theme;
	const usedTheme = name || stateTheme || parentTheme.theme;
	const rootTheme = isRootProvider || scoped ? usedTheme : parentTheme.rootTheme;
	const parentColorMode = isRootProvider || scoped ? globalColorMode.mode : parentTheme.colorMode;
	const invertedColorMode = parentColorMode === "light" ? "dark" : "light";
	const usedColorMode = colorMode === "inverted" ? invertedColorMode : colorMode || parentColorMode;
	const rootClassNames = classNames(s.root, className);

	const setRootTheme: T.ThemeContextData["setRootTheme"] = React.useCallback(
		(theme) => {
			if (isRootProvider) {
				setStateTheme(theme);
			} else {
				parentTheme.setRootTheme(theme);
			}
		},
		[isRootProvider, parentTheme]
	);

	const setTheme: T.ThemeContextData["setTheme"] = React.useCallback((theme) => {
		setStateTheme(theme);
	}, []);

	useIsomorphicLayoutEffect(() => {
		setMounted(true);
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (!document || !isRootProvider) return;
		const themeRootEl = getRootThemeEl(scopeRef?.current);
		const hasColorModeApplied = themeRootEl.getAttribute("data-rs-color-mode");
		const themeAttribute = getThemeAttribute(usedTheme);

		// Checking in case there is no global theme applied
		if (themeAttribute) themeRootEl.setAttribute("data-rs-theme", themeAttribute);
		if (!hasColorModeApplied) themeRootEl.setAttribute("data-rs-color-mode", usedColorMode);

		return () => {
			themeRootEl.removeAttribute("data-rs-theme");
			if (!hasColorModeApplied) themeRootEl.removeAttribute("data-rs-color-mode");
		};
	}, [usedTheme, usedColorMode, isRootProvider, scopeRef]);

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
				ref={scopeRef}
				data-rs-root={scoped ? true : undefined}
				data-rs-theme={isRootProvider ? undefined : getThemeAttribute(usedTheme)}
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

Theme.displayName = "Theme";

export default Theme;
