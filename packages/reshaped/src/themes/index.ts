import transform from "themes/_generator/transform";

import type { PassedThemeDefinition } from "themes/_generator/tokens/types";
import type * as T from "themes/_generator/types";

/**
 * Exported types
 */
export type { ThemeDefinition } from "themes/_generator/tokens/types";
export type { Name as ColorTokenName } from "themes/_generator/tokens/color/color.types";
export type { Name as DurationTokenName } from "themes/_generator/tokens/duration/duration.types";
export type { Name as EasingTokenName } from "themes/_generator/tokens/easing/easing.types";
export type { Name as FontTokenName } from "themes/_generator/tokens/font/font.types";
export type { Name as FontFamilyTokenName } from "themes/_generator/tokens/fontFamily/fontFamily.types";
export type { Name as FontWeightTokenName } from "themes/_generator/tokens/fontWeight/fontWeight.types";
export type { Name as RadiusTokenName } from "themes/_generator/tokens/radius/radius.types";
export type { Name as ShadowTokenName } from "themes/_generator/tokens/shadow/shadow.types";
export type { GeneratedName as UnitTokenName } from "themes/_generator/tokens/unit/unit.types";
export type { Name as ViewportTokenName } from "themes/_generator/tokens/viewport/viewport.types";

/**
 * Exported runtime code
 */
export { default as baseThemeDefinition } from "themes/_generator/definitions/reshaped";
export { default as generateThemeColors } from "themes/_generator/tokens/color/utilities/generateColors";
export { default as transform } from "themes/_generator/transform";

export const getThemeCSS = (
	name: string,
	definition: PassedThemeDefinition,
	options?: T.PublicOptions["themeOptions"]
) => {
	const code = transform(name, definition, { themeOptions: options, isFragment: true });
	return code.variables;
};
