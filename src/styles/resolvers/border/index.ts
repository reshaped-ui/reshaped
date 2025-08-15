import { responsiveClassNames } from "utilities/props";
import * as T from "styles/types";
import s from "./border.module.css";

const border: T.StyleResolver<T.BorderColor> = (value) => {
	if (!value) return {};

	return {
		classNames: [s.root, ...responsiveClassNames(s, "--border", value)],
	};
};

export default border;
