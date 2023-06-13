import React from "react";
import type { PopoverProps } from "components/Popover";

export type Props = Pick<
	PopoverProps,
	| "children"
	| "position"
	| "forcePosition"
	| "triggerType"
	| "contentGap"
	| "onOpen"
	| "onClose"
	| "active"
	| "defaultActive"
	| "width"
	| "instanceRef"
>;

export type ContentProps = {
	children: React.ReactNode;
};

export type SectionProps = {
	children: React.ReactNode;
};

export type SubMenuProps = {
	children: React.ReactNode;
};

export type SubTriggerProps = {
	children: React.ReactNode;
};
