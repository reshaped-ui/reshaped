import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";
import type { Attributes } from "@/types/global";

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
	/** Change border radius to fully rounded corners, for example for notification counters */
	rounded?: boolean;
	/** Indicate an active state by applying the same reduced opacity as on hover */
	highlighted?: boolean;
	/** Hide the badge with a scale and fade transition.
	 * It stays mounted and keeps its place in the layout, so it can be animated in and out
	 */
	hidden?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
} & Pick<ActionableProps, "href" | "onClick" | "attributes" | "as">;

type WithChildren = BaseProps & {
	/** Text content of the badge, kept on a single line and truncated with an ellipsis when it doesn't fit.
	 * When children and icons are omitted, the badge renders as an empty dot of the selected size
	 */
	children?: React.ReactNode;
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** Component render variant
	 * @default "solid"
	 */
	variant?: "solid" | "faded";
};

type WithEmpty = BaseProps & {
	children?: never;
	icon?: never;
	variant?: never;
};

type WithDismissible = {
	/** Callback triggered when the dismiss button is pressed, passing it renders the dismiss button.
	 * Pressing the button doesn't trigger onClick or follow href of the badge
	 */
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
	/** Corner of the content the badge is positioned at
	 * @default "top-end"
	 */
	position?: "top-end" | "bottom-end";
	/** Move the badge closer to center to overlap with the child component, could be used to overlap with rounded shapes */
	overlap?: boolean;
	/** Badge and the content to position it against, both passed as direct children.
	 * A transparent gap around the badge is cut out of the content, so the badge stands out on images and colored backgrounds
	 */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
