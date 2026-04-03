import type * as T from "./Tabs.types";
import TabsControlled from "./TabsControlled";
import TabsUncontrolled from "./TabsUncontrolled";

const Tabs: React.FC<T.Props> = (props) => {
	const { value } = props;

	if (value !== undefined) return <TabsControlled {...(props as T.PrivateControlledProps)} />;
	return <TabsUncontrolled {...(props as T.UncontrolledProps)} />;
};

Tabs.displayName = "Tabs";

export default Tabs;
