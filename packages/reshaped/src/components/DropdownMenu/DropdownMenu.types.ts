import type React from "react";

import type { FlyoutContentProps } from "@/components/Flyout";
import type { MenuItemProps } from "@/components/MenuItem";
import type { PopoverInstance, PopoverProps } from "@/components/Popover";

export type Instance = PopoverInstance;

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
	/** Change component trap focus keyboard behavior and shortcuts */
	trapFocusMode?: Extract<PopoverProps["trapFocusMode"], "action-menu" | "selection-menu"> | false;
	/** Default size of the menu items rendered inside the menu */
	size?: MenuItemProps["size"];
};

export type ContentProps = Pick<FlyoutContentProps, "attributes" | "children" | "className">;

export type ItemProps = Omit<MenuItemProps, "roundedCorners">;

export type SectionProps = {
	/** Node for inserting children */
	children: React.ReactNode;
};

export type SubMenuProps = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Default size of the menu items rendered inside the submenu, inherited from the parent menu by default */
	size?: MenuItemProps["size"];
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

export type SubTriggerProps = Omit<MenuItemProps, "endSlot" | "roundedCorners">;
