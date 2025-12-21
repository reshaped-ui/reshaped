import generateColors from "themes/_generator/tokens/color/utilities/generateColors";

import reshapedDefinition from "./reshaped";

import type { PassedThemeDefinition } from "themes/_generator/tokens/types";

const theme: PassedThemeDefinition = {
	...reshapedDefinition,
	color: generateColors(),
};

export default theme;
