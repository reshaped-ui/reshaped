import {
	responsiveClassNames,
	responsiveVariables,
	responsivePropDependency,
} from "utilities/helpers";
import * as T from "styles/types";
import s from "./bleed.module.css";

const getBleedStyles: T.DynamicStyleUtility<number> = (value) => {
	if (value === undefined) return null;

	const classNames = [
		s.root,
		...responsiveClassNames(
			s,
			"--bleed",
			responsivePropDependency(value, (value) => typeof value === "number" && value > 0)
		),
	];
	const variables = responsiveVariables("--rs-bleed", value);

	return { classNames, variables };
};

export default getBleedStyles;
