import { responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import s from "./justify.module.css";

const getJustifyStyles: T.StaticStyleUtility<T.Justify> = (value) => {
	if (!value) return null;

	return {
		classNames: responsiveClassNames(s, "--justify", value),
	};
};

export default getJustifyStyles;
