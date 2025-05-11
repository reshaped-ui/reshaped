import { responsiveClassNames } from "utilities/props";
import * as T from "styles/types";
import s from "./border.module.css";

const getBorderStyles: T.StaticStyleUtility<T.BorderColor> = (value) => {
	if (!value) return null;

	return {
		classNames: [s.root, ...responsiveClassNames(s, "--border", value)],
	};
};

export default getBorderStyles;
