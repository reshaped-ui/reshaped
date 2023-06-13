import { responsiveClassNames, responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./maxWidth.module.css";

const getMaxWidthStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-max-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "unit" : "literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames, variables };
};

export default getMaxWidthStyles;
