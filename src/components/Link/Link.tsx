import { forwardRef } from "react";

import Actionable, { type ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import { classNames } from "utilities/props";

import s from "./Link.module.css";

import type * as T from "./Link.types";

const Link = forwardRef<ActionableRef, T.Props>((props, ref) => {
	const {
		icon,
		disabled,
		href,
		color = "primary",
		variant = "underline",
		className,
		children,
		attributes,
		type,
		onClick,
		stopPropagation,
		render,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`],
		color && s[`--color-${color}`],
		icon && s["--with-icon"]
	);

	return (
		<Actionable
			href={href}
			disabled={disabled}
			className={rootClassNames}
			attributes={attributes}
			type={type}
			onClick={onClick}
			ref={ref}
			stopPropagation={stopPropagation}
			render={render}
		>
			{icon && <Icon svg={icon} />}
			{children}
		</Actionable>
	);
});

Link.displayName = "Link";

export default Link;
