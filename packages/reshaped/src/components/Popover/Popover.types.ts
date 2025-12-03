import type { FlyoutProps, FlyoutInstance } from "components/Flyout";
import type React from "react";

export type Instance = FlyoutInstance;

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "forcePosition"
	| "fallbackPositions"
	| "fallbackAdjustLayout"
	| "fallbackMinWidth"
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
	borderRadius?: "small" | "medium";
	/** @deprecated use Flyout utility instead, will be removed in v4 */
	variant?: "elevated" | "headless";
};
