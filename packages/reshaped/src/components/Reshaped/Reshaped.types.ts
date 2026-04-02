import type { GlobalColorModeProps, ThemeProps } from "@/components/Theme";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";
import type { ClassName } from "@reshaped/utilities";
import type React from "react";

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
	/** Enable scoped mode for applications not using Reshaped provider at the application root */
	scoped?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
