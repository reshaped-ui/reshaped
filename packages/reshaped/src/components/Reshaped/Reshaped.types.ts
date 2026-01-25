import type { GlobalColorModeProps, ThemeProps } from "components/Theme";
import type { ToastProviderProps } from "components/Toast";
import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Theme of the application, enables controlled mode */
	theme?: NonNullable<ThemeProps["name"]>;
	/** Default theme of the application, enables uncontrolled mode */
	defaultTheme?: NonNullable<ThemeProps["defaultName"]>;
	/** Default content direction of the application */
	defaultRTL?: boolean;
	/** Color mode of the application, enables controlled mode */
	colorMode?: GlobalColorModeProps["mode"];
	/** Default color mode of the application, enables uncontrolled mode */
	defaultColorMode?: GlobalColorModeProps["defaultMode"];
	/** Default viewport size of the application */
	defaultViewport?: G.Viewport;
	/** Global options for the ToastProvider */
	toastOptions?: ToastProviderProps["options"];
	/** Enable scoped mode for applications not using Reshaped provider at the application root */
	scoped?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
