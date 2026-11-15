import React from "react";
import type { ClassName } from "@reshaped/utilities";

import * as G from "@/types/global";

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
	/** Name of the theme to use or an array of names to combine.
	 * Enables controlled mode, where `setTheme` from the useTheme hook has no effect
	 */
	name?: G.Theme;
	/** Default name of the theme to use, enables uncontrolled mode
	 * where it can be changed with `setTheme` from the useTheme hook.
	 * Theme of the parent provider is used when both `name` and `defaultName` are not passed
	 */
	defaultName?: G.Theme;
	/** Color mode to use, "inverted" applies the mode opposite to the one used by the parent.
	 * Color mode of the parent is used when not passed
	 */
	colorMode?: G.ColorMode | "inverted";
	/** Additional classname for the root element */
	className?: ClassName;
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
