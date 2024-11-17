import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import "./padding.css";

const getPaddingStyles: T.VariableStyleUtility<number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-p", value);

	return { variables };
};

export default getPaddingStyles;
