import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./padding.css";

const getPaddingStyles: T.StyleResolver<T.Padding> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-p", value);

	return { variables };
};

export default getPaddingStyles;
