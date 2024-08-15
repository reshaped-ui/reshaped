import { responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import s from "./textAlign.module.css";

const getTextAlignStyles: T.StaticStyleUtility<T.TextAlign> = (value) => {
	if (!value) return null;

	return {
		classNames: [...responsiveClassNames(s, "--text-align", value)],
	};
};

export default getTextAlignStyles;
