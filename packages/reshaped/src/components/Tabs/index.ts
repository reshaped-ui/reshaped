import Tabs from "./Tabs.js";
import TabsItem from "./TabsItem.js";
import TabsList from "./TabsList.js";
import TabsPanel from "./TabsPanel.js";

const TabsRoot = Tabs as typeof Tabs & {
	Item: typeof TabsItem;
	List: typeof TabsList;
	Panel: typeof TabsPanel;
};

TabsRoot.Item = TabsItem;
TabsRoot.List = TabsList;
TabsRoot.Panel = TabsPanel;

export default TabsRoot;
export type { ItemProps as TabsItemProps, Props as TabsProps } from "./Tabs.types.js";
