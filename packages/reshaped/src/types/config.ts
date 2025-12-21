import type { HexColor, Hue, OklchColor } from "themes/_generator/tokens/color/color.types";
import type { PassedThemeDefinition } from "themes/_generator/tokens/types";

export type ReshapedConfig = {
	themes?: Record<string, PassedThemeDefinition>;
	themeFragments?: Record<string, PassedThemeDefinition>;
	themeOptions?: {
		colorOutputFormat?: "oklch" | "hex";
		colorContrastAlgorithm?: "wcag" | "apca";
		generateOnColorsFor?: string[];
		onColorValues?: {
			[key in Hue]?:
				| {
						hexDark: HexColor;
						hexLight: HexColor;
				  }
				| {
						oklchDark: OklchColor;
						oklchLight: OklchColor;
				  };
		};
	};
};
