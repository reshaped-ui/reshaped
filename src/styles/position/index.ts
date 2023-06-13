import { responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import s from "./position.module.css";

const getPositionStyles: T.StaticStyleUtility<T.Position> = (value) => {
	if (!value) return null;
	const classNames = responsiveClassNames(s, "--position", value);

	return { classNames };
};

export default getPositionStyles;
