import FlyoutUncontrolled from "./FlyoutUncontrolled";
import FlyoutControlled from "./FlyoutControlled";
import FlyoutTrigger from "./FlyoutTrigger";
import FlyoutContent from "./FlyoutContent";
import type * as T from "./Flyout.types";

const Flyout: React.FC<T.Props> & {
	Trigger: typeof FlyoutTrigger;
	Content: typeof FlyoutContent;
} = (props) => {
	const { active } = props;

	if (typeof active === "boolean")
		return <FlyoutControlled {...(props as T.ControlledProps & T.DefaultProps)} />;
	return <FlyoutUncontrolled {...(props as T.UncontrolledProps & T.DefaultProps)} />;
};

Flyout.Trigger = FlyoutTrigger;
Flyout.Content = FlyoutContent;

Flyout.displayName = "Flyout";

export default Flyout;
