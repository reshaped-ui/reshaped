import type { ThemeDefinition } from "../tokens/types";

const theme: Partial<ThemeDefinition> = {
	fontFamily: {
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
		title1: {
			fontSize: { px: 80 },
			lineHeight: { px: 84 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		title2: {
			fontSize: { px: 64 },
			lineHeight: { px: 68 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		title3: {
			fontSize: { px: 56 },
			lineHeight: { px: 60 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		title4: {
			fontSize: { px: 40 },
			lineHeight: { px: 44 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		title5: {
			fontSize: { px: 36 },
			lineHeight: { px: 40 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		title6: {
			fontSize: { px: 24 },
			lineHeight: { px: 28 },
			fontWeightToken: "semibold",
			fontFamilyToken: "title",
		},
		featured1: {
			fontSize: { px: 22 },
			lineHeight: { px: 28 },
			fontFamilyToken: "body",
		},
		featured2: {
			fontSize: { px: 20 },
			lineHeight: { px: 28 },
			fontFamilyToken: "body",
		},
		featured3: {
			fontSize: { px: 18 },
			lineHeight: { px: 24 },
			fontFamilyToken: "body",
		},
		body1: {
			fontSize: { px: 14 },
			lineHeight: { px: 20 },
			fontFamilyToken: "body",
		},
		body2: {
			fontSize: { px: 13 },
			lineHeight: { px: 20 },
			fontFamilyToken: "body",
		},
		body3: {
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
		foregroundNeutralFaded: { hex: "#474747", hexDark: "#B2B2B2" },
		foregroundDisabled: { hex: "#B2B2B2", hexDark: "#656565" },
		foregroundPrimary: { hex: "#007BE5", hexDark: "#7CC4F8" },
		foregroundPositive: { hex: "#009951", hexDark: "#79D297" },
		foregroundCritical: { hex: "#DC3412", hexDark: "#FCA397" },
		foregroundWarning: { hex: "#7b6305", hexDark: "#b4920c" },

		backgroundNeutral: { hex: "#DFE2EA", hexDark: "#444444" },
		backgroundNeutralFaded: { hex: "#F5F5F5", hexDark: "#383838" },
		backgroundDisabled: { hex: "#e4e4e4", hexDark: "#474747" },
		backgroundDisabledFaded: { hex: "#F5F5F5", hexDark: "#3A3A3A" },
		backgroundPrimary: { hex: "#0D99FF", hexDark: "#0C8CE9" },
		backgroundPrimaryFaded: { hex: "#E5F4FF", hexDark: "#394360" },
		backgroundPositive: { hex: "#14AE5C", hexDark: "#198F51" },
		backgroundPositiveFaded: { hex: "#DAECDF", hexDark: "#3d5749" },
		backgroundCritical: { hex: "#F24822", hexDark: "#E03E1A" },
		backgroundCriticalFaded: { hex: "#FFE2E0", hexDark: "#60332A" },
		backgroundWarning: { hex: "#facc15", hexDark: "#f1c512" },
		backgroundWarningFaded: { hex: "#fffae9", hexDark: "#2c271f" },

		borderNeutral: { hex: "#E6E6E6", hexDark: "#444444" },
		borderNeutralFaded: { hex: "#E6E6E6", hexDark: "#444444" },
		borderDisabled: { hex: "#E6E6E6", hexDark: "#3E3E3E" },
		borderPrimary: { hex: "#007BE5", hexDark: "#7CC4F8" },
		borderPrimaryFaded: { hex: "#BDE3FF", hexDark: "#2A4D72" },
		borderPositive: { hex: "#009951", hexDark: "#79D297" },
		borderPositiveFaded: { hex: "#BBDDC6", hexDark: "#086338" },
		borderCritical: { hex: "#DC3412", hexDark: "#FCA397" },
		borderCriticalFaded: { hex: "#FFC7C2", hexDark: "#803226" },
		borderWarning: { hex: "#cfa90f", hexDark: "#b4920a" },
		borderWarningFaded: { hex: "#ece2c4", hexDark: "#453c1e" },

		backgroundPage: { hex: "#FFFFFF", hexDark: "#2C2C2C" },
		backgroundPageFaded: { hex: "#FAFAFA", hexDark: "#1E1E1E" },
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
				offsetY: 1,
				blurRadius: 3,
				colorToken: "black",
				opacity: 0.15,
			},
		],
		overlay: [
			{
				offsetX: 0,
				offsetY: 10,
				blurRadius: 24,
				colorToken: "black",
				opacity: 0.1,
			},
			{
				offsetX: 0,
				offsetY: 2,
				blurRadius: 5,
				colorToken: "black",
				opacity: 0.04,
			},
		],
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
