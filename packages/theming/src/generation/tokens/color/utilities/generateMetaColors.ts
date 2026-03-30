import { capitalize } from "@/utilities/string";

import { PassedThemeDefinition } from "../../types";
import { bgWithDynamicForeground } from "../color.constants";

import { getOnColor } from "./a11y";
import { hexToOklch, tokenToOklchToken } from "./convert";

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
		const generateOnColorsFor = [
			...bgWithDynamicForeground,
			...(themeOptions?.generateOnColorsFor || []),
		];
		const needsDynamicForeground =
			generateOnColorsFor.includes(tokenName) && !definition.color?.[generatedForegroundName];

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
	});

	return result;
};

export default generateMetaColors;
