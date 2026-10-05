import { responsiveClassNames } from "@/utilities/props.js";
import * as T from "@/styles/types.js";
import s from "./radius.module.css";

const radius: T.StyleResolver<T.Radius> = (value) => {
	if (!value) return {};

	return {
		classNames: [s.root, ...responsiveClassNames(s, "--radius", value)],
	};
};

export default radius;
