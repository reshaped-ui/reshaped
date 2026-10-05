import { responsiveVariables } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import "./aspectRatio.css";

const aspectRatio: T.StyleResolver<T.AspectRatio> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-ratio", value),
	};
};

export default aspectRatio;
