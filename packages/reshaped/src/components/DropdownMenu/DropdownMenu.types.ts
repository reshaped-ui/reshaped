import type React from "react";

import type { FlyoutContentProps } from "@/components/Flyout";
import type { MenuItemProps } from "@/components/MenuItem";
import type { PopoverInstance, PopoverProps } from "@/components/Popover";

export type Instance = PopoverInstance;

export type SubMenuTriggerType = Extract<PopoverProps["triggerType"], "hover" | "click">;

export type Context = {
	size?: MenuItemProps["size"];
	submenuTriggerType?: SubMenuTriggerType;
};

export type ProviderProps = Context & {
	children: React.ReactNode;
};

export type Props = Pick<
	PopoverProps,
	| "children"
	| "position"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinHeight"
	| "triggerType"
	| "contentGap"
	| "contentShift"
	| "contentMaxHeight"
	| "contentZIndex"
	| "onOpen"
	| "onClose"
	| "onAfterOpen"
	| "onAfterClose"
	| "active"
	| "defaultActive"
	| "width"
	| "disableHideAnimation"
	| "disableCloseOnOutsideClick"
	| "instanceRef"
	| "containerRef"
	| "positionRef"
	| "originCoordinates"
	| "elevation"
	| "initialFocusRef"
> & {
	/** Change component trap focus keyboard behavior and shortcuts.
	 * "action-menu" moves the focus to the menu and navigates its items with the arrow keys,
	 * "selection-menu" keeps the focus on the trigger while the arrow keys highlight the items, false disables the focus trapping
	 * @default "action-menu"
	 */
	trapFocusMode?: Extract<PopoverProps["trapFocusMode"], "action-menu" | "selection-menu"> | false;
	/** Size used by the menu items, including the items of the submenus. Can be overridden with the size of a single item
	 * @default "medium"
	 */
	size?: MenuItemProps["size"];
	/** Interaction used to open all submenus of the menu, keyboard navigation works for both of them
	 * @default "hover"
	 */
	submenuTriggerType?: SubMenuTriggerType;
};

export type ContentProps = Pick<FlyoutContentProps, "attributes" | "children" | "className">;

export type ItemProps = Omit<MenuItemProps, "roundedCorners" | "focusIndicator">;

export type SectionProps = {
	/** Node for inserting children */
	children: React.ReactNode;
};

export type SubMenuProps = {
	/** Node for inserting children, DropdownMenu.SubTrigger and DropdownMenu.Content of the submenu */
	children: React.ReactNode;
	/** Interaction used to open the submenu, overrides the submenuTriggerType of the menu */
	triggerType?: SubMenuTriggerType;
} & Pick<
	PopoverProps,
	| "position"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinHeight"
	| "contentGap"
	| "contentShift"
	| "width"
	| "containerRef"
>;

export type SubTriggerProps = Omit<MenuItemProps, "endSlot" | "roundedCorners" | "focusIndicator">;
