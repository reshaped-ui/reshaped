import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./position.css";

const getPositionStyles: T.StyleResolver<T.Position> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-position", value);

	return { variables };
};

export default getPositionStyles;
