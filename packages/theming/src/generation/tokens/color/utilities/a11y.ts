import { type Oklch } from "culori/fn";

import { oklchToRgb } from "./convert";

/**
 * WCAG
 */

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

function luminanceWCAG(r: number, g: number, b: number) {
	const a = [r, g, b].map((v) => {
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
	});
	return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrastWCAG(rgb1: [number, number, number], rgb2: [number, number, number]) {
	const lum1 = luminanceWCAG(...rgb1);
	const lum2 = luminanceWCAG(...rgb2);
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	return (brightest + 0.05) / (darkest + 0.05);
}

export const getOnColorWCAG = (args: { bgColor: Oklch; lightColor: Oklch; darkColor: Oklch }) => {
	const { bgColor, lightColor, darkColor } = args;

	const bgRgb = oklchToRgb(bgColor);
	const lightRgb = oklchToRgb(lightColor);

	return contrastWCAG([bgRgb.r, bgRgb.g, bgRgb.b], [lightRgb.r, lightRgb.g, lightRgb.b]) > 4.5
		? lightColor
		: darkColor;
};

/**
 * APCA
 */

function luminanceAPCA(oklch: Oklch) {
	const { r, g, b } = oklchToRgb(oklch);

	return (
		0.2126 * Math.pow(r / 255, 2.2) +
		0.7152 * Math.pow(g / 255, 2.2) +
		0.0722 * Math.pow(b / 255, 2.2)
	);
}

export const getOnColorAPCA = (args: { bgColor: Oklch; lightColor: Oklch; darkColor: Oklch }) => {
	const { bgColor, lightColor, darkColor } = args;

	const backgroundLuminance = luminanceAPCA(bgColor);
	const lightLuminance = luminanceAPCA(lightColor);
	const darkLuminance = luminanceAPCA(darkColor);
	const contrastWithLight = Math.abs(lightLuminance - backgroundLuminance);
	const contrastWithDark = Math.abs(darkLuminance - backgroundLuminance);

	return contrastWithLight > contrastWithDark ? lightColor : darkColor;
};

/**
 * General
 */

export const getOnColor = (args: {
	bgColor: Oklch;
	lightColor: Oklch;
	darkColor: Oklch;
	algorithm?: "wcag" | "apca";
}) => {
	if (args.algorithm === "apca") {
		return getOnColorAPCA(args);
	} else {
		return getOnColorWCAG(args);
	}
};
