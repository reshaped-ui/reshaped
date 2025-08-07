import type React from "react";
import type { ActionableProps, ActionableRef } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type * as G from "types/global";

type BaseProps = {
	color?: "neutral" | "critical" | "warning" | "positive" | "primary";
	size?: "small" | "medium" | "large";
	endIcon?: IconProps["svg"];
	rounded?: boolean;
	hidden?: boolean;
	className?: G.ClassName;
} & Pick<ActionableProps, "href" | "onClick" | "attributes">;

type WithChildren = BaseProps & {
	children?: React.ReactNode;
	icon?: IconProps["svg"];
	variant?: "faded" | "outline";
};

type WithEmpty = BaseProps & {
	children?: never;
	icon?: never;
	variant?: never;
};

type WithDismissible = {
	onDismiss: () => void;
	dismissAriaLabel: string;
};

type WithoutDismissible = {
	onDismiss?: never;
	dismissAriaLabel?: string;
};

export type Props = (WithChildren | WithEmpty) & (WithDismissible | WithoutDismissible);

export type ContainerProps = {
	position?: "top-end" | "bottom-end";
	overlap?: boolean;
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type Export = React.ForwardRefExoticComponent<Props & { ref?: ActionableRef }> & {
	Container: React.ComponentType<ContainerProps>;
};
