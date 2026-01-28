import { getVariableName } from "../css";

import type * as T from "./radius.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => {
	if ("radiusToken" in token) {
		return [
			{
				name,
				tokenType: "radius",
				type: "variable",
				value: `var(${getVariableName(token.radiusToken, "radius")})`,
			},
		];
	}

	return [
		{
			name,
			tokenType: "radius",
			type: "variable",
			value: `${token.px}px`,
		},
	];
};

export default transformToken;
