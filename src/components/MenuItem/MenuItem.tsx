import { forwardRef } from "react";
import { classNames, responsiveClassNames, responsivePropDependency } from "utilities/helpers";
import Actionable, { ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import View from "components/View";
import MenuItemAligner from "./MenuItemAligner";
import type * as T from "./MenuItem.types";
import s from "./MenuItem.module.css";

const MenuItem = forwardRef((props: T.Props, ref: ActionableRef) => {
	const {
		icon,
		startSlot,
		endSlot,
		children,
		color = "primary",
		selected,
		disabled,
		onClick,
		href,
		size = "medium",
		roundedCorners,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		responsiveClassNames(s, "--size", size),
		responsiveClassNames(s, "--rounded-corners", roundedCorners),
		color && s[`--color-${color}`],
		selected && s["--selected"],
		disabled && s["--disabled"]
	);
	const gapSize = responsivePropDependency(size, (size) => (size === "large" ? 3 : 2));
	const iconSize = responsivePropDependency(size, (size) => (size === "large" ? 5 : 4));

	return (
		<Actionable
			disabled={disabled}
			className={rootClassNames}
			attributes={{ ...attributes, "data-rs-aligner-target": true }}
			onClick={onClick}
			href={href}
			ref={ref}
		>
			<View direction="row" gap={gapSize} align="center">
				{icon && <Icon svg={icon} className={s.icon} size={iconSize} />}
				{!icon && startSlot}
				{children && (
					<View.Item grow className={s.content}>
						{children}
					</View.Item>
				)}
				{endSlot}
			</View>
		</Actionable>
	);
}) as T.Export;

MenuItem.Aligner = MenuItemAligner;

export default MenuItem;
