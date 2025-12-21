import { forwardRef } from "react";

import Actionable, { type ActionableProps, type ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import Text from "components/Text";
import IconClose from "icons/Close";
import { classNames } from "utilities/props";

import s from "./Badge.module.css";

import type * as T from "./Badge.types";

const Badge = forwardRef<ActionableRef, T.Props>((props, ref) => {
	const {
		children,
		color,
		rounded,
		size = "medium",
		icon,
		endIcon,
		variant,
		hidden,
		highlighted,
		href,
		onClick,
		onDismiss,
		dismissAriaLabel,
		className,
		attributes,
		as,
	} = props;
	const isActionable = !!(onClick || href);
	const iconSize = size === "small" ? 3 : 4;
	const rootClassName = classNames(
		s.root,
		className,
		rounded && s["--rounded"],
		hidden && s["--hidden"],
		size && s[`--size-${size}`],
		color && s[`--color-${color}`],
		variant && s[`--variant-${variant}`],
		isActionable && s["--actionable"],
		highlighted && s["--highlighted"]
	);

	const hnadleDismiss: ActionableProps["onClick"] = (e) => {
		e.stopPropagation();
		onDismiss?.();
	};

	return (
		<Actionable
			onClick={onClick}
			href={href}
			className={rootClassName}
			attributes={attributes}
			ref={ref}
			as={as}
			touchHitbox
		>
			{icon && <Icon svg={icon} autoWidth size={iconSize} className={s.icon} />}
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
			{endIcon && <Icon svg={endIcon} autoWidth size={iconSize} className={s.icon} />}
			{onDismiss && (
				<Actionable
					onClick={hnadleDismiss}
					className={s.dismiss}
					as="span"
					attributes={{ "aria-label": dismissAriaLabel }}
					touchHitbox
				>
					<Icon svg={IconClose} size={iconSize} />
				</Actionable>
			)}
		</Actionable>
	);
});

Badge.displayName = "Badge";

export default Badge;
