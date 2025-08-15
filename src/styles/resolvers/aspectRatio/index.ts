import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./aspectRatio.css";

const getAspectRatioStyles: T.StyleResolver<T.AspectRatio> = (value) => {
	if (!value) return {};

	return {
		variables: responsiveVariables("--rs-ratio", value),
	};
};

export default getAspectRatioStyles;
