import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { GlobalColorModeProps, ThemeProps } from "@/components/Theme";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Theme of the application, a theme name or an array of names to combine. Its css has to be imported separately.
	 * Enables controlled mode, where `setTheme` from the useTheme hook has no effect
	 */
	theme?: NonNullable<ThemeProps["name"]>;
	/** Default theme of the application, enables uncontrolled mode
	 * where it can be changed with `setTheme` from the useTheme hook
	 * @default "slate"
	 */
	defaultTheme?: NonNullable<ThemeProps["defaultName"]>;
	/** Default content direction of the application, applied as the `dir` attribute of the html element
	 * and can be changed with the useRTL hook. When not passed, `dir` is set to "ltr"
	 */
	defaultRTL?: boolean;
	/** Color mode of the application, enables controlled mode */
	colorMode?: GlobalColorModeProps["mode"];
	/** Default color mode of the application, enables uncontrolled mode where it can be changed with the useTheme hook.
	 * A `data-rs-color-mode` attribute already set on the html element takes priority over it
	 * @default "light"
	 */
	defaultColorMode?: GlobalColorModeProps["defaultMode"];
	/** Viewport size to use until the actual one is detected in the browser, e.g. during server-side rendering.
	 * Used by the hooks resolving responsive values in JavaScript, like useResponsiveClientValue
	 * @default "s"
	 */
	defaultViewport?: G.Viewport;
	/** Enable scoped mode for applications not using Reshaped provider at the application root.
	 * Theme, color mode and css reset are then applied to the provider root element instead of the whole page
	 */
	scoped?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
