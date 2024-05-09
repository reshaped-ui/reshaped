import type * as T from "themes/_generator/types";
import type { FullThemeDefinition, ColorHue } from "themes/_generator/tokens/types";
import type {
	GeneratedOnName as GeneratedOnColorName,
	GeneratedRGBName as GeneratedRGBColorName,
} from "themes/_generator/tokens/color/color.types";
import { hexToRgb, getOnColor } from "./color";
import { bgWithDynamicForeground } from "../constants";
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
		const generateOnColorsFor = [
			...bgWithDynamicForeground,
			...(themeOptions?.generateOnColorsFor || []),
		];
		const needsDynamicForeground = generateOnColorsFor.includes(tokenName);
		const needsRGB =
			tokenName.startsWith("background") ||
			tokenName.endsWith("black") ||
			tokenName.endsWith("white");

		if (!bgToken) return;

		if (needsDynamicForeground) {
			const overrideKeys =
				themeOptions?.onColorValues && (Object.keys(themeOptions?.onColorValues) as ColorHue[]);
			const onColorKey =
				overrideKeys && overrideKeys.find((key) => tokenName.toLowerCase().includes(key));

			const onColorHexMap = {
				lightHexColor:
					(onColorKey && themeOptions?.onColorValues?.[onColorKey]?.hexLight) ||
					definition?.color?.white?.hex,
				darkHexColor:
					(onColorKey && themeOptions?.onColorValues?.[onColorKey]?.hexDark) ||
					definition?.color?.black?.hex,
			};

			const hex = getOnColor({
				bgHexColor: bgToken.hex!,
				// mode: "light",
				...onColorHexMap,
			});

			const hexDark = getOnColor({
				bgHexColor: bgToken.hexDark || bgToken.hex!,
				// mode: "dark",
				...onColorHexMap,
			});

			// eslint-disable-next-line no-param-reassign
			definition.color![generatedForegroundName] = {
				hex,
				hexDark: hex !== hexDark ? hexDark : undefined,
			};
		}

		if (needsRGB) {
			const rgb = hexToRgb(bgToken.hex!);
			const rgbDark = bgToken.hexDark && hexToRgb(bgToken.hexDark);
			// eslint-disable-next-line no-param-reassign
			definition.color![generatedRGBName] = {
				hex: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
				hexDark: rgbDark && `${rgbDark.r}, ${rgbDark.g}, ${rgbDark.b}`,
			};
		}
	});
};

export default generateBackgroundColors;
