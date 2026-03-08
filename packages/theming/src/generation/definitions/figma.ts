import type { ThemeDefinition } from "../tokens/types";

const theme: Partial<ThemeDefinition> = {
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
			family: "SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
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
			fontSize: { px: 13 },
			lineHeight: { px: 20 },
			fontFamilyToken: "body",
		},
		body2: {
			fontSize: { px: 11 },
			lineHeight: { px: 16 },
			fontFamilyToken: "body",
		},
		caption1: {
			fontSize: { px: 11 },
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
		radiusMedium: { px: 4 },
		radiusLarge: { px: 4 },
	},

	color: {
		foregroundNeutral: { hex: "#191919", hexDark: "#FFFFFF" },
		foregroundNeutralMuted: { hex: "#474747", hexDark: "#B2B2B2" },
		foregroundDisabled: { hex: "#B2B2B2", hexDark: "#656565" },
		foregroundPrimary: { hex: "#007BE5", hexDark: "#7CC4F8" },
		foregroundPositive: { hex: "#009951", hexDark: "#79D297" },
		foregroundCritical: { hex: "#DC3412", hexDark: "#FCA397" },
		foregroundWarning: { hex: "#7b6305", hexDark: "#b4920c" },

		backgroundNeutral: { hex: "#DFE2EA", hexDark: "#444444" },
		backgroundNeutralMuted: { hex: "#F5F5F5", hexDark: "#383838" },
		backgroundNeutralHighlightedMuted: { hex: "#DFE2EA66", hexDark: "#44444466" },
		backgroundDisabled: { hex: "#e4e4e4", hexDark: "#474747" },
		backgroundDisabledMuted: { hex: "#F5F5F5", hexDark: "#3A3A3A" },
		backgroundPrimary: { hex: "#0D99FF", hexDark: "#0C8CE9" },
		backgroundPrimaryMuted: { hex: "#E5F4FF", hexDark: "#394360" },
		backgroundPrimaryHighlightedMuted: { hex: "#0D99FF0F", hexDark: "#0C8CE90F" },
		backgroundPositive: { hex: "#14AE5C", hexDark: "#198F51" },
		backgroundPositiveMuted: { hex: "#DAECDF", hexDark: "#3d5749" },
		backgroundPositiveHighlightedMuted: { hex: "#14AE5C0F", hexDark: "#198F510F" },
		backgroundCritical: { hex: "#F24822", hexDark: "#E03E1A" },
		backgroundCriticalMuted: { hex: "#FFE2E0", hexDark: "#60332A" },
		backgroundCriticalHighlightedMuted: { hex: "#F248220F", hexDark: "#E03E1A0F" },
		backgroundWarning: { hex: "#facc15", hexDark: "#f1c512" },
		backgroundWarningMuted: { hex: "#fffae9", hexDark: "#2c271f" },
		backgroundWarningHighlightedMuted: { hex: "#facc150F", hexDark: "#f1c5120F" },

		borderNeutral: { hex: "#E6E6E6", hexDark: "#444444" },
		borderNeutralMuted: { hex: "#E6E6E6", hexDark: "#444444" },
		borderDisabled: { hex: "#E6E6E6", hexDark: "#3E3E3E" },
		borderPrimary: { hex: "#007BE5", hexDark: "#7CC4F8" },
		borderPrimaryMuted: { hex: "#BDE3FF", hexDark: "#2A4D72" },
		borderPositive: { hex: "#009951", hexDark: "#79D297" },
		borderPositiveMuted: { hex: "#BBDDC6", hexDark: "#086338" },
		borderCritical: { hex: "#DC3412", hexDark: "#FCA397" },
		borderCriticalMuted: { hex: "#FFC7C2", hexDark: "#803226" },
		borderWarning: { hex: "#cfa90f", hexDark: "#b4920a" },
		borderWarningMuted: { hex: "#ece2c4", hexDark: "#453c1e" },

		backgroundPage: { hex: "#FFFFFF", hexDark: "#2C2C2C" },
		backgroundPageMuted: { hex: "#FAFAFA", hexDark: "#1E1E1E" },
		backgroundElevationBase: { hex: "#FFFFFF", hexDark: "#2C2C2C" },
		backgroundElevationRaised: { hex: "#FFFFFF", hexDark: "#2C2C2C" },
		backgroundElevationOverlay: { hex: "#FFFFFF", hexDark: "#2C2C2C" },

		onBackgroundPrimary: { hex: "#FFFFFF" },

		brand: { hex: "#0D99FF" },
		black: { hex: "#000000" },
		white: { hex: "#FFFFFF" },
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
		borderMuted: {
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
		borderMutedRaised: {
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
		borderMutedOverlay: {
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
		m: { minPx: 660 },
		l: { minPx: 900 },
		xl: { minPx: 1280 },
	},

	zIndex: {
		relative: { level: 10 },
		absolute: { level: 100 },
		fixed: { level: 200 },
	},
};

export default theme;
