import React from "react";
import { classNames } from "utilities/helpers";
import type * as T from "./MenuItem.types";
import s from "./MenuItem.module.css";

const MenuItemAligner = (props: T.AlignerProps) => {
	const { children, className, attributes } = props;

	const rootClassNames = classNames(s.aligner, className);

	return (
		<div {...attributes} className={rootClassNames}>
			{children}
		</div>
	);
};

export default MenuItemAligner;
