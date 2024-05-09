import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import transform from "./_generator/transform";
import generateColors from "./_generator/utilities/generateColors";

export { default as baseThemeDefinition } from "./_generator/definitions/reshaped";

export const generateThemeColors = (options: {
	primary: T.Color;
	critical?: T.Color;
	positive?: T.Color;
	neutral?: T.Color;
}) => {
	return generateColors(options);
};

export const getThemeCSS = (
	name: string,
	definition: T.PartialDeep<FullThemeDefinition>,
	options?: T.PublicOptions["themeOptions"]
) => {
	const code = transform(name, definition, { themeOptions: options, isFragment: true });
	return code.variables;
};
