import type * as T from "./viewport.types";
import type { TransformedToken, Transformer } from "../types";

const transformToken: Transformer<T.Token | T.SToken> = (name, token) => {
	const value: string[] = [];

	if (token.minPx) value.push(`(min-width: ${token.minPx}px)`);
	if (token.maxPx) value.push(`(max-width: ${token.maxPx}px)`);

	const result: TransformedToken[] = [
		{
			name,
			tokenType: "viewport",
			type: "media",
			value: value.join(" and "),
		},
	];

	if (token.minPx) {
		result.push({
			name: `${name}-min`,
			tokenType: "viewport",
			type: "variable",
			value: token.minPx.toString(),
		});
	}

	return result;
};

export default transformToken;
