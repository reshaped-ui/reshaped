import type * as T from "./color.types";
import type { Transformer, TransformedToken } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => {
	const hasDarkMode = !!token.hexDark;
	const defaultMode = hasDarkMode ? "light" : undefined;

	const result: TransformedToken[] = [
		{ name, tokenType: "color", type: "variable", value: token.hex, mode: defaultMode },
	];

	if (token.hexDark) {
		result.push({
			name,
			tokenType: "color",
			type: "variable",
			value: token.hexDark,
			mode: "dark",
		});
	}

	return result;
};

export default transformedToken;
