import { responsiveClassNames } from "utilities/helpers";
import * as T from "styles/types";
import s from "./radius.module.css";

const getRadiusStyles: T.StaticStyleUtility<T.Radius> = (value) => {
	if (!value) return null;

	return {
		classNames: responsiveClassNames(s, "--radius", value),
	};
};

export default getRadiusStyles;
