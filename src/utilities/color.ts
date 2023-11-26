import { Name } from "themes/_generator/tokens/color/color.types";

export const bgWithDynamicForeground: Name[] = [
	"backgroundNeutral",
	"backgroundPrimary",
	"backgroundCritical",
	"backgroundPositive",
];

export const hexToRgb = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
	if (!result) throw new Error(`Invalid hex value: ${hex}`);

	const alpha = result[4] ? Number((parseInt(result[4], 16) / 255).toFixed(2)) : 1;

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		a: alpha,
	};
};

export const hexToRgbString = (hex: string) => {
	const rgb = hexToRgb(hex);

	return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
};

export const getOnColor = (args: {
	bgHexColor: string;
	mode: "light" | "dark";
	lightHexColor?: string;
	darkHexColor?: string;
}) => {
	const { bgHexColor, mode, lightHexColor = "#ffffff", darkHexColor = "#000000" } = args;
	const bgColor = hexToRgb(bgHexColor);
	const baseColor = mode === "light" ? { r: 255, g: 255, b: 255 } : { r: 0, g: 0, b: 0 };
	const { r, g, b } = {
		r: (1 - bgColor.a) * baseColor.r + bgColor.a * bgColor.r,
		g: (1 - bgColor.a) * baseColor.g + bgColor.a * bgColor.g,
		b: (1 - bgColor.a) * baseColor.b + bgColor.a * bgColor.b,
	};

	const lrgb: number[] = [];
	[r, g, b].forEach(function (c) {
		c = c / 255;
		if (c <= 0.03928) {
			c = c / 12.92;
		} else {
			c = Math.pow((c + 0.055) / 1.055, 2.4);
		}

		lrgb.push(c);
	});

	const lum = 0.2126 * lrgb[0] + 0.7152 * lrgb[1] + 0.0722 * lrgb[2];
	return lum > 0.179 ? darkHexColor : lightHexColor;
};
