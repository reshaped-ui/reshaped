import definition from "cli/theming/definitions/reshaped";
import { ReshapedConfig } from "types/config";

const config: ReshapedConfig = {
	themes: {
		reshaped: definition,
	},

	themeFragments: {
		twitter: {
			color: {
				backgroundPrimary: { hex: "#1da1f2" },
				backgroundPrimaryHighlighted: { hex: "#1a90da" },
			},
		},
	},

	themeOptions: {},
};

export default config;
