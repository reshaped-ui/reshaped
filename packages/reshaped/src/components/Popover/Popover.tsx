import Dismissible, { type DismissibleProps } from "components/Dismissible";
import Flyout, { useFlyoutContext, type FlyoutProps } from "components/Flyout";
import { resolveMixin } from "styles/mixin";
import { classNames } from "utilities/props";

import s from "./Popover.module.css";

import type * as T from "./Popover.types";

const Popover: React.FC<T.Props> = (props) => {
	const {
		width,
		variant = "elevated",
		triggerType = "click",
		position = "bottom",
		elevation,
		borderRadius,
		...flyoutProps
	} = props;
	const padding = props.padding ?? (variant === "headless" ? 0 : 4);
	const trapFocusMode =
		props.trapFocusMode ?? (triggerType === "hover" ? "content-menu" : undefined);
	const mixinStyles = resolveMixin({ padding });
	const contentClassName = classNames(
		s.content,
		!!width && s["content--has-width"],
		variant && s[`content--variant-${variant}`],
		elevation && s[`content--elevation-${elevation}`],
		borderRadius && s[`content--radius-${borderRadius}`],
		mixinStyles.classNames
	);

	return (
		<Flyout
			{...(flyoutProps as FlyoutProps)}
			position={position}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
			width={width}
			contentClassName={contentClassName}
			contentAttributes={{ style: { ...mixinStyles.variables } }}
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
