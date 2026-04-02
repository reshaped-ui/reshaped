import * as T from "@/styles/types";

import s from "./shadow.module.css";

import type { ClassName } from "@reshaped/utilities";

const shadow: (value: T.Shadow) => { classNames?: ClassName; variables?: React.CSSProperties } = (
	value
) => {
	if (!value) return {};
	return { classNames: [s.root, s[`--shadow-${value}`]] };
};

export default shadow;
