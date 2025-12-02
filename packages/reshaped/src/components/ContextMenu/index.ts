import DropdownMenu from "components/DropdownMenu";

import ContextMenu from "./ContextMenu";

const ContextMenuRoot = ContextMenu as typeof ContextMenu & {
	Content: typeof DropdownMenu.Content;
	Item: typeof DropdownMenu.Item;
	Section: typeof DropdownMenu.Section;
	SubMenu: typeof DropdownMenu.SubMenu;
	SubTrigger: typeof DropdownMenu.SubTrigger;
};

ContextMenuRoot.Content = DropdownMenu.Content;
ContextMenuRoot.Item = DropdownMenu.Item;
ContextMenuRoot.Section = DropdownMenu.Section;
ContextMenuRoot.SubMenu = DropdownMenu.SubMenu;
ContextMenuRoot.SubTrigger = DropdownMenu.SubTrigger;

export default ContextMenuRoot;
export type { Props as ContextMenuProps } from "./ContextMenu.types";
