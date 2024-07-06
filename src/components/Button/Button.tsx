import { forwardRef } from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/helpers";
import Icon from "components/Icon";
import Loader from "components/Loader";
import Actionable, { type ActionableRef } from "components/Actionable";
import ButtonGroup from "./ButtonGroup";
import ButtonAligner from "./ButtonAligner";
import type * as T from "./Button.types";
import s from "./Button.module.css";

const Button = forwardRef((props: T.Props, ref: ActionableRef) => {
	const {
		variant = "solid",
		color = "neutral",
		elevated,
		highlighted,
		fullWidth,
		loading,
		disabled,
		type,
		href,
		size = "medium",
		children,
		rounded,
		onClick,
		icon,
		endIcon,
		as,
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
			attributes={{ ...attributes, "data-rs-aligner-target": true }}
			type={type}
			onClick={onClick}
			href={href}
			ref={ref}
			as={as}
		>
			{loading && (
				<div className={s.loader}>
					<Loader size="small" color="inherit" />
				</div>
			)}
			{renderIcon("start")}
			{children && <span className={s.text}>{children}</span>}
			{renderIcon("end")}
		</Actionable>
	);
}) as T.Export;

Button.Group = ButtonGroup;
Button.Aligner = ButtonAligner;

export default Button;
