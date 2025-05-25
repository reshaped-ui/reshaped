type RgbColor = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RgbColor {
	hex = hex.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return { r, g, b };
}

/**
 * WCAG contrast
 */

const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;

const GAMMA = 2.4;

function luminanceWCAG(r: number, g: number, b: number) {
	const a = [r, g, b].map((v) => {
		v /= 255;
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

export const getOnColorWCAG = (args: {
	bgHexColor: string;
	lightHexColor?: string;
	darkHexColor?: string;
}) => {
	const { bgHexColor, lightHexColor = "#ffffff", darkHexColor = "#000000" } = args;

	const bgRgb = hexToRgb(bgHexColor);
	const lightRgb = hexToRgb(lightHexColor);

	return contrastWCAG([bgRgb.r, bgRgb.g, bgRgb.b], [lightRgb.r, lightRgb.g, lightRgb.b]) > 4.5
		? lightHexColor
		: darkHexColor;
};

/**
 * APCA contrast
 */

function luminanceAPCA({ r, g, b }: RgbColor) {
	return (
		0.2126 * Math.pow(r / 255, 2.2) +
		0.7152 * Math.pow(g / 255, 2.2) +
		0.0722 * Math.pow(b / 255, 2.2)
	);
}

function contrastAPCA(backgroundLuminance: number, textLuminance: number) {
	// Calculate the contrast based on APCA
	const Lc = textLuminance - backgroundLuminance;
	return Math.abs(Lc); // Return the absolute value of contrast
}

export const getOnColorAPCA = (args: {
	bgHexColor: string;
	mode: "light" | "dark";
	lightHexColor?: string;
	darkHexColor?: string;
}) => {
	const { bgHexColor, mode, lightHexColor = "#ffffff", darkHexColor = "#000000" } = args;
	const bgHexAlpha = bgHexColor.slice(7);
	const bgAlpha = bgHexAlpha ? Number((parseInt(bgHexAlpha, 16) / 255).toFixed(2)) : 1;
	const bgColor = hexToRgb(bgHexColor.slice(0, 7));
	const baseColor = mode === "light" ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 };
	const { r, g, b } = {
		r: (1 - bgAlpha) * baseColor.r + bgAlpha * bgColor.r,
		g: (1 - bgAlpha) * baseColor.g + bgAlpha * bgColor.g,
		b: (1 - bgAlpha) * baseColor.b + bgAlpha * bgColor.b,
	};

	// Calculate luminance for background and for white & black
	const backgroundLuminance = luminanceAPCA({ r, g, b });
	const whiteLuminance = luminanceAPCA({ r: 255, g: 255, b: 255 });
	const blackLuminance = luminanceAPCA({ r: 0, g: 0, b: 0 });

	// Calculate contrast
	const contrastWithWhite = contrastAPCA(backgroundLuminance, whiteLuminance);
	const contrastWithBlack = contrastAPCA(backgroundLuminance, blackLuminance);

	// Choose the color with higher contrast
	return contrastWithWhite > contrastWithBlack ? lightHexColor : darkHexColor;
};

/**
 * On color resolver
 */

export const getOnColor = (args: {
	bgHexColor: string;
	lightHexColor?: string;
	darkHexColor?: string;
	mode: "light" | "dark";
	algorithm?: "wcag" | "apca";
}) => {
	if (args.algorithm === "apca") {
		return getOnColorAPCA(args);
	} else {
		return getOnColorWCAG(args);
	}
};
