import type * as T from "themes/_generator/types";
import type { FullThemeDefinition } from "themes/_generator/tokens/types";
import transform from "./_generator/transform";

export const getThemeCSS = (name: string, definition: T.PartialDeep<FullThemeDefinition>) => {
	const code = transform(name, definition, { isFragment: true });
	return code.variables;
};
