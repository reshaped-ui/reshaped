import { PartialUserThemeDefinition } from "themes/_generator/tokens/types";

export type ReshapedConfig = {
	themes?: Record<string, PartialUserThemeDefinition>;
	themeFragments?: Record<string, PartialUserThemeDefinition>;
	themeOptions?: {
		generateOnColorsFor?: string[];
	};
};
