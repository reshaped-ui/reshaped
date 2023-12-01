import type { ThemeDefinition } from "../tokens/types";
import {
	hexToHsl,
	hexToHsluv,
	hexToRgb,
	getRgbLuminance,
	getLuminanceDelta,
	getDarkModeLightnessDelta,
	hslToHex,
	hsluvToHex,
	rgbToHex,
	hslToRgb,
} from "./color";

/**
 * Generator
 */

const FG_L_DARK = 62;

const generateColorValues = (args: { key: string; hex: string }) => {
	const { key, hex } = args;
	const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

	const hsl = hexToHsl(hex);
	const rgb = hexToRgb(hex);
	const hsluv = hexToHsluv(hex);
	const luminance = getRgbLuminance(rgb);
	const luminanceDelta = getLuminanceDelta(luminance);
	const darkModeLigthnessDelta = getDarkModeLightnessDelta(hsl.l, luminance);
	const hslDark = { ...hsl, l: hsl.l - darkModeLigthnessDelta };
	const bgHex = hex;
	const bgHexDark = hslToHex(hslDark);
	const hsluvDark = hexToHsluv(bgHexDark);

	const bdHex = hsluvToHex({ ...hsluv, l: hsluv.l - 5 - luminanceDelta });
	const bdHexDark = hsluvToHex({
		...hsluvDark,
		// s: Math.min(hsluvDark.s, 70),
		l: key === "neutral" ? 35 : FG_L_DARK,
	});

	const fgHsluv = { ...hsluv, l: 43 };
	const fgHsluvDark = { ...hsluv, l: key === "neutral" ? 80 : FG_L_DARK };
	const fgHex = hsluvToHex(fgHsluv);
	const fgHexDark = hsluvToHex(fgHsluvDark);

	const bgFadedHex = rgbToHex(hslToRgb({ ...hsl, l: 97 }));
	const bgFadedHsluv = hexToHsluv(bgFadedHex);
	const bgFadedHsluvDark = { ...hsluv, l: 16, s: 32 };
	const bgFadedHexDark = hsluvToHex(bgFadedHsluvDark);

	const fadedLuminance = getRgbLuminance(hexToRgb(bgFadedHex));
	const fadedLuminanceDark = getRgbLuminance(hexToRgb(bgFadedHexDark));
	const fadedLuminanceDeltaDark = getLuminanceDelta(fadedLuminanceDark);
	const bdFadedHex = hsluvToHex({
		...bgFadedHsluv,
		s: Math.max(0, bgFadedHsluv.s - 6 - Math.max(0, fadedLuminance - 98) * 20),
		l: bgFadedHsluv.l - 7,
	});
	const bdFadedHexDark = hsluvToHex({
		...bgFadedHsluvDark,
		s: 40,
		l: bgFadedHsluvDark.l + 7 - fadedLuminanceDeltaDark,
	});

	const output: Partial<ThemeDefinition["color"]> = {
		[`background${capitalizedKey}`]: {
			hex: bgHex,
			hexDark: bgHexDark,
		},
		[`background${capitalizedKey}Faded`]: {
			hex: bgFadedHex,
			hexDark: bgFadedHexDark,
		},
		[`background${capitalizedKey}Highlighted`]: {
			hex: hsluvToHex({ ...hsluv, l: hsluv.l - 4 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: hsluvDark.l + 4 }),
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
		output[`foreground${capitalizedKey}`] = {
			hex: hsluvToHex({ ...fgHsluv, l: 8 }),
			hexDark: hsluvToHex({ ...fgHsluvDark, l: 95 }),
		};
		output[`foreground${capitalizedKey}Faded`] = {
			hex: fgHex,
			hexDark: fgHexDark,
		};

		output[`backgroundDisabled`] = {
			hex: hsluvToHex({ ...hsluv, l: 94 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: 13 }),
		};
		output[`backgroundDisabledFaded`] = {
			hex: hsluvToHex({ ...hsluv, l: 97 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: 9 }),
		};
		output[`borderDisabled`] = {
			hex: hsluvToHex({ ...hsluv, l: 90 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: 17 }),
		};
		output[`foregroundDisabled`] = {
			hex: hsluvToHex({ ...hsluv, l: 82 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: 31 }),
		};

		output[`backgroundElevationBase`] = {
			hex: "#ffffff",
			hexDark: hsluvToHex({ ...hsluvDark, l: 8 }),
		};
		output[`backgroundElevationRaised`] = {
			hex: "#ffffff",
			hexDark: hsluvToHex({ ...hsluvDark, l: 10 }),
		};
		output[`backgroundElevationOverlay`] = {
			hex: "#ffffff",
			hexDark: hsluvToHex({ ...hsluvDark, l: 12 }),
		};

		output[`backgroundPage`] = {
			hex: "#ffffff",
			hexDark: hsluvToHex({ ...hsluvDark, l: 5 }),
		};
		output[`backgroundPageFaded`] = {
			hex: hsluvToHex({ ...hsluv, l: 98 }),
			hexDark: hsluvToHex({ ...hsluvDark, l: 6 }),
		};
	} else {
		output[`foreground${capitalizedKey}`] = {
			hex: fgHex,
			hexDark: fgHexDark,
		};
	}

	return output;
};

const validateHexColor = (color?: string) => {
	const hexColorRegex = /^#([A-Fa-f0-9]{3}){2}$/;
	return hexColorRegex.test(color || "") ? color : null;
};

const generate = (
	args: {
		primary?: string;
		critical?: string;
		positive?: string;
		neutral?: string;
	} = {}
) => {
	const { primary, critical, positive, neutral } = args;

	return {
		...generateColorValues({ key: "primary", hex: validateHexColor(primary) || "#5a58f2" }),
		...generateColorValues({ key: "critical", hex: validateHexColor(critical) || "#e22c2c" }),
		...generateColorValues({ key: "positive", hex: validateHexColor(positive) || "#118850" }),
		...generateColorValues({ key: "neutral", hex: validateHexColor(neutral) || "#dfe2ea" }),
		white: { hex: "#ffffff" },
		black: { hex: "#000000" },
	} as ThemeDefinition["color"];
};

export default generate;
