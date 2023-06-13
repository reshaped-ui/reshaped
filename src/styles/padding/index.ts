import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./padding.module.css";

const getPaddingStyles: T.DynamicStyleUtility<number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-p", value);

	return { classNames: s.root, variables };
};

export default getPaddingStyles;
