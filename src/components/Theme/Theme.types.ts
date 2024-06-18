import React from "react";
import * as G from "types/global";

export type ColorMode = "light" | "dark";

export type GlobalColorModeContextData = {
	mode: ColorMode;
	setMode: (mode: ColorMode) => void;
	invertMode: () => void;
};

export type ThemeContextData = {
	colorMode: ColorMode;
	theme: string;
	setTheme: (theme: string) => void;
	rootTheme: string;
	setRootTheme: (theme: string) => void;
};

export type Props = {
	name?: string;
	defaultName?: string;
	colorMode?: ColorMode | "inverted";
	className?: G.ClassName;
	children?: React.ReactNode;
};

export type GlobalColorModeProps = {
	defaultMode?: ColorMode;
	children?: React.ReactNode;
};
