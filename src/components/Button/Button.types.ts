import type React from "react";
import type { IconProps } from "components/Icon";
import type { ActionableProps } from "components/Actionable";
import type * as G from "types/global";

export type Size = "xlarge" | "large" | "medium" | "small";

type BaseProps = {
	color?: "black" | "white" | "primary" | "critical" | "positive" | "neutral" | "inherit";
	variant?: "solid" | "outline" | "ghost" | "faded";
	elevated?: boolean;
	icon?: IconProps["svg"];
	endIcon?: IconProps["svg"];
	size?: G.Responsive<Size>;
	rounded?: boolean;
	loading?: boolean;
	fullWidth?: G.Responsive<boolean>;
	highlighted?: boolean;
	children?: React.ReactNode;
	className?: G.ClassName;
};

export type Props = Omit<ActionableProps, keyof BaseProps> & BaseProps;

export type GroupProps = {
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};

type AlignerPosition = "start" | "end" | "top" | "bottom";

export type AlignerProps = {
	children: React.ReactElement;
	position?: AlignerPosition | AlignerPosition[];
	className?: G.ClassName;
	attributes?: G.Attributes<"div", AlignerProps>;
};

export type Export = React.ForwardRefExoticComponent<Props> & {
	Aligner: React.ComponentType<AlignerProps>;
	Group: React.ComponentType<GroupProps>;
};
