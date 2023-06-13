import type * as T from "./fontWeight.types";
import { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "fontWeight",
		type: "variable",
		value: token.weight.toString(),
	},
];

export default transformedToken;
