import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Size = "xlarge" | "large" | "medium" | "small";

export type Props = Pick<
	ActionableProps,
	| "attributes"
	| "className"
	| "disabled"
	| "children"
	| "href"
	| "onClick"
	| "type"
	| "as"
	| "stopPropagation"
	| "render"
> & {
	/** Component color scheme.
	 * Use media on top of images and videos, it looks the same in light and dark mode and works with solid and ghost variants.
	 * Use inherit on top of colored backgrounds to pick up the current text color, it works with outline and ghost variants
	 * @default "neutral"
	 */
	color?: "primary" | "critical" | "positive" | "neutral" | "warning" | "media" | "inherit";
	/** Component render variant.
	 * Wrap ghost buttons with Button.Aligner to visually align their content with the surrounding layout
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "ghost";
	/** SVG component for the icon at the start position.
	 * When used without children, renders a square icon-only button that needs an aria-label passed with attributes
	 */
	icon?: IconProps["svg"];
	/** SVG component for the end position icon */
	endIcon?: IconProps["svg"];
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<Size>;
	/** Change border radius to fully rounded corners */
	rounded?: boolean;
	/** Show a loader instead of the content and disable user interaction, keeps the button size and its non-disabled colors */
	loading?: boolean;
	/** aria-label attribute for the loading indicator */
	loadingAriaLabel?: string;
	/** Add a shadow to the component, ignored for the ghost variant and the media color */
	raised?: boolean;
	/** Make the component take the full width of the parent element */
	fullWidth?: G.Responsive<boolean>;
	/** Keep the hover styles applied to show that the component is active, for example while it's pressed or the menu it triggers is open */
	highlighted?: boolean;
};

export type GroupProps = {
	/** Node for inserting child Button components */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};

export type { AlignerProps } from "@/components/_private/Aligner";
