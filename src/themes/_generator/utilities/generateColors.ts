import type { ThemeDefinition } from "../tokens/types";
import type { Color } from "../types";
import {
	parseHex,
	convertOklabToOkhsl,
	convertLrgbToOklab,
	convertRgbToLrgb,
	convertOkhslToOklab,
	convertOklabToLrgb,
	convertLrgbToRgb,
	type Okhsl,
	type Rgb,
	serializeHex,
	serializeHex8,
} from "culori/fn";

const hexToOkHsl = (hex: string) => {
	const rgb = parseHex(hex) as Rgb;

	if (!rgb) throw new Error(`Can\'t generate rgb from ${hex} color`);

	const lrgb = convertRgbToLrgb(rgb);
	const oklab = convertLrgbToOklab(lrgb);
	const okhsl = convertOklabToOkhsl(oklab);

	return okhsl;
};

const okhslToHex = (okhsl: Okhsl) => {
	const oklab = convertOkhslToOklab(okhsl);
	const lrgb = convertOklabToLrgb(oklab);
	const rgb = convertLrgbToRgb(lrgb);
	return !okhsl.alpha || okhsl.alpha === 1 ? serializeHex(rgb) : serializeHex8(rgb);
};

const getDarkModeColor = (hsl: Okhsl) => {
	const { l } = hsl;

	const mid = 0.5;
	const lDelta = 1 - (l - mid) / (1 - mid);

	return { ...hsl, l: l < mid ? l : 1 - l * lDelta };
};

const generateColorValues = (args: { key: string; hex: string; hexDark?: string }) => {
	const { key, hex, hexDark } = args;
	const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

	const okhsl = hexToOkHsl(hex);

	/**
	 * Calculate hue perceptual lighness (yellow, cyan, )
	 */
	const hueStep = 120;
	const normalizedHue = ((okhsl.h! + 150) % 360) / 360;
	const hueLightness = Math.cos((2 * Math.PI) / hueStep) * normalizedHue;

	const okhslDark =
		key === "neutral"
			? { ...okhsl, l: 1 - okhsl.l + 0.16, s: 0.1 }
			: (hexDark && hexToOkHsl(hexDark)) || getDarkModeColor(okhsl);

	/**
	 * Background
	 */
	const bgHex = hex;
	const bgHexDark = okhslToHex(okhslDark);

	const bgFadedHsl = { ...okhsl, l: 0.94 + 0.045 * hueLightness };
	const bgFadedHslDark = { ...okhslDark, l: 0.16, s: okhslDark.s / 2 };
	const bgFadedHex = okhslToHex(bgFadedHsl);
	const bgFadedHexDark = okhslToHex(bgFadedHslDark);

	const bgHighlightedHex = okhslToHex({ ...okhsl, l: okhsl.l - 0.04 });
	const bgHighlightedHexDark = okhslToHex({ ...okhslDark, l: okhslDark.l + 0.04 });

	/**
	 * Foreground
	 */

	const fgOkhsl = key === "neutral" ? { ...okhsl, l: 0.2 } : { ...okhsl, l: 0.45 };
	// Lighter colors need smaller lightness increase for fg colors
	const fgDarkLDelta = 0.16 / (1 + Math.max(0, okhslDark.l - 0.5));
	const fgOkhslDark =
		key === "neutral"
			? { ...okhsl, l: 0.96 }
			: { ...okhslDark, l: okhslDark.l + fgDarkLDelta, s: 0.7 };
	const fgHex = okhslToHex(fgOkhsl);
	const fgHexDark = okhslToHex(fgOkhslDark);

	/**
	 * Border
	 */
	const bdHex = key === "neutral" ? okhslToHex({ ...fgOkhsl, l: 0, alpha: 0.12 }) : fgHex;
	const bdHexDark =
		key === "neutral" ? okhslToHex({ ...fgOkhslDark, l: 1, alpha: 0.14 }) : fgHexDark;

	const bdFadedHex =
		key === "neutral"
			? okhslToHex({
					...bgFadedHsl,
					l: 0,
					alpha: 0.06,
				})
			: okhslToHex({
					...bgFadedHsl,
					s: 0.6 - 0.2 * hueLightness,
					l: bgFadedHsl.l - 0.05,
				});
	const bdFadedHexDark =
		key === "neutral"
			? okhslToHex({
					...bgFadedHslDark,
					l: 1,
					alpha: 0.09,
				})
			: okhslToHex({
					...bgFadedHslDark,
					l: bgFadedHslDark.l + 0.08,
				});

	const output = {
		[`background${capitalizedKey}`]: {
			hex: bgHex,
			hexDark: bgHexDark,
		},
		[`background${capitalizedKey}Faded`]: {
			hex: bgFadedHex,
			hexDark: bgFadedHexDark,
		},
		[`background${capitalizedKey}Highlighted`]: {
			hex: bgHighlightedHex,
			hexDark: bgHighlightedHexDark,
		},
		[`border${capitalizedKey}`]: {
			hex: bdHex,
			hexDark: bdHexDark,
		},
		[`border${capitalizedKey}Faded`]: {
			hex: bdFadedHex,
			hexDark: bdFadedHexDark,
		},
		[`foreground${capitalizedKey}`]: {
			hex: fgHex,
			hexDark: fgHexDark,
		},
	};

	if (key === "neutral") {
		output[`foreground${capitalizedKey}Faded`] = {
			hex: okhslToHex({ ...fgOkhsl, l: fgOkhsl.l + 0.25 }),
			hexDark: okhslToHex({ ...fgOkhslDark, l: fgOkhslDark.l - 0.15 }),
		};
		output[`backgroundDisabled`] = {
			hex: okhslToHex({ ...okhsl, s: 0.04, l: 0.94 }),
			hexDark: okhslToHex({ ...okhslDark, s: 0.04, l: 0.16 }),
		};
		output[`backgroundDisabledFaded`] = {
			hex: okhslToHex({ ...okhsl, l: 0.97, s: 0.04 }),
			hexDark: okhslToHex({ ...okhslDark, l: 0.12, s: 0.04 }),
		};
		output[`borderDisabled`] = {
			hex: okhslToHex({ ...okhsl, l: 0.9, s: 0.04 }),
			hexDark: okhslToHex({ ...okhslDark, l: 0.17, s: 0.04 }),
		};
		output[`foregroundDisabled`] = {
			hex: okhslToHex({ ...okhsl, l: 0.82, s: 0.04 }),
			hexDark: okhslToHex({ ...okhslDark, l: 0.32, s: 0.04 }),
		};
		output[`backgroundElevationBase`] = {
			hex: "#ffffff",
			hexDark: okhslToHex({ ...okhslDark, s: 0.03, l: 0.1 }),
		};
		output[`backgroundElevationRaised`] = {
			hex: "#ffffff",
			hexDark: okhslToHex({ ...okhslDark, s: 0.04, l: 0.11 }),
		};
		output[`backgroundElevationOverlay`] = {
			hex: "#ffffff",
			hexDark: okhslToHex({ ...okhslDark, s: 0.04, l: 0.13 }),
		};
		output[`backgroundPage`] = {
			hex: "#ffffff",
			hexDark: okhslToHex({ ...okhslDark, l: 0.07, s: 0.02 }),
		};
		output[`backgroundPageFaded`] = {
			hex: okhslToHex({ ...okhsl, l: 0.985 }),
			hexDark: okhslToHex({ ...okhslDark, l: 0.09, s: 0.02 }),
		};
	}

	return output;
};

const validateHexColor = (color: string) => {
	const hexColorRegex = /^#([A-Fa-f0-9]{3}){2}$/;

	if (!hexColorRegex.test(color)) {
		throw new Error(`Invalid hex color: ${color}`);
	}

	return color;
};

const generate = (
	args: {
		primary?: Color;
		critical?: Color;
		warning?: Color;
		positive?: Color;
		neutral?: Color;
		brand?: string;
	} = {}
) => {
	const {
		primary = "#2563eb",
		critical = "#e22c2c",
		warning = "#facc15",
		positive = "#118850",
		neutral = "#e3e4e8",
		brand,
	} = args;

	const generateFor = (key: string, color: Color) => {
		return generateColorValues({
			key,
			hex: validateHexColor(typeof color === "string" ? color : color.hex),
			hexDark: typeof color !== "string" ? validateHexColor(color.hexDark) : undefined,
		});
	};

	return {
		...generateFor("primary", primary),
		...generateFor("critical", critical),
		...generateFor("warning", warning),
		...generateFor("positive", positive),
		...generateFor("neutral", neutral),
		brand: { hex: brand || primary },
		white: { hex: "#ffffff" },
		black: { hex: "#000000" },
	} as ThemeDefinition["color"];
};

export default generate;
