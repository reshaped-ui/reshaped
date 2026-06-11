import type { Transformer } from "../types";
import type * as T from "./fontFamily.types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "fontFamily",
		type: "variable",
		value: `${token.family}`,
	},
];

export default transformToken;
