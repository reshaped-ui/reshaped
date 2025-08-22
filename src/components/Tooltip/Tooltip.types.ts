import React from "react";
import type { FlyoutProps, FlyoutTriggerProps } from "components/Flyout";

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
	| "contentAttributes"
	| "contentClassName"
> & {
	/** Node for inserting children */
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	children: (attributes: Parameters<FlyoutTriggerProps["children"]>[0] | {}) => React.ReactNode;
	/** Text content for the tooltip */
	text?: React.ReactNode;
	/** Color of the tooltip
	 * @default "inverted"
	 */
	color?: "inverted" | "dark";
};
