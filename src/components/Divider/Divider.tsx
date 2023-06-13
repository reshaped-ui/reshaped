import React from "react";
import { classNames, responsiveClassNames } from "utilities/helpers";
import type * as T from "./Divider.types";
import s from "./Divider.module.css";

const Divider = (props: T.Props) => {
	const { vertical, blank, className, attributes } = props;
	const rootClassNames = classNames(
		s.root,
		className,
		blank && s["--blank"],
		...responsiveClassNames(s, "--vertical", vertical)
	);

	// Only support aria-orientation for non-responsive dividers
	let ariaOrientation: React.AriaAttributes["aria-orientation"];
	if (typeof vertical === "boolean" || vertical === undefined) {
		ariaOrientation = vertical ? "vertical" : "horizontal";
	}

	return (
		<div
			{...attributes}
			role="separator"
			aria-orientation={ariaOrientation}
			className={rootClassNames}
		/>
	);
};

export default Divider;
