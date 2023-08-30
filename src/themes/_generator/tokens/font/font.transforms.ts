import type * as T from "./font.types";
import type { Transformer, TransformedToken } from "../types";
import { getVariableName } from "../../utilities/css";

const transformedToken: Transformer<T.Token> = (name, token) => {
	const result: TransformedToken[] = [];

	result.push({
		name,
		tokenType: "fontSize",
		type: "variable",
		value: `${token.fontSize.px}px`,
	});

	result.push({
		name,
		tokenType: "lineHeight",
		type: "variable",
		value: `${token.lineHeight.px}px`,
	});

	if (token.fontFamilyToken) {
		result.push({
			name,
			tokenType: "fontFamily",
			type: "variable",
			value: `var(${getVariableName(token.fontFamilyToken, "fontFamily")})`,
		});
	}

	if (token.fontWeightToken) {
		result.push({
			name,
			tokenType: "fontWeight",
			type: "variable",
			value: `var(${getVariableName(token.fontWeightToken, "fontWeight")})`,
		});
	}

	return result;
};

export default transformedToken;
