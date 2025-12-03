import Popover from "components/Popover";

import DropdownMenu, {
	DropdownMenuContent,
	DropdownMenuSection,
	DropdownMenuItem,
	DropdownMenuSubMenu,
	DropdownMenuSubTrigger,
} from "./DropdownMenu";

const DropdownMenuRoot = DropdownMenu as typeof DropdownMenu & {
	Dismissible: typeof Popover.Dismissible;
	Trigger: typeof Popover.Trigger;
	Content: typeof DropdownMenuContent;
	Section: typeof DropdownMenuSection;
	Item: typeof DropdownMenuItem;
	SubMenu: typeof DropdownMenuSubMenu;
	SubTrigger: typeof DropdownMenuSubTrigger;
};

DropdownMenuRoot.Dismissible = Popover.Dismissible;
DropdownMenuRoot.Trigger = Popover.Trigger;
DropdownMenuRoot.Content = DropdownMenuContent;
DropdownMenuRoot.Section = DropdownMenuSection;
DropdownMenuRoot.Item = DropdownMenuItem;
DropdownMenuRoot.SubMenu = DropdownMenuSubMenu;
DropdownMenuRoot.SubTrigger = DropdownMenuSubTrigger;

export default DropdownMenuRoot;
export type {
	Props as DropdownMenuProps,
	Instance as DropdownMenuInstance,
} from "./DropdownMenu.types";
