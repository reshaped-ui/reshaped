import type * as T from "./duration.types";
import type { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "duration",
		type: "variable",
		value: `${token.ms}ms`,
	},
];

export default transformedToken;
