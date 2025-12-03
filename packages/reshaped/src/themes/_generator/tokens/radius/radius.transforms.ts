import type * as T from "./radius.types";
import type { Transformer } from "../types";

const transformToken: Transformer<T.Token> = (name, token) => [
	{
		name,
		tokenType: "radius",
		type: "variable",
		value: `${token.px}px`,
	},
];

export default transformToken;
