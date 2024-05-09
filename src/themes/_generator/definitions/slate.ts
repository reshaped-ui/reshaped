import reshapedDefinition from "./reshaped";
import { ThemeDefinition } from "../tokens/types";
import generateColors from "../utilities/generateColors";

const theme: ThemeDefinition = {
	...reshapedDefinition,
	color: generateColors(),
	unit: reshapedDefinition.unit,
};

export default theme;
