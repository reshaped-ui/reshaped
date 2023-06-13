import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./aspectRatio.module.css";

const getAspectRatioStyles: T.DynamicStyleUtility<number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-ratio", value);

	return { classNames: s.root, variables };
};

export default getAspectRatioStyles;
