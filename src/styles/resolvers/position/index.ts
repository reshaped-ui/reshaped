import * as T from "styles/types";
import { responsiveVariables } from "utilities/props";
import "./position.css";

const position: T.StyleResolver<T.Position> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-position", value);

	return { variables };
};

export default position;
