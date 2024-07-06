import type { PartialThemeDefinition, ColorHue } from "themes/_generator/tokens/types";

export type ReshapedConfig = {
	themes?: Record<string, PartialThemeDefinition>;
	themeFragments?: Record<string, PartialThemeDefinition>;
	themeOptions?: {
		generateOnColorsFor?: string[];
		onColorValues?: {
			[key in ColorHue]?: {
				hexDark: string;
				hexLight: string;
			};
		};
	};
};
