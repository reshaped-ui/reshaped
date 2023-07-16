import React from "react";
import { classNames } from "utilities/helpers";
import Flyout from "components/_private/Flyout";
import type * as T from "./Popover.types";
import s from "./Popover.module.css";
import getPaddingStyles from "styles/padding";

const Popover = (props: T.Props) => {
	const {
		id,
		forcePosition,
		onOpen,
		onClose,
		active,
		defaultActive,
		children,
		width,
		contentGap,
		variant = "elevated",
		triggerType = "click",
		position = "bottom",
		disableHideAnimation,
		instanceRef,
	} = props;
	const padding = props.padding ?? (variant === "headless" ? 0 : 4);
	const trapFocusMode =
		props.trapFocusMode || (triggerType === "hover" ? "content-menu" : undefined);
	const paddingStyles = getPaddingStyles(padding);
	const contentClassName = classNames(
		s.content,
		!!width && s["content--has-width"],
		variant && s[`content--variant-${variant}`],
		paddingStyles?.classNames
	);

	return (
		// @ts-ignore
		<Flyout
			id={id}
			instanceRef={instanceRef}
			position={position}
			forcePosition={forcePosition}
			onOpen={onOpen}
			onClose={onClose}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
			active={active}
			defaultActive={defaultActive}
			width={width}
			disableHideAnimation={disableHideAnimation}
			contentGap={contentGap}
			contentClassName={contentClassName}
			contentAttributes={{ style: { ...paddingStyles?.variables } }}
		>
			{children}
		</Flyout>
	);
};

Popover.Trigger = Flyout.Trigger;
Popover.Content = Flyout.Content;

export default Popover;
