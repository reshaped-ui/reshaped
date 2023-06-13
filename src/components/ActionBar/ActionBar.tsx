import React from "react";
import { classNames } from "utilities/helpers";
import View from "components/View";
import type * as T from "./ActionBar.types";
import s from "./ActionBar.module.css";

const ActionBar = (props: T.Props) => {
	const {
		position = "bottom",
		padding,
		paddingBlock = 3,
		paddingInline = 4,
		children,
		elevated,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		elevated && s["--elevated"],
		position && s[`--position-${position}`],
		className
	);

	return (
		<View
			className={rootClassNames}
			attributes={attributes}
			paddingBlock={padding || paddingBlock}
			paddingInline={padding || paddingInline}
		>
			{children}
		</View>
	);
};

export default ActionBar;
