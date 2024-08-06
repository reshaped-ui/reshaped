import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import transform from "themes/_generator/transform";
import generateColors from "themes/_generator/utilities/generateColors";

/**
 * Exported types
 */
export type { FullThemeDefinition } from "themes/_generator/tokens/types";
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

export const generateThemeColors = (options: {
	primary: T.Color;
	critical?: T.Color;
	positive?: T.Color;
	neutral?: T.Color;
}) => {
	return generateColors(options);
};

export const getThemeCSS = (
	name: string,
	definition: T.PartialDeep<FullThemeDefinition>,
	options?: T.PublicOptions["themeOptions"]
) => {
	const code = transform(name, definition, { themeOptions: options, isFragment: true });
	return code.variables;
};
