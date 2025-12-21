import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	/** Component color scheme
	 * @default "neutral"
	 */
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	/** Component size
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large";
	/** SVG component for the end position icon */
	endIcon?: IconProps["svg"];
	/** Change border radius to fully rounded corners */
	rounded?: boolean;
	/** Highlight the component when component is used for an active state */
	highlighted?: boolean;
	/** Transition the component to hidden state */
	hidden?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
} & Pick<ActionableProps, "href" | "onClick" | "attributes" | "as">;

type WithChildren = BaseProps & {
	/** Node for inserting text or other content */
	children?: React.ReactNode;
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** Component render variant
	 * @default "solid"
	 */
	variant?: "solid" | "faded" | "outline";
};

type WithEmpty = BaseProps & {
	children?: never;
	icon?: never;
	variant?: never;
};

type WithDismissible = {
	/** Callback triggered when the dismiss button is pressed */
	onDismiss: () => void;
	/** Aria label for the dismiss button */
	dismissAriaLabel: string;
};

type WithoutDismissible = {
	onDismiss?: never;
	dismissAriaLabel?: string;
};

export type Props = (WithChildren | WithEmpty) & (WithDismissible | WithoutDismissible);

export type ContainerProps = {
	/** Position of the container relative to the parent element
	 * @default "top-end"
	 */
	position?: "top-end" | "bottom-end";
	/** Move the badge closer to center to overlap with the child component, could be used to overlap with rounded shapes */
	overlap?: boolean;
	/** Node for inserting children to position the badge against */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
