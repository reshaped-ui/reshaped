import * as T from "styles/types";
import { responsiveClassNames, responsiveVariables } from "utilities/props";

import s from "./width.module.css";

const width: T.StyleResolver<T.Width> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default width;
