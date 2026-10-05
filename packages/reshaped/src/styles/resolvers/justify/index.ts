import { responsiveVariables } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import "./justify.css";

const justify: T.StyleResolver<T.Justify> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-justify", value),
	};
};

export default justify;
