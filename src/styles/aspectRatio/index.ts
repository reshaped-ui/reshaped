import { responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import "./aspectRatio.css";

const getAspectRatioStyles: T.VariableStyleUtility<number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-ratio", value);

	return { variables };
};

export default getAspectRatioStyles;
