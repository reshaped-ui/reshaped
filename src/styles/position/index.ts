import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import "./position.css";

const getPositionStyles: T.DynamicStyleUtility<T.Position> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-position", value);

	return { variables };
};

export default getPositionStyles;
