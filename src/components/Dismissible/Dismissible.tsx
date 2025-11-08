"use client";

import Button from "components/Button";
import IconClose from "icons/Close";
import { classNames } from "utilities/props";

import s from "./Dismissible.module.css";

import type * as T from "./Dismissible.types";

const Dismissible: React.FC<T.Props> = (props) => {
	const {
		children,
		align,
		onClose,
		hideCloseButton,
		variant,
		closeAriaLabel,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		variant && s[`--variant-${variant}`],
		align && s[`--align-${align}`],
		hideCloseButton && s["--hide-close"]
	);
	const WrapperTag = variant === "media" ? "div" : Button.Aligner;

	return (
		<div {...attributes} className={rootClassNames}>
			{children}
			{!hideCloseButton && (
				<WrapperTag className={s.close}>
					<Button
						size="small"
						{...(variant === "media" ? { color: "media", variant: "faded" } : { variant: "ghost" })}
						onClick={() => onClose?.()}
						attributes={{ "aria-label": onClose ? closeAriaLabel : undefined }}
						icon={IconClose}
					/>
				</WrapperTag>
			)}
		</div>
	);
};

Dismissible.displayName = "Dismissible";

export default Dismissible;
