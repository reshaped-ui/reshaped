import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes, ClassName } from "@reshaped/headless";
import type React from "react";

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
	/** Component color scheme
	 * @default "neutral"
	 */
	color?: "primary" | "critical" | "positive" | "neutral" | "warning" | "media" | "inherit";
	/** Component render variant
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "ghost";
	/** SVG component for the icon */
	icon?: IconProps["svg"];
	/** SVG component for the end position icon */
	endIcon?: IconProps["svg"];
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<Size>;
	/** Change border radius to fully rounded corners */
	rounded?: boolean;
	/** Show loading state */
	loading?: boolean;
	/** aria-label attribute for the loading indicator */
	loadingAriaLabel?: string;
	/** Apply raised styles to the component */
	raised?: boolean;
	/** Make the component take the full width of the parent element */
	fullWidth?: G.Responsive<boolean>;
	/** Highlight the component when component is used for an active state */
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
