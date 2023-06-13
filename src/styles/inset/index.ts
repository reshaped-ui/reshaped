import { responsiveVariables, responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import * as G from "types/global";
import s from "./inset.module.css";

const getInsetStyles: (
	value?: G.Responsive<number>,
	side?: "top" | "bottom" | "start" | "end"
) => T.DynamicStyleUtilityResult = (value, side) => {
	if (value === undefined) return null;
	const suffix = side ? `-${side}` : "";
	const variableName = `--rs-inset${suffix}` as const;
	const variables = responsiveVariables(variableName, value);
	const classNames = responsiveClassNames(s, `--inset${suffix}`, value, {
		excludeValueFromClassName: true,
	});

	return { classNames, variables };
};

export default getInsetStyles;
