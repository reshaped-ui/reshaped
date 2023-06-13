import { responsiveClassNames, responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./maxHeight.module.css";

const getMaxHeightStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-max-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "unit" : "literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames, variables };
};

export default getMaxHeightStyles;
