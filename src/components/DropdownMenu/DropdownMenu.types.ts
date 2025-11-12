import type { FlyoutContentProps } from "components/Flyout";
import type { MenuItemProps } from "components/MenuItem";
import type { PopoverProps, PopoverInstance } from "components/Popover";
import type React from "react";

export type Instance = PopoverInstance;

export type Props = Pick<
	PopoverProps,
	| "children"
	| "position"
	| "forcePosition"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinWidth"
	| "fallbackMinHeight"
	| "triggerType"
	| "contentGap"
	| "contentShift"
	| "contentMaxHeight"
	| "onOpen"
	| "onClose"
	| "active"
	| "defaultActive"
	| "width"
	| "disableHideAnimation"
	| "disableCloseOnOutsideClick"
	| "instanceRef"
	| "containerRef"
	| "positionRef"
	| "originCoordinates"
	| "borderRadius"
	| "elevation"
	| "initialFocusRef"
> & {
	/** Change component trap focus keyboard behavior and shortcuts */
	trapFocusMode?: Extract<PopoverProps["trapFocusMode"], "action-menu" | "selection-menu"> | false;
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
} & Pick<
	PopoverProps,
	| "position"
	| "forcePosition"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinWidth"
	| "fallbackMinHeight"
	| "contentGap"
	| "contentShift"
	| "width"
	| "containerRef"
>;

export type SubTriggerProps = Omit<MenuItemProps, "endSlot" | "roundedCorners">;
