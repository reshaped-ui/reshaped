import { responsiveClassNames } from "utilities/props";
import * as T from "styles/types";
import s from "./radius.module.css";

const radius: T.StyleResolver<T.Radius> = (value) => {
	if (!value) return {};

	return {
		classNames: [s.root, ...responsiveClassNames(s, "--radius", value)],
	};
};

export default radius;
