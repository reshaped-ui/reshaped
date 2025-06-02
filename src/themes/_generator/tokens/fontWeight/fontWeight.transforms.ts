import type * as T from "./fontWeight.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "fontWeight",
		type: "variable",
		value: token.weight.toString(),
	},
];

export default transformToken;
