import generateColors from "@/generation/tokens/color/utilities/generateColors";
import { breakpoints } from "@/generation/tokens/viewport/viewport.constants";

import type { ThemeDefinition } from "@/generation/tokens/types";

const theme: ThemeDefinition = {
	color: generateColors(),
	fontFamily: {
		headline: {
			family: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
		},
		title: {
			family: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
		},
		body: {
			family: "Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
		},
		monospace: {
			family:
				"Geist Mono, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
		},
	},

	fontWeight: {
		regular: { weight: 400 },
		medium: { weight: 500 },
		semibold: { weight: 600 },
		bold: { weight: 700 },
		extrabold: { weight: 800 },
		black: { weight: 900 },
	},

	font: {
		headline1: {
			fontSize: { px: 80 },
			lineHeight: { px: 84 },
			fontWeightToken: "bold",
			fontFamilyToken: "headline",
		},
		headline2: {
			fontSize: { px: 64 },
			lineHeight: { px: 68 },
			fontWeightToken: "bold",
			fontFamilyToken: "headline",
		},
		headline3: {
			fontSize: { px: 48 },
			lineHeight: { px: 52 },
			fontWeightToken: "bold",
			fontFamilyToken: "headline",
		},
		title1: {
			fontSize: { px: 32 },
			lineHeight: { px: 36 },
			fontFamilyToken: "title",
		},
		title2: {
			fontSize: { px: 28 },
			lineHeight: { px: 32 },
			fontFamilyToken: "title",
		},
		title3: {
			fontSize: { px: 24 },
			lineHeight: { px: 32 },
			fontFamilyToken: "title",
		},
		title4: {
			fontSize: { px: 22 },
			lineHeight: { px: 28 },
			fontFamilyToken: "title",
		},
		title5: {
			fontSize: { px: 20 },
			lineHeight: { px: 28 },
			fontFamilyToken: "title",
		},
		title6: {
			fontSize: { px: 18 },
			lineHeight: { px: 24 },
			fontFamilyToken: "title",
		},
		body1: {
			fontSize: { px: 16 },
			lineHeight: { px: 24 },
			fontFamilyToken: "body",
		},
		body2: {
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
	},

	radius: {
		small: { px: 4 },
		medium: { px: 6 },
		large: { px: 12 },
	},

	duration: {
		rapid: { ms: 100 },
		fast: { ms: 150 },
		medium: { ms: 200 },
		slow: { ms: 300 },
	},

	easing: {
		standard: { x1: 0.2, y1: 0, x2: 0, y2: 1 }, // subtle UI transitions
		accelerate: { x1: 0.4, y1: 0, x2: 1, y2: 1 }, // exit / moving away
		decelerate: { x1: 0, y1: 0, x2: 0.2, y2: 1 }, // enter / appearing
	},

	shadow: {
		border: {
			parts: [
				{
					offsetX: 0,
					offsetY: 1,
					blurRadius: 2,
					spreadRadius: -0.5,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 2,
					blurRadius: 3,
					spreadRadius: -1,
					colorToken: "black",
					opacity: 0.05,
				},
				{
					offsetX: 0,
					offsetY: 6,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.1,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: -1,
						blurRadius: 2,
						spreadRadius: -0.5,
						colorToken: "white",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: -1,
						blurRadius: 3,
						spreadRadius: -1,
						colorToken: "white",
						opacity: 0.05,
					},
					{
						offsetX: 0,
						offsetY: 6,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.1,
					},
				],
			},
		},
		borderRaised: {
			parts: [
				{
					offsetX: 0,
					offsetY: 8,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.08,
				},
				{
					offsetX: 0,
					offsetY: 1,
					blurRadius: 2,
					spreadRadius: 0,
					colorToken: "black",
					opacity: 0.1,
				},
				{
					offsetX: 0,
					offsetY: 0,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.1,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: 8,
						blurRadius: 12,
						spreadRadius: -4,
						colorToken: "black",
						opacity: 0.08,
					},
					{
						offsetX: 0,
						offsetY: -2,
						blurRadius: 2,
						spreadRadius: -1,
						colorToken: "white",
						opacity: 0.1,
					},
					{
						offsetX: 0,
						offsetY: 0,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.1,
					},
				],
			},
		},
		borderOverlay: {
			parts: [
				{
					offsetX: 0,
					offsetY: 32,
					blurRadius: 48,
					spreadRadius: -8,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 16,
					blurRadius: 24,
					spreadRadius: -6,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 8,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 0,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.1,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: 32,
						blurRadius: 48,
						spreadRadius: -8,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 16,
						blurRadius: 24,
						spreadRadius: -6,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 8,
						blurRadius: 12,
						spreadRadius: -4,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 0,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.1,
					},
				],
			},
		},
		borderFaded: {
			parts: [
				{
					offsetX: 0,
					offsetY: 1,
					blurRadius: 2,
					spreadRadius: -0.5,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 2,
					blurRadius: 3,
					spreadRadius: -1,
					colorToken: "black",
					opacity: 0.05,
				},
				{
					offsetX: 0,
					offsetY: 6,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.08,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: -1,
						blurRadius: 2,
						spreadRadius: -0.5,
						colorToken: "white",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: -1,
						blurRadius: 3,
						spreadRadius: -1,
						colorToken: "white",
						opacity: 0.05,
					},
					{
						offsetX: 0,
						offsetY: 6,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.08,
					},
				],
			},
		},
		borderFadedRaised: {
			parts: [
				{
					offsetX: 0,
					offsetY: 8,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.08,
				},
				{
					offsetX: 0,
					offsetY: 1,
					blurRadius: 2,
					spreadRadius: 0,
					colorToken: "black",
					opacity: 0.1,
				},
				{
					offsetX: 0,
					offsetY: 0,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.08,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: 8,
						blurRadius: 12,
						spreadRadius: -4,
						colorToken: "black",
						opacity: 0.08,
					},
					{
						offsetX: 0,
						offsetY: -2,
						blurRadius: 2,
						spreadRadius: -1,
						colorToken: "white",
						opacity: 0.1,
					},
					{
						offsetX: 0,
						offsetY: 0,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.08,
					},
				],
			},
		},
		borderFadedOverlay: {
			parts: [
				{
					offsetX: 0,
					offsetY: 32,
					blurRadius: 48,
					spreadRadius: -8,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 16,
					blurRadius: 24,
					spreadRadius: -6,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 8,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.06,
				},
				{
					offsetX: 0,
					offsetY: 0,
					blurRadius: 0,
					spreadRadius: 1,
					colorToken: "black",
					opacity: 0.08,
				},
			],
			dark: {
				parts: [
					{
						offsetX: 0,
						offsetY: 32,
						blurRadius: 48,
						spreadRadius: -8,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 16,
						blurRadius: 24,
						spreadRadius: -6,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 8,
						blurRadius: 12,
						spreadRadius: -4,
						colorToken: "black",
						opacity: 0.06,
					},
					{
						offsetX: 0,
						offsetY: 0,
						blurRadius: 0,
						spreadRadius: 1,
						colorToken: "white",
						opacity: 0.08,
					},
				],
			},
		},
		raised: {
			parts: [
				{
					offsetX: 0,
					offsetY: 10,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.08,
				},
				{
					offsetX: 0,
					offsetY: 2,
					blurRadius: 4,
					colorToken: "black",
					opacity: 0.1,
				},
				{
					offsetX: 0,
					offsetY: 1,
					blurRadius: 4,
					colorToken: "black",
					opacity: 0.1,
				},
			],
		},
		overlay: {
			parts: [
				{
					offsetX: 0,
					offsetY: 32,
					blurRadius: 48,
					spreadRadius: -8,
					colorToken: "black",
					opacity: 0.1,
				},
				{
					offsetX: 0,
					offsetY: 16,
					blurRadius: 24,
					spreadRadius: -6,
					colorToken: "black",
					opacity: 0.1,
				},
				{
					offsetX: 0,
					offsetY: 8,
					blurRadius: 12,
					spreadRadius: -4,
					colorToken: "black",
					opacity: 0.1,
				},
			],
		},
	},

	viewport: {
		m: { minPx: breakpoints.m },
		l: { minPx: breakpoints.l },
		xl: { minPx: breakpoints.xl },
	},

	zIndex: {
		relative: { level: 10 },
		absolute: { level: 100 },
		fixed: { level: 200 },
	},
};

export default theme;
