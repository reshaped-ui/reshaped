import { UserThemeDefinition } from "../../../themes/_generator/tokens/types";

const theme: UserThemeDefinition = {
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

	color: {
		foregroundNeutral: { hex: "#14171F", hexDark: "#EFF0F1" },
		foregroundNeutralFaded: { hex: "#4D5874", hexDark: "#C2C8D6" },
		foregroundDisabled: { hex: "#C7CDDB", hexDark: "#404A63" },
		foregroundPrimary: { hex: "#4D4BE7", hexDark: "#9D9CF7" },
		foregroundPositive: { hex: "#05751F", hexDark: "#03AB5F" },
		foregroundCritical: { hex: "#CB101D", hexDark: "#EB6666" },

		backgroundNeutral: { hex: "#DFE2EA", hexDark: "#384056" },
		backgroundNeutralFaded: { hex: "#F3F4F6", hexDark: "#242838" },
		backgroundNeutralHighlighted: { hex: "#D4D8E3", hexDark: "#404A63" },
		backgroundDisabled: { hex: "#ECEEF3", hexDark: "#1C202B" },
		backgroundDisabledFaded: { hex: "#F4F5F7", hexDark: "#161922" },
		backgroundPrimary: { hex: "#5A58F2", hexDark: "#5250F2" },
		backgroundPrimaryHighlighted: { hex: "#6d6bf5", hexDark: "#5f5df4" },
		backgroundPrimaryFaded: { hex: "#EDECFD", hexDark: "#24254C" },
		backgroundPositive: { hex: "#118850", hexDark: "#06743F" },
		backgroundPositiveFaded: { hex: "#EBFEF6", hexDark: "#0F2921" },
		backgroundPositiveHighlighted: { hex: "#009950", hexDark: "#008545" },
		backgroundCritical: { hex: "#E22C2C", hexDark: "#AB1717" },
		backgroundCriticalFaded: { hex: "#FEF1F2", hexDark: "#2F1E1F" },
		backgroundCriticalHighlighted: { hex: "#eb4747", hexDark: "#c11515" },

		borderNeutral: { hex: "#BBC1D3", hexDark: "#49536F" },
		borderNeutralFaded: { hex: "#DFE2EA", hexDark: "#313649" },
		borderDisabled: { hex: "#DFE2EA", hexDark: "#242938" },
		borderPrimary: { hex: "#4D4BE7", hexDark: "#7D7BF4" },
		borderPrimaryFaded: { hex: "#D7D5FB", hexDark: "#2E3160" },
		borderPositive: { hex: "#05751F", hexDark: "#03A059" },
		borderPositiveFaded: { hex: "#CDEDD5", hexDark: "#163C30" },
		borderCritical: { hex: "#CB101D", hexDark: "#E95454" },
		borderCriticalFaded: { hex: "#FBD5D8", hexDark: "#412A2B" },

		backgroundPage: { hex: "#FFFFFF", hexDark: "#0D1117" },
		backgroundPageFaded: { hex: "#FAFAFA", hexDark: "#0F131A" },
		backgroundElevationBase: { hex: "#FFFFFF", hexDark: "#14181f" },
		backgroundElevationRaised: { hex: "#FFFFFF", hexDark: "#181D25" },
		backgroundElevationOverlay: { hex: "#FFFFFF", hexDark: "#1C212B" },

		black: { hex: "#000000" },
		white: { hex: "#FFFFFF" },
	},

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
};

export default theme;
