import Tabs from "./Tabs";
import TabsItem from "./TabsItem";
import TabsList from "./TabsList";
import TabsPanel from "./TabsPanel";

const TabsRoot = Tabs as typeof Tabs & {
	Item: typeof TabsItem;
	List: typeof TabsList;
	Panel: typeof TabsPanel;
};

TabsRoot.Item = TabsItem;
TabsRoot.List = TabsList;
TabsRoot.Panel = TabsPanel;

export default TabsRoot;
export type { ItemProps as TabsItemProps, Props as TabsProps } from "./Tabs.types";
