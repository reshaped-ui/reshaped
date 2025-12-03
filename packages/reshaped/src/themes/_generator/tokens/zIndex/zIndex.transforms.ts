import type * as T from "./zIndex.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "zIndex",
		type: "variable",
		value: `${token.level}`,
	},
];

export default transformToken;
