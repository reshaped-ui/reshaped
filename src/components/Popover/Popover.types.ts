import type React from "react";
import type { FlyoutProps, FlyoutInstance } from "components/Flyout";

export type Instance = FlyoutInstance;

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "forcePosition"
	| "fallbackPositions"
	| "onOpen"
	| "onClose"
	| "width"
	| "trapFocusMode"
	| "active"
	| "defaultActive"
	| "contentGap"
	| "contentShift"
	| "instanceRef"
	| "triggerType"
	| "disableHideAnimation"
	| "disableContentHover"
	| "disableCloseOnOutsideClick"
	| "containerRef"
	| "initialFocusRef"
	| "originCoordinates"
> & {
	children?: React.ReactNode;
	padding?: number;
	elevation?: "raised" | "overlay";
	/** @deprecated use Flyout utility instead, will be removed in v4 */
	variant?: "elevated" | "headless";
};
