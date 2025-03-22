import React from "react";
import type { FlyoutProps, FlyoutTriggerProps } from "components/_private/Flyout";

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "onOpen"
	| "onClose"
	| "active"
	| "disabled"
	| "disableContentHover"
	| "containerRef"
	| "contentGap"
	| "contentShift"
	| "originCoordinates"
> & {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	children: (attributes: Parameters<FlyoutTriggerProps["children"]>[0] | {}) => React.ReactNode;
	text?: React.ReactNode;
};
