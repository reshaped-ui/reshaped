import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./textAlign.css";

const getTextAlignStyles: T.VariableStyleUtility<T.TextAlign> = (value) => {
	if (!value) return null;

	return {
		variables: responsiveVariables("--rs-text-align", value),
	};
};

export default getTextAlignStyles;
