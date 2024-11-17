import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import "./justify.css";

const getJustifyStyles: T.VariableStyleUtility<T.Justify> = (value) => {
	if (!value) return null;

	return {
		variables: responsiveVariables("--rs-justify", value),
	};
};

export default getJustifyStyles;
