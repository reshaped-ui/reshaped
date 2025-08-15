import { responsiveClassNames, responsiveVariables } from "utilities/props";
import * as T from "styles/types";
import s from "./minWidth.module.css";

const getMinWidthStyles: T.StyleResolver<T.MinWidth> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-min-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default getMinWidthStyles;
