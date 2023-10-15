/**
 * Aligner is a utility used across multiple components to apply
 * negative margin based on the component padding to align its text content
 * visually with the rest of the page
 *
 * It relies on using a data-rs-aligner-target attribute in other components and works based
 * on the --rs-p, --rs-p-v and --rs-p-h css variables
 */

import React from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./Aligner.types";
import s from "./Aligner.module.css";

const Aligner = (props: T.Props) => {
	const { side: passedSide = "all", children, className, attributes } = props;
	const sides = typeof passedSide === "string" ? [passedSide] : passedSide;

	const rootClassNames = classNames(
		s.root,
		sides.map((side) => s[`--side-${side}`]),
		className
	);

	return (
		<div {...attributes} className={rootClassNames}>
			{children}
		</div>
	);
};

export default Aligner;
