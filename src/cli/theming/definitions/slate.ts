import reshapedDefinition from "./reshaped";
import { UserThemeDefinition } from "../tokens/types";

const theme: UserThemeDefinition = {
	...reshapedDefinition,
	color: {
		...reshapedDefinition.color,
		foregroundNeutral: {
			hex: "#161a26",
			hexDark: "#f2f3f5",
		},
		foregroundNeutralFaded: {
			hex: "#717787",
			hexDark: "#9f9e9e",
		},
		foregroundPrimary: {
			hex: "#2383e2",
			hexDark: "#5098ff",
		},
		foregroundDisabled: {
			hex: "#d4d0d0",
			hexDark: "#656565",
		},

		backgroundPrimary: {
			hex: "#2383e2",
			hexDark: "#4281DB",
		},
		backgroundPrimaryFaded: {
			hex: "#e5f4fb",
			hexDark: "#1e2c45",
		},
		backgroundPrimaryHighlighted: {
			hex: "#3273CC",
			hexDark: "#3273CC",
		},
		backgroundElevationBase: {
			hex: "#ffffff",
			hexDark: "#232323",
		},
		backgroundElevationRaised: {
			hex: "#ffffff",
			hexDark: "#262626",
		},
		backgroundElevationOverlay: {
			hex: "#ffffff",
			hexDark: "#292929",
		},
		backgroundNeutral: {
			hex: "#e3e3e5",
			hexDark: "#4f5155",
		},
		backgroundNeutralFaded: {
			hex: "#f2f3f5",
			hexDark: "#34363f",
		},
		backgroundNeutralHighlighted: {
			hex: "#dedee1",
			hexDark: "#595c60",
		},
		backgroundPage: {
			hex: "#ffffff",
			hexDark: "#191919",
		},
		backgroundPageFaded: {
			hex: "#F7F7F5",
			hexDark: "#202020",
		},
		backgroundDisabled: {
			hex: "#ECEEF3",
			hexDark: "#313131",
		},
		backgroundDisabledFaded: {
			hex: "#F4F5F7",
			hexDark: "#262626",
		},

		borderPrimary: {
			hex: "#3D76C7",
			hexDark: "#5A91E0",
		},
		borderPrimaryFaded: {
			hex: "#c6d9f4",
			hexDark: "#163a6a",
		},
		borderNeutral: {
			hex: "#d2d2d2",
			hexDark: "#414141",
		},
		borderNeutralFaded: {
			hex: "#E2E2E2",
			hexDark: "#464646",
		},
		borderDisabled: {
			hex: "#E2E2E2",
			hexDark: "#404040",
		},
	},
	unit: {
		...reshapedDefinition.unit,
		radiusSmall: {
			px: 2,
		},
		radiusMedium: {
			px: 4,
		},
		radiusLarge: {
			px: 6,
		},
	},
};

export default theme;
