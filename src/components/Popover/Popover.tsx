import { classNames } from "utilities/helpers";
import Flyout, { useFlyoutContext, type FlyoutProps } from "components/Flyout";
import Dismissible, { type DismissibleProps } from "components/Dismissible";
import type * as T from "./Popover.types";
import s from "./Popover.module.css";
import getPaddingStyles from "styles/padding";

const Popover = (props: T.Props) => {
	const {
		width,
		variant = "elevated",
		triggerType = "click",
		position = "bottom",
		...flyoutProps
	} = props;
	const padding = props.padding ?? (variant === "headless" ? 0 : 4);
	const trapFocusMode =
		props.trapFocusMode || (triggerType === "hover" ? "content-menu" : undefined);
	const paddingStyles = getPaddingStyles(padding);
	const contentClassName = classNames(
		s.content,
		!!width && s["content--has-width"],
		variant && s[`content--variant-${variant}`]
	);

	return (
		<Flyout
			{...(flyoutProps as FlyoutProps)}
			position={position}
			trapFocusMode={trapFocusMode}
			triggerType={triggerType}
			width={width}
			contentClassName={contentClassName}
			contentAttributes={{ style: { ...paddingStyles?.variables } }}
		/>
	);
};

const PopoverDismissible = (props: DismissibleProps) => {
	const { handleClose } = useFlyoutContext();

	return <Dismissible {...props} onClose={() => handleClose({})} />;
};

Popover.Dismissible = PopoverDismissible;
Popover.Trigger = Flyout.Trigger;
Popover.Content = Flyout.Content;

Popover.displayName = "Popover";
PopoverDismissible.displayName = "Popover.Dismissible";

export default Popover;
