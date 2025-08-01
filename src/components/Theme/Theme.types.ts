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
	name?: G.Theme;
	defaultName?: G.Theme;
	colorMode?: G.ColorMode | "inverted";
	className?: G.ClassName;
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
