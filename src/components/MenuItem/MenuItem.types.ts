import type React from "react";
import type { IconProps } from "components/Icon";
import type { ActionableProps } from "components/Actionable";
import type * as G from "types/global";

export type Size = "small" | "medium" | "large";

export type Props = Pick<
	ActionableProps,
	"attributes" | "className" | "disabled" | "children" | "href" | "onClick" | "as"
> & {
	color?: "neutral" | "critical" | "primary";
	icon?: IconProps["svg"];
	startSlot?: React.ReactNode;
	children: React.ReactNode;
	endSlot?: React.ReactNode;
	selected?: boolean;
	size?: G.Responsive<Size>;
	roundedCorners?: G.Responsive<boolean>;
};

export type AlignerProps = {
	children: React.ReactElement;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type Export = React.ForwardRefExoticComponent<Props> & {
	Aligner: React.ComponentType<AlignerProps>;
};
