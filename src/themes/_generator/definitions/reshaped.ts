import breakpoints from "constants/breakpoints";

import type { ThemeDefinition } from "../tokens/types";

const theme: ThemeDefinition = {
	fontFamily: {
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
		title1: {
			fontSize: { px: 96 },
			lineHeight: { px: 100 },
			fontWeightToken: "extrabold",
			fontFamilyToken: "title",
		},
		title2: {
			fontSize: { px: 80 },
			lineHeight: { px: 84 },
			fontWeightToken: "extrabold",
			fontFamilyToken: "title",
		},
		title3: {
			fontSize: { px: 64 },
			lineHeight: { px: 68 },
			fontWeightToken: "extrabold",
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
	},

	radius: {
		small: { px: 4 },
		medium: { px: 8 },
		large: { px: 12 },
	},

	color: {
		backgroundPrimary: { hex: "#5a58f2", hexDark: "#524fea" },
		backgroundPrimaryFaded: { hex: "#ecebfe", hexDark: "#252544" },
		borderPrimary: { hex: "#3b38ed", hexDark: "#8c8bf3" },
		borderPrimaryFaded: { hex: "#dedcfb", hexDark: "#323164" },
		foregroundPrimary: { hex: "#4f4cf0", hexDark: "#8b8af7" },
		backgroundCritical: { hex: "#e22c2c", hexDark: "#d02626" },
		backgroundCriticalFaded: { hex: "#fdeded", hexDark: "#3e1f1f" },
		borderCritical: { hex: "#bf2424", hexDark: "#f46969" },
		borderCriticalFaded: { hex: "#f3dad6", hexDark: "#5a2e29" },
		foregroundCritical: { hex: "#c42525", hexDark: "#f36a6a" },
		backgroundWarning: { hex: "#facc15", hexDark: "#f1c512" },
		backgroundWarningFaded: { hex: "#fffae9", hexDark: "#2c271f" },
		borderWarning: { hex: "#cfa90f", hexDark: "#b4920a" },
		borderWarningFaded: { hex: "#ece2c4", hexDark: "#453c1e" },
		foregroundWarning: { hex: "#7b6305", hexDark: "#b4920c" },
		backgroundPositive: { hex: "#118850", hexDark: "#14784a" },
		backgroundPositiveFaded: { hex: "#edfdf5", hexDark: "#1f2a23" },
		borderPositive: { hex: "#0c6e40", hexDark: "#21ab6b" },
		borderPositiveFaded: { hex: "#d2eddb", hexDark: "#264431" },
		foregroundPositive: { hex: "#0d7544", hexDark: "#18ab66" },
		backgroundNeutral: { hex: "#dfe2ea", hexDark: "#494f60" },
		backgroundNeutralFaded: { hex: "#f3f3f5", hexDark: "#222835" },
		borderNeutral: { hex: "#0000001f", hexDark: "#ffffff24" },
		borderNeutralFaded: { hex: "#00000014", hexDark: "#ffffff14" },
		foregroundNeutral: { hex: "#14181f", hexDark: "#eff1f5" },
		foregroundNeutralFaded: { hex: "#5b667e", hexDark: "#c0c6d6" },
		backgroundDisabled: { hex: "#eceef2", hexDark: "#1e212a" },
		backgroundDisabledFaded: { hex: "#f5f6f9", hexDark: "#171921" },
		borderDisabled: { hex: "#dfe2ea", hexDark: "#262a34" },
		foregroundDisabled: { hex: "#c6ccda", hexDark: "#434959" },
		backgroundElevationBase: { hex: "#ffffff", hexDark: "#15171e" },
		backgroundElevationRaised: { hex: "#ffffff", hexDark: "#191b23" },
		backgroundElevationOverlay: { hex: "#ffffff", hexDark: "#1c1f28" },
		backgroundPage: { hex: "#ffffff", hexDark: "#0f1116" },
		backgroundPageFaded: { hex: "#f9f9fb", hexDark: "#111319" },
		brand: { hex: "#5a58f2" },
		white: { hex: "#ffffff" },
		black: { hex: "#000000" },
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
				blurRadius: 5,
				spreadRadius: -4,
				colorToken: "black",
				opacity: 0.5,
			},
			{
				offsetX: 0,
				offsetY: 4,
				blurRadius: 8,
				colorToken: "black",
				opacity: 0.05,
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
