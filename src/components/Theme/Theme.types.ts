import React from "react";

import * as G from "types/global";

export type GlobalColorModeContextData = {
	mode: G.ColorMode;
	setMode: (mode: G.ColorMode) => void;
	invertMode: () => void;
};

export type ThemeContextData = {
	colorMode: G.ColorMode;
	theme: G.Theme;
	setTheme: (theme: G.Theme) => void;
	rootTheme: G.Theme;
	setRootTheme: (theme: G.Theme) => void;
};

export type Props = {
	/** Name of the theme to use, enables controlled mode */
	name?: G.Theme;
	/** Default name of the theme to use, enables uncontrolled mode */
	defaultName?: G.Theme;
	/** Color mode to use */
	colorMode?: G.ColorMode | "inverted";
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type PrivateProps = Props & {
	scoped?: boolean;
	scopeRef?: React.RefObject<HTMLDivElement | null>;
};

export type GlobalColorModeProps = {
	mode?: G.ColorMode;
	defaultMode: G.ColorMode;
	scopeRef?: React.RefObject<HTMLDivElement | null>;
	children?: React.ReactNode;
};
