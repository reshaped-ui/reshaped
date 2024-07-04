import React from "react";
import type * as G from "types/global";

export type Props = {
	children?: React.ReactNode;
	backgroundSlot?: React.ReactNode;
	position?: "full" | "top" | "bottom" | "start" | "end";
	fill?: boolean;
	scrimClassName?: G.ClassName;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
