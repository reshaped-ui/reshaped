import figmaDefinition from "themes/_generator/definitions/figma";
import reshapedDefinition from "themes/_generator/definitions/reshaped";
import slateDefinition from "themes/_generator/definitions/slate";

import type { ReshapedConfig } from "types/config";

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
				onBackgroundPrimary: { hex: "#ffffff" },
			},
		},
	},
};

export default config;
