import type { Transformer } from "../types";
import type * as T from "./zIndex.types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "zIndex",
		type: "variable",
		value: `${token.level}`,
	},
];

export default transformToken;
