import { responsiveClassNames, responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import s from "./height.module.css";

const getHeightStyles: T.StyleResolver<T.Height> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default getHeightStyles;
