import { forwardRef } from "react";

import Actionable, { type ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/props";

import s from "./Button.module.css";

import type * as T from "./Button.types";

const Button = forwardRef<ActionableRef, T.Props>((props, ref) => {
	const {
		variant = "solid",
		color = "neutral",
		elevated,
		highlighted,
		fullWidth,
		loading,
		loadingAriaLabel,
		disabled,
		type,
		href,
		size = "medium",
		children,
		rounded,
		onClick,
		icon,
		endIcon,
		stopPropagation,
		as,
		render,
		className,
		attributes,
	} = props;
	const iconOnly = (icon || endIcon) && !children;
	const rootClassName = classNames(
		s.root,
		className,
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`],
		responsiveClassNames(s, "--size", size),
		responsiveClassNames(s, "--full-width", fullWidth),
		elevated && variant !== "ghost" && s["--elevated"],
		rounded && s["--rounded"],
		disabled && s["--disabled"],
		loading && s["--loading"],
		highlighted && s["--highlighted"],
		iconOnly && s["--icon-only"]
	);

	const renderIcon = (position: "start" | "end") => {
		const isStartValid = position === "start" && icon;
		const isEndValid = position === "end" && endIcon;
		const isInvalid = !(isStartValid || isEndValid);

		if (isInvalid) return null;

		const iconClassName = classNames(s.icon, position === "end" && s["--icon-position-end"]);
		const iconSize = responsivePropDependency(size, (size) => {
			if (size === "large") return 5;
			if (size === "xlarge") return 6;
			return 4;
		});

		return (
			<Icon
				className={iconClassName}
				svg={(position === "start" ? icon : endIcon)!}
				size={iconSize}
				autoWidth
			/>
		);
	};

	return (
		<Actionable
			disabled={disabled || loading}
			className={rootClassName}
			attributes={{
				...attributes,
				"data-rs-aligner-target": true,
			}}
			type={type}
			onClick={onClick}
			href={href}
			ref={ref}
			as={as}
			stopPropagation={stopPropagation}
			render={render}
		>
			{loading && (
				<div className={s.loader}>
					<Loader color="inherit" attributes={{ "aria-label": loadingAriaLabel }} />
				</div>
			)}
			{renderIcon("start")}
			{children && <span className={s.text}>{children}</span>}
			{renderIcon("end")}
		</Actionable>
	);
});

Button.displayName = "Button";

export default Button;
