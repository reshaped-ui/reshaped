import reshapedDefinition from "./reshaped";
import type { PassedThemeDefinition } from "themes/_generator/tokens/types";
import generateColors from "themes/_generator/tokens/color/utilities/generateColors";

const theme: PassedThemeDefinition = {
	...reshapedDefinition,
	color: generateColors(),
	unit: reshapedDefinition.unit,
};

export default theme;
