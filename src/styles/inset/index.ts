import { responsiveVariables } from "utilities/helpers";
import * as T from "styles/types";
import * as G from "types/global";
import "./inset.css";

const getInsetStyles: (
	value?: G.Responsive<number | "auto">,
	side?: "top" | "bottom" | "start" | "end"
) => T.VariableStyleUtilityResult = (value, side) => {
	if (value === undefined) return null;
	const suffix = side ? `-${side}` : "";
	const variableName = `--rs-inset${suffix}` as const;
	const variables = responsiveVariables(variableName, value);

	return { variables };
};

export default getInsetStyles;
