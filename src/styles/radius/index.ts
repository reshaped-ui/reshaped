import { responsiveClassNames } from "utilities/props";
import * as T from "styles/types";
import s from "./radius.module.css";

const getRadiusStyles: T.StaticStyleUtility<T.Radius> = (value) => {
	if (!value) return null;

	return {
		classNames: [s.root, ...responsiveClassNames(s, "--radius", value)],
	};
};

export default getRadiusStyles;
