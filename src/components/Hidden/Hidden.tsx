import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Hidden.types";
import s from "./Hidden.module.css";

const Hidden = (props: T.Props) => {
	const { as: TagName = "div", children, visibility, hide, displayStyle } = props;
	const rootClassNames = classNames(
		s.root,
		...responsiveClassNames(s, "--hidden", hide),
		visibility && s["--visibility"],
		displayStyle && s[`--display-${displayStyle}`]
	);

	if (typeof children === "function") return <>{children(rootClassNames)}</>;
	return <TagName className={rootClassNames}>{children}</TagName>;
};

export default Hidden;
