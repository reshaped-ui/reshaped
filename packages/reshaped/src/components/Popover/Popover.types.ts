import type React from "react";

import type { FlyoutInstance, FlyoutProps } from "@/components/Flyout";

export type Instance = FlyoutInstance;

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinHeight"
	| "onOpen"
	| "onClose"
	| "width"
	| "trapFocusMode"
	| "active"
	| "defaultActive"
	| "contentGap"
	| "contentShift"
	| "contentMaxHeight"
	| "contentZIndex"
	| "instanceRef"
	| "triggerType"
	| "disableHideAnimation"
	| "disableContentHover"
	| "disableCloseOnOutsideClick"
	| "autoFocus"
	| "containerRef"
	| "positionRef"
	| "initialFocusRef"
	| "originCoordinates"
> & {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Content element padding, unit token multiplier */
	padding?: number;
	/** Component elevation level */
	elevation?: "raised" | "overlay";
	/** Border radius for the content */
	borderRadius?: "medium" | "large";
};
