import { responsiveClassNames, responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./minWidth.module.css";

const getMinWidthStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-min-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "root-unit" : "root-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames, variables };
};

export default getMinWidthStyles;
