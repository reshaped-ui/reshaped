import React from "react";
import { classNames } from "utilities/helpers";
import Button from "components/Button";
import IconClose from "icons/Close";
import type * as T from "./Dismissible.types";
import s from "./Dismissible.module.css";

const Dismissible = (props: T.Props) => {
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
						{...(variant === "media" ? { color: "black", variant: "faded" } : { variant: "ghost" })}
						onClick={onClose}
						attributes={{ "aria-label": closeAriaLabel }}
						icon={IconClose}
					/>
				</WrapperTag>
			)}
		</div>
	);
};

export default Dismissible;
