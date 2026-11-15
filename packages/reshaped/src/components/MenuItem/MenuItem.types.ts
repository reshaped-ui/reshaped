import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Size = "small" | "medium" | "large";
export type FocusIndicator = "outline" | "highlight";

export type Props = Pick<
	ActionableProps,
	| "attributes"
	| "className"
	| "disabled"
	| "children"
	| "href"
	| "onClick"
	| "as"
	| "stopPropagation"
	| "render"
> & {
	/** Component color, based on the color tokens.
	 * Primary is only applied to the selected state, critical is applied to the text and icon in the hovered, highlighted and selected states
	 * @default "primary"
	 */
	color?: "neutral" | "critical" | "primary";
	/** Icon at the start position, rendered instead of the startSlot when both are passed */
	icon?: IconProps["svg"];
	/** Node for inserting children */
	children: React.ReactNode;
	/** Node for inserting content at the start side of the component, ignored when icon is passed */
	startSlot?: React.ReactNode;
	/** Node for inserting content at the end side of the component */
	endSlot?: React.ReactNode;
	/** Highlight the component as hovered or focused. For example, when displaying currently focused item in Autocomplete */
	highlighted?: boolean;
	/** Visual indicator for the keyboard focus state, highlight uses the same styles as hover
	 * @default "outline"
	 */
	focusIndicator?: FocusIndicator;
	/** Highlight the component as selected. Only changes the styles, pass aria attributes for the selected state with attributes */
	selected?: boolean;
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<Size>;
	/** Has no effect, the component is always rendered with rounded corners */
	roundedCorners?: G.Responsive<boolean>;
};

export type AlignerProps = {
	/** Node for inserting children */
	children: React.ReactElement;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
