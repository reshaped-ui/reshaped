import transform from "@/generation/transform";

import type { PassedThemeDefinition } from "@/generation/tokens/types";
import type * as T from "@/generation/types";

/**
 * Exported types
 */
export type { ReshapedConfig } from "@/types/config";

export type { ThemeDefinition } from "@/generation/tokens/types";
export type { Name as ColorTokenName } from "@/generation/tokens/color/color.types";
export type { Name as DurationTokenName } from "@/generation/tokens/duration/duration.types";
export type { Name as EasingTokenName } from "@/generation/tokens/easing/easing.types";
export type { Name as FontTokenName } from "@/generation/tokens/font/font.types";
export type { Name as FontFamilyTokenName } from "@/generation/tokens/fontFamily/fontFamily.types";
export type { Name as FontWeightTokenName } from "@/generation/tokens/fontWeight/fontWeight.types";
export type { Name as RadiusTokenName } from "@/generation/tokens/radius/radius.types";
export type { Name as ShadowTokenName } from "@/generation/tokens/shadow/shadow.types";
export type { GeneratedName as UnitTokenName } from "@/generation/tokens/unit/unit.types";
export type { Name as ViewportTokenName } from "@/generation/tokens/viewport/viewport.types";

/**
 * Exported runtime code
 */
export { default as baseThemeDefinition } from "@/generation/definitions/slate";
export { default as generateThemeColors } from "@/generation/tokens/color/utilities/generateColors";
export { default as transform } from "@/generation/transform";

export const getThemeCSS = (
	name: string,
	definition: PassedThemeDefinition,
	options?: T.PublicOptions["themeOptions"]
) => {
	const code = transform(name, definition, { themeOptions: options, isFragment: true });
	return code.variables;
};
