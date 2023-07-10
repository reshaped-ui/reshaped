import reshapedDefinition from "cli/theming/definitions/reshaped";
import figmaDefinition from "cli/theming/definitions/figma";
import slateDefinition from "cli/theming/definitions/slate";
import { ReshapedConfig } from "types/config";

const config: ReshapedConfig = {
	themes: {
		reshaped: reshapedDefinition,
		figma: figmaDefinition,
		slate: slateDefinition,
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
