import React from "react";
import { classNames } from "utilities/helpers";
import getHeightStyles from "styles/height";
import type * as T from "./Icon.types";
import s from "./Icon.module.css";

const Icon = (props: T.Props) => {
	const { svg: Component, className, color, size = "1em", autoWidth, attributes } = props;
	const heightStyles = getHeightStyles(size);
	const rootClassName = classNames(
		s.root,
		className,
		heightStyles?.classNames,
		color && s[`--color-${color}`],
		autoWidth && s["--auto"]
	);

	const icon = React.isValidElement(Component) ? (
		Component
	) : (
		// @ts-ignore
		<Component />
	);
	const style = { ...attributes?.style, ...heightStyles?.variables };

	return (
		// All icons are decorative, a11y attributes should be set for buttons wrapping them
		<span {...attributes} aria-hidden="true" className={rootClassName} style={style}>
			{React.cloneElement(icon, { focusable: false })}
		</span>
	);
};

export default Icon;
