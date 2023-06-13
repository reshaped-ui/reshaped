import React from "react";
import type { IconProps } from "components/Icon";
import type * as G from "types/global";

export type Props = {
	icon?: IconProps["svg"];
	title?: React.ReactNode;
	children?: React.ReactNode;
	actionsSlot?: React.ReactNode;
	color?: "neutral" | "critical" | "positive" | "primary";
	inline?: boolean;
	bleed?: G.Responsive<number>;
	className?: G.ClassName;
	attributes?: G.Attributes<"div", Props>;
};
