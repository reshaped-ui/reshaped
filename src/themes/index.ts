import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import transform from "./_generator/transform";
import generateColors from "./_generator/utilities/generateColors";
import reshapedDefinition from "./_generator/definitions/reshaped";
import baseDefinition from "./_generator/definitions/base";
import mergeDefinitions from "./_generator/utilities/mergeDefinitions";

export const baseThemeDefinition = mergeDefinitions(reshapedDefinition, baseDefinition);

export const generateThemeColors = (options: {
	primaryColor: string;
	criticalColor?: string;
	positiveColor?: string;
	neutralColor?: string;
}) => {
	return generateColors(options);
};

export const getThemeCSS = (name: string, definition: T.PartialDeep<FullThemeDefinition>) => {
	const code = transform(name, definition, { isFragment: true });
	return code.variables;
};
