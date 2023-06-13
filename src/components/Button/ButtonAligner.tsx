import React from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./Button.types";
import s from "./Button.module.css";

const ButtonAligner = (props: T.AlignerProps) => {
	const { children, position: passedPosition, className, attributes } = props;
	const position = typeof passedPosition === "string" ? [passedPosition] : passedPosition;

	const positionClassNames = position
		? position.map((p) => s[`--aligner-position-${p}`])
		: [s["--aligner-position-all"]];
	const rootClassNames = classNames(s.aligner, className, ...positionClassNames);

	return (
		<div {...attributes} className={rootClassNames}>
			{children}
		</div>
	);
};

export default ButtonAligner;
