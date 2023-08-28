import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import type {
	GeneratedOnName as GeneratedOnColorName,
	GeneratedRGBName as GeneratedRGBColorName,
} from "themes/_generator/tokens/color/color.types";
import { getOnColor, hexToRgbString } from "utilities/color";
import { capitalize } from "utilities/string";

const generateBackgroundColors = (
	definition: T.PartialDeep<FullThemeDefinition>,
	themeOptions?: T.PublicOptions["themeOptions"]
) => {
	if (!definition.color) return;

	Object.keys(definition.color).forEach((tokenName) => {
		const bgToken = definition.color?.[tokenName];
		const generatedForegroundName = `on${capitalize(tokenName)}` as GeneratedOnColorName;
		const generatedRGBName = `rgb${capitalize(tokenName)}` as GeneratedRGBColorName;
		const needsDynamicForeground = themeOptions?.generateOnColorsFor?.includes(tokenName);
		const needsRGB =
			tokenName.startsWith("background") ||
			tokenName.endsWith("black") ||
			tokenName.endsWith("white");

		if (!bgToken) return;

		if (needsDynamicForeground) {
			const hex = getOnColor({
				bgHexColor: bgToken.hex!,
				mode: "light",
				lightHexColor: definition?.color?.white?.hex,
				darkHexColor: definition?.color?.black?.hex,
			});

			const hexDark = getOnColor({
				bgHexColor: bgToken.hexDark || bgToken.hex!,
				mode: "dark",
				lightHexColor: definition?.color?.white?.hex,
				darkHexColor: definition?.color?.black?.hex,
			});

			// eslint-disable-next-line no-param-reassign
			definition.color![generatedForegroundName] = {
				hex,
				hexDark: hex !== hexDark ? hexDark : undefined,
			};
		}

		if (needsRGB) {
			// eslint-disable-next-line no-param-reassign
			definition.color![generatedRGBName] = {
				hex: hexToRgbString(bgToken.hex!),
				hexDark: bgToken.hexDark && hexToRgbString(bgToken.hexDark),
			};
		}
	});
};

export default generateBackgroundColors;
