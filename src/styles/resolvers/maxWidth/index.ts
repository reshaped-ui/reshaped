import { responsiveClassNames, responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import s from "./maxWidth.module.css";

const getMaxWidthStyles: T.DynamicStyleUtility<string | number> = (value) => {
	if (!value) return null;
	const variables = responsiveVariables("--rs-max-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default getMaxWidthStyles;
