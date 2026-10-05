import { responsiveVariables } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import "./align.css";

const align: T.StyleResolver<T.Align> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-align", value),
	};
};

export default align;
