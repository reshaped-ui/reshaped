import reshapedDefinition from "./reshaped";
import type { ThemeDefinition } from "themes/_generator/tokens/types";
import generateColors from "themes/_generator/tokens/color/utilities/generateColors";

const theme: ThemeDefinition = {
	...reshapedDefinition,
	color: generateColors(),
	unit: reshapedDefinition.unit,
};

export default theme;
