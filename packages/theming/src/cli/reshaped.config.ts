import figmaDefinition from "@/generation/definitions/figma";
import slateDefinition from "@/generation/definitions/slate";
import type { ReshapedConfig } from "@/types/config";

const config: ReshapedConfig = {
	themes: {
		slate: slateDefinition,
		figma: figmaDefinition,
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
