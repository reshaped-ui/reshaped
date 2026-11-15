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
	| "onAfterOpen"
	| "onAfterClose"
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
	/** Content element padding, unit token multiplier
	 * @default 4
	 */
	padding?: number;
	/** Component elevation level, defines the shadow and the background color of the content
	 * @default "overlay"
	 */
	elevation?: "raised" | "overlay";
	/** Border radius for the content
	 * @default "medium"
	 */
	borderRadius?: "medium" | "large";
};
