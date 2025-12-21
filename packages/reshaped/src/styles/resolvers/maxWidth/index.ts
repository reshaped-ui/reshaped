import * as T from "styles/types";
import { responsiveClassNames, responsiveVariables } from "utilities/props";

import s from "./maxWidth.module.css";

const maxWidth: T.StyleResolver<T.MaxWidth> = (value) => {
	if (!value) return {};
	const variables = responsiveVariables("--rs-max-w", value);
	const classNames = responsiveClassNames(
		s,
		(value) => (typeof value === "number" ? "--type-unit" : "--type-literal"),
		value,
		{ excludeValueFromClassName: true }
	);

	return { classNames: [s.root, classNames], variables };
};

export default maxWidth;
