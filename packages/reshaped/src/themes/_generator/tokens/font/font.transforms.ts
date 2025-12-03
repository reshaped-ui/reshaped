import { getVariableName } from "../css";

import type * as T from "./font.types";
import type { Transformer, TransformedToken } from "../types";

const BASE_REM_SIZE = 16;

const transformToken: Transformer<T.Token> = (name, token) => {
	const result: TransformedToken[] = [];

	result.push({
		name,
		tokenType: "fontSize",
		type: "variable",
		value: `${token.fontSize.px / BASE_REM_SIZE}rem`,
	});

	result.push({
		name,
		tokenType: "lineHeight",
		type: "variable",
		value: `${token.lineHeight.px / BASE_REM_SIZE}rem`,
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

	result.push({
		name,
		tokenType: "letterSpacing",
		type: "variable",
		value: token.letterSpacing ? `${token.letterSpacing.px}px` : "normal",
	});

	return result;
};

export default transformToken;
