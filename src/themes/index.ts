import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import transform from "./_generator/transform";
import generateColors from "./_generator/generateColors";

export const generateTheme = (args?: {
	primary?: string;
	critical?: string;
	positive?: string;
	neutral?: string;
}) => {
	return generateColors({
		primary: args?.primary || "#5a58f2",
		critical: args?.critical || "#e22c2c",
		positive: args?.positive || "#118850",
		neutral: args?.neutral || "#dfe2ea",
	});
};

export const getThemeCSS = (name: string, definition: T.PartialDeep<FullThemeDefinition>) => {
	const code = transform(name, definition, { isFragment: true });
	return code.variables;
};
