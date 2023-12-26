import type React from "react";
import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type * as G from "types/global";

type BaseProps = {
	size?: "small" | "medium" | "large";
	icon?: IconProps["svg"];
	endIcon?: IconProps["svg"];
	rounded?: boolean;
	hidden?: boolean;
	className?: G.ClassName;
} & Pick<ActionableProps, "href" | "onClick" | "attributes">;

type WithChildren = BaseProps & {
	children: React.ReactNode;
	color?: "critical" | "warning" | "positive" | "primary";
	variant?: "faded" | "outline";
};

type WithEmpty = BaseProps & {
	color: "critical" | "positive" | "primary";
	children?: never;
	variant?: never;
};

type WithDismissible = {
	onDismiss: () => void;
	dismissAriaLabel: string;
};

type WithoutDismissible = {
	onDismiss?: never;
	dismissAriaLabel?: never;
};

export type Props = (WithChildren | WithEmpty) & (WithDismissible | WithoutDismissible);

export type ContainerProps = {
	position?: "top-end" | "bottom-end";
	overlap?: boolean;
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", ContainerProps>;
};
