import Flyout from "@/components/Flyout/index.js";
import Popover, { PopoverDismissible } from "./Popover.js";

const PopoverRoot = Popover as typeof Popover & {
	Dismissible: typeof PopoverDismissible;
	Trigger: typeof Flyout.Trigger;
	Content: typeof Flyout.Content;
};

PopoverRoot.Dismissible = PopoverDismissible;
PopoverRoot.Trigger = Flyout.Trigger;
PopoverRoot.Content = Flyout.Content;

export default PopoverRoot;
export type { Instance as PopoverInstance, Props as PopoverProps } from "./Popover.types.js";
