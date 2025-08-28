import type React from "react";
import type { IconProps } from "components/Icon";
import type { ActionableProps, ActionableRef } from "components/Actionable";
import type * as G from "types/global";

export type Size = "small" | "medium" | "large";

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
> & {
	/** Component color, based on the color tokens */
	color?: "neutral" | "critical" | "primary";
	/** Icon at the start position */
	icon?: IconProps["svg"];
	/** Node for inserting children */
	children: React.ReactNode;
	/** Node for inserting content at the start side of the component */
	startSlot?: React.ReactNode;
	/** Node for inserting content at the end side of the component */
	endSlot?: React.ReactNode;
	/** Highlight the component as hovered or focused. For example, when displaying currently focused item in Autocomplete */
	highlighted?: boolean;
	/** Highlight the component as selected */
	selected?: boolean;
	/** Component size */
	size?: G.Responsive<Size>;
	/** Round the corners of the component */
	roundedCorners?: G.Responsive<boolean>;
};

export type AlignerProps = {
	/** Node for inserting children */
	children: React.ReactElement;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type Export = React.ForwardRefExoticComponent<Props & { ref?: ActionableRef }> & {
	Aligner: React.ComponentType<AlignerProps>;
};
