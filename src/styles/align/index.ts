import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./align.css";

const getAlignStyles: T.VariableStyleUtility<T.Align> = (value) => {
	if (!value) return null;

	return {
		variables: responsiveVariables("--rs-align", value),
	};
};

export default getAlignStyles;
