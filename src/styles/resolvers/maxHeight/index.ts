import * as T from "styles/types";
import { responsiveClassNames, responsiveVariables } from "utilities/props";

import s from "./maxHeight.module.css";

const maxHeight: T.StyleResolver<T.MaxHeight> = (value) => {
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

export default maxHeight;
