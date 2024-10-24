import type React from "react";
import type { PopoverProps, PopoverInstance } from "components/Popover";
import type { FlyoutContentProps } from "components/_private/Flyout";

export type Instance = PopoverInstance;

export type Props = Pick<
	PopoverProps,
	| "children"
	| "position"
	| "forcePosition"
	| "fallbackPositions"
	| "triggerType"
	| "contentGap"
	| "contentShift"
	| "onOpen"
	| "onClose"
	| "active"
	| "defaultActive"
	| "width"
	| "disableHideAnimation"
	| "disableCloseOnOutsideClick"
	| "instanceRef"
	| "containerRef"
> & {
	trapFocusMode?: Extract<PopoverProps["trapFocusMode"], "action-menu" | "selection-menu">;
};

export type ContentProps = Pick<FlyoutContentProps, "attributes" | "children" | "className">;

export type SectionProps = {
	children: React.ReactNode;
};

export type SubMenuProps = {
	children: React.ReactNode;
};

export type SubTriggerProps = {
	children: React.ReactNode;
};
