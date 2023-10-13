import type { ThemeDefinition } from "../tokens/types";

/**
 * Some of the color conversion utilities are taken from https://github.com/hsluv/hsluv-javascript
 * They have been rewritten for easier color transformations in the theme generation case
 */

type RgbColor = { r: number; g: number; b: number };
type HslColor = { h: number; s: number; l: number };
type XyzColor = { x: number; y: number; z: number };
type LuvColor = { l: number; u: number; v: number };
type LchColor = { l: number; c: number; h: number };
type BoundingLines = {
	r0s: number;
	r0i: number;
	r1s: number;
	r1i: number;
	g0s: number;
	g0i: number;
	g1s: number;
	g1i: number;
	b0s: number;
	b0i: number;
	b1s: number;
	b1i: number;
};

/**
 * Constants
 */

const epsilon = 0.0088564516;
const refY = 1.0;
const refU = 0.19783000664283;
const refV = 0.46831999493879;
const kappa = 903.2962962;
const mr0 = 3.240969941904521;
const mr1 = -1.537383177570093;
const mr2 = -0.498610760293;
const mg0 = -0.96924363628087;
const mg1 = 1.87596750150772;
const mg2 = 0.041555057407175;
const mb0 = 0.055630079696993;
const mb1 = -0.20397695888897;
const mb2 = 1.056971514242878;

/**
 * Color utilities
 */

const calculateBoundingLines = (l: number): BoundingLines => {
	const sub1 = Math.pow(l + 16, 3) / 1560896;
	const sub2 = sub1 > epsilon ? sub1 : l / kappa;
	const s1r = sub2 * (284517 * mr0 - 94839 * mr2);
	const s2r = sub2 * (838422 * mr2 + 769860 * mr1 + 731718 * mr0);
	const s3r = sub2 * (632260 * mr2 - 126452 * mr1);
	const s1g = sub2 * (284517 * mg0 - 94839 * mg2);
	const s2g = sub2 * (838422 * mg2 + 769860 * mg1 + 731718 * mg0);
	const s3g = sub2 * (632260 * mg2 - 126452 * mg1);
	const s1b = sub2 * (284517 * mb0 - 94839 * mb2);
	const s2b = sub2 * (838422 * mb2 + 769860 * mb1 + 731718 * mb0);
	const s3b = sub2 * (632260 * mb2 - 126452 * mb1);

	return {
		r0s: s1r / s3r,
		r0i: (s2r * l) / s3r,
		r1s: s1r / (s3r + 126452),
		r1i: ((s2r - 769860) * l) / (s3r + 126452),
		g0s: s1g / s3g,
		g0i: (s2g * l) / s3g,
		g1s: s1g / (s3g + 126452),
		g1i: ((s2g - 769860) * l) / (s3g + 126452),
		b0s: s1b / s3b,
		b0i: (s2b * l) / s3b,
		b1s: s1b / (s3b + 126452),
		b1i: ((s2b - 769860) * l) / (s3b + 126452),
	};
};

const distanceFromOriginAngle = (slope: number, intercept: number, angle: number): number => {
	const d = intercept / (Math.sin(angle) - slope * Math.cos(angle));

	return d < 0 ? Infinity : d;
};

const calcMaxChromaHsluv = (h: number, boundingLines: BoundingLines): number => {
	const hueRad = (h / 360) * Math.PI * 2;
	const r0 = distanceFromOriginAngle(boundingLines.r0s, boundingLines.r0i, hueRad);
	const r1 = distanceFromOriginAngle(boundingLines.r1s, boundingLines.r1i, hueRad);
	const g0 = distanceFromOriginAngle(boundingLines.g0s, boundingLines.g0i, hueRad);
	const g1 = distanceFromOriginAngle(boundingLines.g1s, boundingLines.g1i, hueRad);
	const b0 = distanceFromOriginAngle(boundingLines.b0s, boundingLines.b0i, hueRad);
	const b1 = distanceFromOriginAngle(boundingLines.b1s, boundingLines.b1i, hueRad);

	return Math.min(r0, r1, g0, g1, b0, b1);
};

export function hexToRgb(hex: string): RgbColor {
	hex = hex.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return { r, g, b };
}

const rgbToHsl = ({ r, g, b }: RgbColor): HslColor => {
	r /= 255;
	g /= 255;
	b /= 255;

	const cmin = Math.min(r, g, b);
	const cmax = Math.max(r, g, b);
	const delta = cmax - cmin;
	let h = 0;
	let s = 0;
	let l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return { h, s: Math.round(s), l: Math.round(l) };
};

const hslToRgb = ({ h, s, l }: HslColor): RgbColor => {
	s /= 100;
	l /= 100;

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;

	const isSector1 = 0 <= h && h < 60;
	const isSector2 = 60 <= h && h < 120;
	const isSector3 = 120 <= h && h < 180;
	const isSector4 = 180 <= h && h < 240;
	const isSector5 = 240 <= h && h < 300;
	const isSector6 = 300 <= h && h < 360;

	const r = isSector1 || isSector6 ? c : isSector2 || isSector5 ? x : 0;
	const g = isSector1 || isSector4 ? x : isSector2 || isSector3 ? c : 0;
	const b = isSector1 || isSector2 ? 0 : isSector3 || isSector6 ? x : c;

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
};

const rgbToHex = ({ r, g, b }: RgbColor): string => {
	const red = Math.round(r).toString(16).padStart(2, "0");
	const green = Math.round(g).toString(16).padStart(2, "0");
	const blue = Math.round(b).toString(16).padStart(2, "0");

	return `#${red}${green}${blue}`;
};

const toLinear = (c: number): number => {
	if (c > 0.04045) return Math.pow((c + 0.055) / 1.055, 2.4);
	return c / 12.92;
};

const fromLinear = (c: number): number => {
	if (c <= 0.0031308) return 12.92 * c;
	return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
};

const rgbToXyz = ({ r, g, b }: RgbColor) => {
	const lr = toLinear(r / 255);
	const lg = toLinear(g / 255);
	const lb = toLinear(b / 255);

	return {
		x: 0.41239079926595 * lr + 0.35758433938387 * lg + 0.18048078840183 * lb,
		y: 0.21263900587151 * lr + 0.71516867876775 * lg + 0.072192315360733 * lb,
		z: 0.019330818715591 * lr + 0.11919477979462 * lg + 0.95053215224966 * lb,
	};
};

const xyzToRgb = ({ x, y, z }: XyzColor): RgbColor => {
	return {
		r: fromLinear(mr0 * x + mr1 * y + mr2 * z) * 255,
		g: fromLinear(mg0 * x + mg1 * y + mg2 * z) * 255,
		b: fromLinear(mb0 * x + mb1 * y + mb2 * z) * 255,
	};
};

const yToL = (y: number): number => {
	if (y <= epsilon) return (y / refY) * kappa;
	return 116 * Math.pow(y / refY, 1 / 3) - 16;
};

const lToY = (l: number): number => {
	if (l <= 8) return (refY * l) / kappa;
	return refY * Math.pow((l + 16) / 116, 3);
};

const xyzToLuv = ({ x, y, z }: XyzColor): LuvColor => {
	const divider = x + 15 * y + 3 * z;
	const varU = divider !== 0 ? (4 * x) / divider : NaN;
	const varV = divider !== 0 ? (9 * y) / divider : NaN;
	const l = yToL(y);

	return {
		l,
		u: l === 0 ? 0 : 13 * l * (varU - refU),
		v: l === 0 ? 0 : 13 * l * (varV - refV),
	};
};

const luvToXyz = ({ l, u, v }: LuvColor): XyzColor => {
	if (l === 0) return { x: 0, y: 0, z: 0 };

	const varU = u / (13 * l) + refU;
	const varV = v / (13 * l) + refV;
	const y = lToY(l);
	const x = 0 - (9 * y * varU) / ((varU - 4) * varV - varU * varV);
	const z = (9 * y - 15 * varV * y - varV * x) / (3 * varV);

	return { x, y, z };
};

const luvToLch = ({ l, u, v }: LuvColor): LchColor => {
	const c = Math.sqrt(u * u + v * v);
	let h: number;

	if (c < 0.00000001) {
		h = 0;
	} else {
		const hrad = Math.atan2(v, u);
		h = (hrad * 180.0) / Math.PI;
		if (h < 0) h = 360 + h;
	}

	return { l, c, h };
};

const lchToLuv = ({ l, c, h }: LchColor): LuvColor => {
	const hrad = (h / 180.0) * Math.PI;

	return {
		l,
		u: Math.cos(hrad) * c,
		v: Math.sin(hrad) * c,
	};
};

const lchToHsluv = ({ l, c, h }: LchColor): HslColor => {
	let s: number;
	let newL: number;

	if (l > 99.9999999) {
		s = 0;
		newL = 100;
	} else if (l < 0.00000001) {
		s = 0;
		newL = 0;
	} else {
		const boundingLines = calculateBoundingLines(l);
		const max = calcMaxChromaHsluv(h, boundingLines);

		s = (c / max) * 100;
		newL = l;
	}

	return { h, s, l: newL };
};

const hsluvToLch = ({ h, s, l }: HslColor): LchColor => {
	let newL: number;
	let c: number;

	if (l > 99.9999999) {
		newL = 100;
		c = 0;
	} else if (l < 0.00000001) {
		newL = 0;
		c = 0;
	} else {
		const boundingLines = calculateBoundingLines(l);
		const max = calcMaxChromaHsluv(h, boundingLines);

		newL = l;
		c = (max / 100) * s;
	}

	return { l: newL, c, h };
};

const hsluvToHex = (hsl: HslColor): string => {
	const lch = hsluvToLch(hsl);
	const luv = lchToLuv(lch);
	const xyz = luvToXyz(luv);
	const rgb = xyzToRgb(xyz);

	return rgbToHex(rgb);
};

const hexToHsl = (H: string) => {
	const rgb = hexToRgb(H);
	return rgbToHsl(rgb);
};

const hexToHsluv = (hex: string): HslColor => {
	const rgb = hexToRgb(hex);
	const xyz = rgbToXyz(rgb);
	const luv = xyzToLuv(xyz);
	const lch = luvToLch(luv);
	return lchToHsluv(lch);
};

const hslToHex = (hsl: HslColor) => {
	const rgb = hslToRgb(hsl);
	return rgbToHex(rgb);
};

/**
 * Normalizing utilities
 */

const getDarkModeLightnessDelta = (lightness: number, luminance: number) => {
	const perceivedLuminanceOrigin = 69.5;
	const luminanceDistance = Math.abs(Math.round(luminance - perceivedLuminanceOrigin));
	// Use a greater modifier for values around the luminance origin and decrease it for distant values
	const luminanceModifier = 3 - (Math.min(luminanceDistance, 20) / 20) * 0.5;
	const distance = luminanceDistance * luminanceModifier;

	// Dark mode always reduces lightness but if the color was dark originally, we need to do it a slower pace
	const slowdownModifier = luminanceDistance < 0 ? 2 : 1;
	// Adjust the value based on the current lightness boundary
	const delta = lightness / 100;

	return (distance * delta) / slowdownModifier;
};

const getLuminanceDelta = (luminance: number) => {
	return Math.max(0, luminance - 50) / 5;
};

export function getRgbLuminance({ r, g, b }: RgbColor) {
	r /= 255;
	g /= 255;
	b /= 255;
	const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	// The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
	if (y <= 216 / 24389) {
		// The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
		return y * (24389 / 27);
	} else {
		return Math.pow(y, 1 / 3) * 116 - 16;
	}
}

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
