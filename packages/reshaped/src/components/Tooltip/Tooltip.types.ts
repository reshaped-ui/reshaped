import React from "react";

import type { FlyoutProps, FlyoutTriggerAttributes } from "components/Flyout";

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
	| "positionRef"
	| "contentGap"
	| "contentShift"
	| "contentMaxWidth"
	| "originCoordinates"
	| "contentAttributes"
	| "contentClassName"
	| "instanceRef"
> & {
	/** Node for inserting children */
	children: (attributes: FlyoutTriggerAttributes) => React.ReactNode;
	/** Text content for the tooltip */
	text?: React.ReactNode;
	/** Color of the tooltip
	 * @default "inverted"
	 */
	color?: "inverted" | "dark";
};
