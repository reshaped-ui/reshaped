import { responsiveVariables } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import "./textAlign.css";

const textAlign: T.StyleResolver<T.TextAlign> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-text-align", value),
	};
};

export default textAlign;
