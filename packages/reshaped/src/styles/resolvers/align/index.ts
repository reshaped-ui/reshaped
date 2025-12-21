import * as T from "styles/types";
import { responsiveVariables } from "utilities/props";
import "./align.css";

const align: T.StyleResolver<T.Align> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-align", value),
	};
};

export default align;
