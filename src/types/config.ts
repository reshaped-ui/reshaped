import type { PassedThemeDefinition } from "themes/_generator/tokens/types";
import type { HexColor, Hue, OklchColor } from "themes/_generator/tokens/color/color.types";

export type ReshapedConfig = {
	themes?: Record<string, PassedThemeDefinition>;
	themeFragments?: Record<string, PassedThemeDefinition>;
	themeOptions?: {
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
