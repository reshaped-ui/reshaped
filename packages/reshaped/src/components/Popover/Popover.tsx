import { classNames } from "@reshaped/utilities";

import Dismissible, { type DismissibleProps } from "@/components/Dismissible";
import Flyout, { type FlyoutProps, useFlyoutContext } from "@/components/Flyout";
import { resolveMixin } from "@/styles/mixin";

import s from "./Popover.module.css";

import type * as T from "./Popover.types";

const Popover: React.FC<T.Props> = (props) => {
	const {
		width,
		triggerType = "click",
		position = "bottom",
		elevation = "overlay",
		borderRadius = "large",
		padding = 4,
		...flyoutProps
	} = props;
	const trapFocusMode =
		props.trapFocusMode ?? (triggerType === "hover" ? "content-menu" : undefined);
	const contentMixinStyles = resolveMixin({
		shadow: elevation,
		border: true,
		borderColor: "neutral-faded",
		radius: borderRadius,
	});
	const scrollableMixinStyles = resolveMixin({
		padding,
	});
	const contentClassName = classNames(
		s.content,
		!!width && s["content--has-width"],
		elevation && s[`content--elevation-${elevation}`],
		contentMixinStyles.classNames
	);
	const scrollableClassName = classNames(scrollableMixinStyles.classNames);

	return (
		<Flyout
			{...(flyoutProps as FlyoutProps)}
			position={position}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
			width={width}
			contentClassName={contentClassName}
			contentAttributes={{ style: contentMixinStyles.variables }}
			scrollableClassName={scrollableClassName}
			scrollableAttributes={{ style: scrollableMixinStyles.variables }}
		/>
	);
};

export const PopoverDismissible: React.FC<DismissibleProps> = (props) => {
	const { handleClose } = useFlyoutContext();

	return <Dismissible {...props} onClose={() => handleClose({})} />;
};

Popover.displayName = "Popover";
PopoverDismissible.displayName = "Popover.Dismissible";

export default Popover;
