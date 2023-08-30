import type * as T from "./fontFamily.types";
import type { Transformer } from "../types";

const transformedToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "fontFamily",
		type: "variable",
		value: `${token.family}`,
	},
];

export default transformedToken;
