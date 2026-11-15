import React from "react";

import type { FlyoutProps, FlyoutTriggerAttributes } from "@/components/Flyout";

export type Props = Pick<
	FlyoutProps,
	| "id"
	| "position"
	| "onOpen"
	| "onClose"
	| "onAfterOpen"
	| "onAfterClose"
	| "active"
	| "disabled"
	| "disableContentHover"
	| "containerRef"
	| "positionRef"
	| "contentGap"
	| "contentShift"
	| "contentMaxWidth"
	| "contentZIndex"
	| "originCoordinates"
	| "contentAttributes"
	| "contentClassName"
	| "instanceRef"
> & {
	/** Render function for the trigger element.
	 * Pass the provided attributes to an interactive element, for example with the attributes property of Button
	 */
	children: (attributes: FlyoutTriggerAttributes, props: { active: boolean }) => React.ReactNode;
	/** Text content for the tooltip, children are rendered without a tooltip when it's empty.
	 * It only describes the trigger while the tooltip is shown, so icon-only triggers still need their own aria-label
	 */
	text?: React.ReactNode;
	/** Color of the tooltip, "inverted" uses the color mode opposite to the current one and "dark" always uses the dark mode
	 * @default "inverted"
	 */
	color?: "inverted" | "dark";
};
