import type * as T from "./Flyout.types";
import FlyoutControlled from "./FlyoutControlled";
import FlyoutUncontrolled from "./FlyoutUncontrolled";

const Flyout: React.FC<T.Props> = (props) => {
	const { active } = props;

	if (typeof active === "boolean")
		return <FlyoutControlled {...(props as T.ControlledProps & T.DefaultProps)} />;
	return <FlyoutUncontrolled {...(props as T.UncontrolledProps & T.DefaultProps)} />;
};

Flyout.displayName = "Flyout";

export default Flyout;
