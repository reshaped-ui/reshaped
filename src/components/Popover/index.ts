import Flyout from "components/Flyout";
import Popover, { PopoverDismissible } from "./Popover";
import type * as T from "./Popover.types";

const PopoverRoot = Popover as React.FC<T.Props> & {
	Dismissible: typeof PopoverDismissible;
	Trigger: typeof Flyout.Trigger;
	Content: typeof Flyout.Content;
};

PopoverRoot.Dismissible = PopoverDismissible;
PopoverRoot.Trigger = Flyout.Trigger;
PopoverRoot.Content = Flyout.Content;

export default PopoverRoot;
export type { Props as PopoverProps, Instance as PopoverInstance } from "./Popover.types";
