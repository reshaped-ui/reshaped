import type React from "react";
import type { IconProps } from "components/Icon";
import type { ActionableProps, ActionableRef } from "components/Actionable";
import type { AlignerProps as BaseAlignerProps } from "components/_private/Aligner";
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
> & {
	color?: "primary" | "critical" | "positive" | "neutral" | "media" | "inherit";
	variant?: "solid" | "outline" | "ghost" | "faded";
	icon?: IconProps["svg"];
	endIcon?: IconProps["svg"];
	size?: G.Responsive<Size>;
	rounded?: boolean;
	loading?: boolean;
	loadingAriaLabel?: string;
	elevated?: boolean;
	fullWidth?: G.Responsive<boolean>;
	highlighted?: boolean;
};

export type GroupProps = {
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type AlignerProps = BaseAlignerProps & {
	/**
	 * @deprecated use `side` instead, will be remove in v4
	 */
	position?: BaseAlignerProps["side"];
};

export type Export = React.ForwardRefExoticComponent<Props & { ref?: ActionableRef }> & {
	Aligner: React.ComponentType<AlignerProps>;
	Group: React.ComponentType<GroupProps>;
};
