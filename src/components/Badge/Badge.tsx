import React from "react";
import { classNames } from "utilities/helpers";
import Text from "components/Text";
import Icon from "components/Icon";
import IconClose from "icons/Close";
import Actionable from "components/Actionable";
import type * as T from "./Badge.types";
import BadgeContainer from "./BadgeContainer";
import s from "./Badge.module.css";

const Badge = (props: T.Props) => {
	const {
		children,
		color,
		rounded,
		size = "medium",
		icon,
		endIcon,
		variant,
		hidden,
		href,
		onClick,
		onDismiss,
		dismissAriaLabel,
		className,
		attributes,
	} = props;
	const isActionable = !!(onClick || href);
	const iconSize = size === "large" ? 4 : 3.5;
	const rootClassName = classNames(
		s.root,
		className,
		rounded && s["--rounded"],
		hidden && s["--hidden"],
		size && s[`--size-${size}`],
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`],
		isActionable && s["--actionable"]
	);

	return (
		<Actionable onClick={onClick} href={href} className={rootClassName} attributes={attributes}>
			{icon && <Icon svg={icon} autoWidth size={iconSize} />}
			{children && (
				<Text
					variant={size === "large" ? "body-3" : "caption-1"}
					weight="medium"
					attributes={{
						"aria-hidden": hidden ? "true" : undefined,
					}}
				>
					{children}
				</Text>
			)}
			{endIcon && <Icon svg={endIcon} autoWidth size={iconSize} />}
			{onDismiss && (
				<Actionable
					onClick={onDismiss}
					className={s.dismiss}
					as="span"
					attributes={{ "aria-label": dismissAriaLabel }}
				>
					<Icon svg={IconClose} size={iconSize} />
				</Actionable>
			)}
		</Actionable>
	);
};

Badge.Container = BadgeContainer;
export default Badge;
