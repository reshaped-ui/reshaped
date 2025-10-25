import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Change component to take no space, useful for using it as a border in components like Tabs */
	blank?: boolean;
	/** Change component to render vertically */
	vertical?: G.Responsive<boolean>;
	/** Offset the divider from the container bounds */
	offset?: string;
	/** Color of the divider
	 * @default "neutral-faded"
	 */
	color?: "neutral-faded" | "neutral";
	/** Position for rendering children */
	contentPosition?: "start" | "center" | "end";
	/** Node for inserting text labels or custom components as a part of divider */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"hr">;
};
