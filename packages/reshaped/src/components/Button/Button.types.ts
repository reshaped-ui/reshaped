import type { AlignerProps as BaseAlignerProps } from "components/_private/Aligner";
import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

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
	color?: "primary" | "critical" | "positive" | "neutral" | "media" | "inherit";
	/** Component render variant
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "ghost" | "faded";
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
	/** Apply elevated styles to the component */
	elevated?: boolean;
	/** Make the component take the full width of the parent element */
	fullWidth?: G.Responsive<boolean>;
	/** Highlight the component when component is used for an active state */
	highlighted?: boolean;
};

export type GroupProps = {
	/** Node for inserting child Button components */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type AlignerProps = BaseAlignerProps & {
	/**
	 * @deprecated use `side` instead, will be remove in v4
	 */
	position?: BaseAlignerProps["side"];
};
