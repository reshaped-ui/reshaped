import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./textAlign.css";

const textAlign: T.StyleResolver<T.TextAlign> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-text-align", value),
	};
};

export default textAlign;
