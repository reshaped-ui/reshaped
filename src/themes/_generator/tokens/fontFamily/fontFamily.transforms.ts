import type * as T from "./fontFamily.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "fontFamily",
		type: "variable",
		value: `${token.family}`,
	},
];

export default transformToken;
