import { responsiveClassNames, responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import s from "./height.module.css";

const getHeightStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames, variables };
};

export default getHeightStyles;
