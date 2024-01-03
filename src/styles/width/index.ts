import { responsiveClassNames, responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./width.module.css";

const getWidthStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "root-unit" : "root-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames, variables };
};

export default getWidthStyles;
