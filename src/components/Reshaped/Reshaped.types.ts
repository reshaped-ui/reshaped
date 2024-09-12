import type React from "react";
import type { GlobalColorModeProps, ThemeProps } from "components/Theme";
import type { ToastProviderProps } from "components/Toast";
import type * as G from "types/global";

export type Props = {
	children?: React.ReactNode;
	theme?: NonNullable<ThemeProps["name"]>;
	defaultTheme?: NonNullable<ThemeProps["defaultName"]>;
	defaultRTL?: boolean;
	defaultColorMode?: GlobalColorModeProps["defaultMode"];
	defaultViewport?: G.Viewport;
	toastOptions?: ToastProviderProps["options"];
	scoped?: boolean;
	className?: G.ClassName;
};
