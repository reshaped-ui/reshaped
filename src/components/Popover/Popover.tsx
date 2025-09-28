import { classNames } from "utilities/props";
import Flyout, { useFlyoutContext, type FlyoutProps } from "components/Flyout";
import Dismissible, { type DismissibleProps } from "components/Dismissible";
import type * as T from "./Popover.types";
import s from "./Popover.module.css";
import { resolveMixin } from "styles/mixin";

const Popover: React.FC<T.Props> & {
	Dismissible: typeof PopoverDismissible;
	Trigger: typeof Flyout.Trigger;
	Content: typeof Flyout.Content;
} = (props) => {
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

const PopoverDismissible: React.FC<DismissibleProps> = (props) => {
	const { handleClose } = useFlyoutContext();

	return <Dismissible {...props} onClose={() => handleClose({})} />;
};

Popover.Dismissible = PopoverDismissible;
Popover.Trigger = Flyout.Trigger;
Popover.Content = Flyout.Content;

Popover.displayName = "Popover";
PopoverDismissible.displayName = "Popover.Dismissible";

export default Popover;
