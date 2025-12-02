import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** Title slot */
	title?: React.ReactNode;
	/** Slot for rendering the main content */
	children?: React.ReactNode;
	/** Actions slot, usually used for Buttons and Links, automatically adds a gap between the actions */
	actionsSlot?: React.ReactNode;
	/** Color scheme of the alert elements
	 * @default "neutral"
	 */
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	/** Display action to the right of the content */
	inline?: boolean;
	/** Apply negative margin and remove side borders, base unit token number multiplier */
	bleed?: G.Responsive<number>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
