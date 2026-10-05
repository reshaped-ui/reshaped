import type * as T from "./Tabs.types.js";
import TabsControlled from "./TabsControlled.js";
import TabsUncontrolled from "./TabsUncontrolled.js";

const Tabs: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <TabsControlled {...(props as T.ControlledProps)} />;
	return <TabsUncontrolled {...(props as T.UncontrolledProps)} />;
};

Tabs.displayName = "Tabs";

export default Tabs;
