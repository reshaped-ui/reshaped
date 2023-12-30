import { ThemeDefinition } from "../tokens/types";
import generateColors from "../utilities/generateColors";

const theme: ThemeDefinition = {
	fontFamily: {
		title: {
			family: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
		},
		body: {
			family: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
		},
	},

	fontWeight: {
		regular: { weight: 400 },
		medium: { weight: 500 },
		semibold: { weight: 600 },
		bold: { weight: 700 },
		heavy: { weight: 800 },
		black: { weight: 900 },
	},

	font: {
		title1: {
			fontSize: { px: 96 },
			lineHeight: { px: 100 },
			fontWeightToken: "heavy",
			fontFamilyToken: "title",
		},
		title2: {
			fontSize: { px: 80 },
			lineHeight: { px: 84 },
			fontWeightToken: "heavy",
			fontFamilyToken: "title",
		},
		title3: {
			fontSize: { px: 64 },
			lineHeight: { px: 68 },
			fontWeightToken: "heavy",
			fontFamilyToken: "title",
		},
		title4: {
			fontSize: { px: 56 },
			lineHeight: { px: 60 },
			fontWeightToken: "bold",
			fontFamilyToken: "title",
		},
		title5: {
			fontSize: { px: 48 },
			lineHeight: { px: 52 },
			fontWeightToken: "bold",
			fontFamilyToken: "title",
		},
		title6: {
			fontSize: { px: 36 },
			lineHeight: { px: 40 },
			fontWeightToken: "bold",
			fontFamilyToken: "title",
		},
		featured1: {
			fontSize: { px: 32 },
			lineHeight: { px: 40 },
			fontFamilyToken: "body",
		},
		featured2: {
			fontSize: { px: 24 },
			lineHeight: { px: 32 },
			fontFamilyToken: "body",
		},
		featured3: {
			fontSize: { px: 20 },
			lineHeight: { px: 28 },
			fontFamilyToken: "body",
		},
		body1: {
			fontSize: { px: 18 },
			lineHeight: { px: 28 },
			fontFamilyToken: "body",
		},
		body2: {
			fontSize: { px: 16 },
			lineHeight: { px: 24 },
			fontFamilyToken: "body",
		},
		body3: {
			fontSize: { px: 14 },
			lineHeight: { px: 20 },
			fontFamilyToken: "body",
		},
		caption1: {
			fontSize: { px: 12 },
			lineHeight: { px: 16 },
			fontFamilyToken: "body",
		},
		caption2: {
			fontSize: { px: 10 },
			lineHeight: { px: 12 },
			fontFamilyToken: "body",
		},
	},

	unit: {
		base: { px: 4 },
		radiusSmall: { px: 4 },
		radiusMedium: { px: 8 },
		radiusLarge: { px: 12 },
	},

	color: generateColors(),

	duration: {
		fast: { ms: 200 },
		medium: { ms: 300 },
		slow: { ms: 400 },
	},

	easing: {
		standard: { x1: 0.4, y1: 0, x2: 0.2, y2: 1 },
		accelerate: { x1: 0.4, y1: 0, x2: 1, y2: 1 },
		decelerate: { x1: 0, y1: 0, x2: 0.2, y2: 1 },
	},

	shadow: {
		raised: [
			{
				offsetX: 0,
				offsetY: 2,
				blurRadius: 3,
				colorToken: "black",
				opacity: 0.1,
			},
			{
				offsetX: 0,
				offsetY: 1,
				blurRadius: 2,
				spreadRadius: -1,
				colorToken: "black",
				opacity: 0.1,
			},
		],
		overlay: [
			{
				offsetX: 0,
				offsetY: 5,
				blurRadius: 10,
				colorToken: "black",
				opacity: 0.05,
			},
			{
				offsetX: 0,
				offsetY: 15,
				blurRadius: 25,
				colorToken: "black",
				opacity: 0.07,
			},
		],
	},

	viewport: {
		m: { minPx: 660 },
		l: { minPx: 900 },
		xl: { minPx: 1280 },
	},
};

export default theme;
