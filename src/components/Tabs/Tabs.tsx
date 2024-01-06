import TabsControlled from "./TabsControlled";
import TabsUncontrolled from "./TabsUncontrolled";
import TabsItem from "./TabsItem";
import TabsList from "./TabsList";
import TabsPanel from "./TabsPanel";
import type * as T from "./Tabs.types";

const Tabs = (props: T.Props) => {
	const { value } = props;

	if (value !== undefined) return <TabsControlled {...(props as T.PrivateControlledProps)} />;
	return <TabsUncontrolled {...(props as T.UncontrolledProps)} />;
};

Tabs.Item = TabsItem;
Tabs.List = TabsList;
Tabs.Panel = TabsPanel;
export default Tabs;
