import { responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import s from "./align.module.css";

const getAlignStyles: T.StaticStyleUtility<T.Align> = (value) => {
	if (!value) return null;

	return {
		classNames: responsiveClassNames(s, "--align", value),
	};
};

export default getAlignStyles;
