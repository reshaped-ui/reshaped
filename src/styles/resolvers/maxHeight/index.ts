import { responsiveClassNames, responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import s from "./maxHeight.module.css";

const getMaxHeightStyles: T.StyleResolver<T.MaxHeight> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-max-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default getMaxHeightStyles;
