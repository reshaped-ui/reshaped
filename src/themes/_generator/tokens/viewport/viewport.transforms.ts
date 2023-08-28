import type * as T from "./viewport.types";
import type { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => {
	const value: string[] = [];

	if (token.minPx) value.push(`(min-width: ${token.minPx}px)`);
	if (token.maxPx) value.push(`(max-width: ${token.maxPx}px)`);

	return [
		{
			name,
			tokenType: "viewport",
			type: "media",
			value: value.join(" and "),
		},
	];
};

export default transformedToken;
