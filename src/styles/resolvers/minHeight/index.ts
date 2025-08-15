import { responsiveClassNames, responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import s from "./minHeight.module.css";

const getMinHeightStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-min-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default getMinHeightStyles;
