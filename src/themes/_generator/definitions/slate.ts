import reshapedDefinition from "./reshaped";
import type { ThemeDefinition } from "../tokens/types";
import generateColors from "../tokens/color/utilities/generateColors";

const theme: ThemeDefinition = {
	...reshapedDefinition,
	color: generateColors(),
	unit: reshapedDefinition.unit,
};

export default theme;
