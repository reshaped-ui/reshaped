import type * as T from "./unit.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "unit",
		type: "variable",
		value: `${token.px}px`,
	},
];

export default transformToken;
