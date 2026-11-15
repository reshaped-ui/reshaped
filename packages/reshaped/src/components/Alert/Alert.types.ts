import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** Title slot */
	title?: React.ReactNode;
	/** Slot for rendering the main content */
	children?: React.ReactNode;
	/** Actions slot, usually used for Buttons and Links, automatically adds a gap between the actions */
	actionsSlot?: React.ReactNode;
	/** Color scheme of the alert elements, "critical" is rendered with the alert role and other colors use the status role
	 * @default "neutral"
	 */
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	/** Render the title and the content inline in the same text block and display the actions next to it instead of below */
	inline?: boolean;
	/** Apply negative side margins, remove side borders and the border radius, base unit token number multiplier.
	 * Use it to make the alert take the full width of a container with padding
	 */
	bleed?: G.Responsive<number>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
