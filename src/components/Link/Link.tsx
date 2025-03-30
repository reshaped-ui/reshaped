import { forwardRef } from "react";
import { classNames } from "utilities/helpers";
import Actionable, { type ActionableRef } from "components/Actionable";
import Icon from "components/Icon";
import type * as T from "./Link.types";
import s from "./Link.module.css";

const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, T.Props>(
	(props: T.Props, ref: ActionableRef) => {
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
			>
				{icon && <Icon svg={icon} />}
				{children}
			</Actionable>
		);
	}
);

Link.displayName = "Link";

export default Link;
