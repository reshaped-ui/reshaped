import {
	type ColorValue,
	HexColor,
	Hue,
	type Name as TokenName,
	OklchColor,
	OklchToken,
	PassedToken,
} from "../color.types";

import { hexToOklch, tokenToOklchToken } from "./convert";

import type { ThemeDefinition } from "@/generation/tokens/types";

const parseColor = (color: HexColor | PassedToken) => {
	const isString = typeof color === "string";

	if (!isString && "oklch" in color && color.oklch) {
		return {
			light: color.oklch,
			dark: color.oklchDark,
		};
	}

	const hexLight = isString ? color : color.hex;
	const hexDark = isString ? undefined : color.hexDark;

	const light = hexToOklch(hexLight);
	const dark = hexDark ? hexToOklch(hexDark) : undefined;

	if (!light) {
		throw new Error(`[Reshaped] Failed when parsing color: ${JSON.stringify(color)}`);
	}

	return { light, dark };
};

const getDarkModeColor = (lch: OklchColor) => {
	const { l, c } = lch;

	// Top boundary at which background colors are perceived as vibrant
	const vibrancyThreshold = 0.25;
	// A linear modifier of how gray a color is, gray = 1, vibrant = 0
	const neutralFactor = Math.min(1, Math.max(0, (vibrancyThreshold - c) / vibrancyThreshold));
	// Non-linear modification to make gray color inversion progress faster
	const easedVibrancy = 1 - Math.pow(neutralFactor, 2);

	const invertedL = 1 - l;
	// Take plain inversion and increase it back by vibrancy modifier
	// Vibrant colors should get back to almost the original value
	// while non-briant colors should lean towards full inversion

	// Example:
	// Black should become white in dark mode
	// Light gray should become dark gray
	// Vibrant blue should stay vibrant blue
	const darkL = invertedL + (l - invertedL) * easedVibrancy;

	// Make sure dark mode value doesn't become too dark and is still visible on dark page background
	const clampedDarkL = Math.max(0.32, darkL);

	return { ...lch, c: c * 0.8, l: clampedDarkL };
};

const generateColorValues = (
	key: string,
	token: ColorValue
): Partial<Record<TokenName, OklchToken>> => {
	const { light: bg, dark } = parseColor(token);
	const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
	const neutral = key === "neutral";
	const warning = key === "warning";

	const bgDark = dark || getDarkModeColor(bg);

	const bgFaded = neutral
		? { ...bg, l: 0, c: 0, alpha: 0.03 }
		: {
				...bg,
				l: 0.98,
				// Keep muted colors subtle but avoid introducing tint for low-chroma inputs.
				c: Math.min(warning ? 0.04 : 0.02, bg.c / 5),
			};
	const bgFadedDark = neutral
		? { ...bgDark, l: 1, alpha: 0.03 }
		: {
				...bgDark,
				l: 0.24,
				// For primary color with low chroma, we still have to make sure it stays low
				c: bgDark.c / 9.8,
			};

	const bgHighlightedFaded = neutral ? { ...bg, alpha: 0.48 } : { ...bg, alpha: 0.06 };
	const bgHighlightedFadedDark = neutral ? { ...bgDark, alpha: 0.28 } : { ...bgDark, alpha: 0.08 };

	const fg = neutral ? { ...bg, l: 0.24 } : { ...bg, l: 0.52 };
	const fgDark = neutral ? { ...bgDark, l: 0.96 } : { ...bgDark, l: 0.75, c: bg.c * 0.85 };

	const bd = neutral ? { ...bg, l: 0, alpha: 0.12 } : { ...bg, l: bg.l - 0.08 };
	const bdDark = neutral ? { ...bgDark, l: 1, alpha: 0.12 } : { ...bgDark, l: bgDark.l + 0.1 };
	const bdFaded = neutral ? { ...bgFaded, l: 0, alpha: 0.08 } : { ...bgFaded, l: bgFaded.l - 0.04 };
	const bdFadedDark = neutral
		? { ...bgFadedDark, l: 1, alpha: 0.08 }
		: { ...bgFadedDark, l: bgFadedDark.l + 0.06 };

	const output = {
		[`background${capitalizedKey}`]: {
			oklch: bg,
			oklchDark: bgDark,
		},
		[`background${capitalizedKey}Faded`]: {
			oklch: bgFaded,
			oklchDark: bgFadedDark,
		},
		[`background${capitalizedKey}HighlightedFaded`]: {
			oklch: bgHighlightedFaded,
			oklchDark: bgHighlightedFadedDark,
		},
		[`border${capitalizedKey}`]: {
			oklch: bd,
			oklchDark: bdDark,
		},
		[`border${capitalizedKey}Faded`]: {
			oklch: bdFaded,
			oklchDark: bdFadedDark,
		},
		[`foreground${capitalizedKey}`]: {
			oklch: fg,
			oklchDark: fgDark,
		},
	};

	if (neutral) {
		output[`foreground${capitalizedKey}Faded`] = {
			oklch: { ...fg, l: fg.l + 0.25 },
			oklchDark: { ...fgDark, l: fgDark.l - 0.15 },
		};
		output[`backgroundDisabled`] = {
			oklch: { ...bg, l: 0.95, c: 0 },
			oklchDark: { ...bgDark, l: 0.28, c: 0 },
		};
		output[`backgroundDisabledFaded`] = {
			oklch: { ...bg, l: 0.98, c: 0 },
			oklchDark: { ...bgDark, l: 0.23, c: 0 },
		};
		output[`borderDisabled`] = {
			oklch: { ...bd, l: 0, c: 0, alpha: 0.06 },
			oklchDark: { ...bgDark, l: 1, c: 0, alpha: 0.04 },
		};
		output[`foregroundDisabled`] = {
			oklch: { ...fg, l: 0.84, c: 0 },
			oklchDark: { ...fgDark, l: 0.4, c: 0 },
		};
		output[`backgroundElevationBase`] = {
			oklch: { ...bg, l: 1, c: 0 },
			oklchDark: { ...bgDark, l: 0.2, c: 0 },
		};
		output[`backgroundElevationRaised`] = {
			oklch: { ...bg, l: 1, c: 0 },
			oklchDark: { ...bgDark, l: 0.215, c: 0 },
		};
		output[`backgroundElevationOverlay`] = {
			oklch: { ...bg, l: 1, c: 0 },
			oklchDark: { ...bgDark, l: 0.23, c: 0 },
		};
		output[`backgroundPage`] = {
			oklch: { ...bg, l: 1, c: 0 },
			oklchDark: { ...bgDark, l: 0.16, c: 0 },
		};
		output[`backgroundPageFaded`] = {
			oklch: { ...bg, l: 0.98, c: 0 },
			oklchDark: { ...bgDark, l: 0.18, c: 0 },
		};
	}

	return output;
};

const getOklchToken = (color: ColorValue) => {
	const token = typeof color === "string" ? { hex: color } : color;
	return tokenToOklchToken(token);
};

const generateColors = (args: Partial<Record<Hue, ColorValue>> = {}) => {
	const {
		primary = { oklch: { l: 0.55, c: 0.24, h: 262.67 } },
		critical = { oklch: { l: 0.59, c: 0.205, h: 20.28 } },
		warning = { oklch: { l: 0.82, c: 0.22, h: 80 } },
		positive = { oklch: { l: 0.55, c: 0.13, h: 151.8 } },
		neutral = { oklch: { l: 0.94, c: 0, h: 89.88 } },
		brand,
	} = args;

	return {
		...generateColorValues("primary", getOklchToken(primary)),
		...generateColorValues("critical", getOklchToken(critical)),
		...generateColorValues("warning", getOklchToken(warning)),
		...generateColorValues("positive", getOklchToken(positive)),
		...generateColorValues("neutral", getOklchToken(neutral)),
		brand: getOklchToken(brand || primary),
		white: getOklchToken("#ffffff"),
		black: getOklchToken("#000000"),
	} as NonNullable<ThemeDefinition["color"]>;
};

export default generateColors;
