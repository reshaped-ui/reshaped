import type { HexColor, Hue, OklchColor } from "@/generation/tokens/color/color.types";
import type { PassedThemeDefinition } from "@/generation/tokens/types";

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
