import type React from "react";
import type { FlyoutProps } from "components/_private/Flyout";

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "forcePosition"
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
	| "containerRef"
> & {
	children?: React.ReactNode;
	padding?: number;
	variant?: "elevated" | "headless";
};
