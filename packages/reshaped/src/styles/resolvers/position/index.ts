import { responsiveVariables } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import "./position.css";

const position: T.StyleResolver<T.Position> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-position", value);

	return { variables };
};

export default position;
