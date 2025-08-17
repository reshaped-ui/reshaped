import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./justify.css";

const justify: T.StyleResolver<T.Justify> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-justify", value),
	};
};

export default justify;
