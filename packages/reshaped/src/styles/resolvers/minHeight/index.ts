import * as T from "styles/types";
import { responsiveClassNames, responsiveVariables } from "utilities/props";

import s from "./minHeight.module.css";

const minHeight: T.StyleResolver<T.MinHeight> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-min-h", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default minHeight;
