import {
	responsiveClassNames,
	responsiveVariables,
	responsivePropDependency,
} from "utilities/props";
import * as T from "styles/types";
import s from "./bleed.module.css";

const getBleedStyles: T.StyleResolver<T.Bleed> = (value) => {
	if (value === undefined) return {};

	const classNames = responsiveClassNames(
		s,
		"--bleed",
		responsivePropDependency(value, (value) => typeof value === "number" && value > 0)
	);
	const variables = responsiveVariables("--rs-bleed", value);

	return { classNames: [s.root, classNames], variables };
};

export default getBleedStyles;
