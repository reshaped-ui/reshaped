import { capitalize } from "utilities/string";
import type * as TColor from "../color.types";
import type * as T from "../../../types";
import { GeneratedThemeDefinition, PassedThemeDefinition } from "../../types";
import { bgWithDynamicForeground } from "../../../constants";
import { hexToOklch, oklchToRgb, tokenToOklchToken } from "./convert";
import { getOnColor } from "./a11y";

const whiteColor = hexToOklch("#ffffff");
const blackColor = hexToOklch("#000000");

const generateMetaColors = (
	definition: PassedThemeDefinition,
	themeOptions: T.PublicOptions["themeOptions"] = {}
) => {
	if (!definition.color) return;
	const { onColorValues = {}, colorContrastAlgorithm } = themeOptions;
	const result: GeneratedThemeDefinition["color"] = {};

	Object.keys(definition.color).forEach((tokenName) => {
		const bgToken = definition.color?.[tokenName as TColor.Name];
		const generatedForegroundName = `on${capitalize(tokenName)}` as TColor.GeneratedOnName;
		const generatedRGBName = `rgb${capitalize(tokenName)}` as TColor.GeneratedRGBName;
		const generateOnColorsFor = [
			...bgWithDynamicForeground,
			...(themeOptions?.generateOnColorsFor || []),
		];
		const needsDynamicForeground =
			generateOnColorsFor.includes(tokenName) && !definition.color?.[generatedForegroundName];
		const needsRGB =
			tokenName.startsWith("background") ||
			tokenName.endsWith("black") ||
			tokenName.endsWith("white");

		if (!bgToken) return;
		const oklchBgToken = tokenToOklchToken(bgToken);

		if (needsDynamicForeground) {
			const overrideKeys = Object.keys(onColorValues) as TColor.Hue[];
			const onColorKey = overrideKeys.find((key) => tokenName.toLowerCase().includes(key));
			const onColor = onColorKey && onColorValues[onColorKey];
			const lightColor =
				onColor && "hexLight" in onColor
					? hexToOklch(onColor.hexLight)
					: onColor?.oklchLight || whiteColor;
			const darkColor =
				onColor && "hexDark" in onColor
					? hexToOklch(onColor.hexDark)
					: onColor?.oklchDark || blackColor;
			const light = getOnColor({
				bgColor: oklchBgToken.oklch,
				lightColor,
				darkColor,
				algorithm: colorContrastAlgorithm,
			});

			const dark =
				oklchBgToken.oklchDark &&
				getOnColor({
					bgColor: oklchBgToken.oklchDark,
					lightColor,
					darkColor,
					algorithm: colorContrastAlgorithm,
				});

			result[generatedForegroundName] = {
				oklch: light,
				oklchDark: dark,
			};
		}

		if (needsRGB) {
			const rgb = oklchToRgb(oklchBgToken.oklch);
			const rgbDark = oklchBgToken.oklchDark && oklchToRgb(oklchBgToken.oklchDark);

			result[generatedRGBName] = {
				hex: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
				hexDark: rgbDark && `${rgbDark.r}, ${rgbDark.g}, ${rgbDark.b}`,
			};
		}
	});

	return result;
};

export default generateMetaColors;
