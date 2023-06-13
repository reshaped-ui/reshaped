import React from "react";
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
> & {
	children?: React.ReactNode;
	triggerType?: "click" | "hover";
	padding?: number;
	variant?: "elevated" | "headless";
};
