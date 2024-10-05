import type React from "react";
import type { FlyoutProps, FlyoutInstance } from "components/_private/Flyout";

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
	| "instanceRef"
	| "triggerType"
	| "disableHideAnimation"
	| "disableContentHover"
	| "disableCloseOnOutsideClick"
	| "containerRef"
> & {
	children?: React.ReactNode;
	padding?: number;
	variant?: "elevated" | "headless";
};
