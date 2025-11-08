import { capitalize } from "utilities/string";

import { bgWithDynamicForeground } from "../../../constants";
import { PassedThemeDefinition } from "../../types";

import { getOnColor } from "./a11y";
import { hexToOklch, oklchToRgb, tokenToOklchToken } from "./convert";

import type * as T from "../../../types";
import type * as TColor from "../color.types";

const whiteColor = hexToOklch("#ffffff");
const blackColor = hexToOklch("#000000");

const generateMetaColors = (
	definition: PassedThemeDefinition,
	themeOptions: T.PublicOptions["themeOptions"] = {}
): PassedThemeDefinition["color"] | undefined => {
	if (!definition.color) return;
	const { onColorValues = {}, colorContrastAlgorithm } = themeOptions;
	const result: PassedThemeDefinition["color"] = {};

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
				lightColor: { ...lightColor, mode: "oklch" },
				darkColor: { ...darkColor, mode: "oklch" },
				algorithm: colorContrastAlgorithm,
			});

			const dark =
				oklchBgToken.oklchDark &&
				getOnColor({
					bgColor: oklchBgToken.oklchDark,
					lightColor: { ...lightColor, mode: "oklch" },
					darkColor: { ...darkColor, mode: "oklch" },
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
				hex: `${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}`,
				hexDark: rgbDark && `${rgbDark.r * 255}, ${rgbDark.g * 255}, ${rgbDark.b * 255}`,
			};
		}
	});

	return result;
};

export default generateMetaColors;
