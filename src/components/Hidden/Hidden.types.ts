import React from "react";
import type * as G from "types/global";

export type Props = {
	hide?: G.Responsive<boolean>;
	visibility?: boolean;
	as?: keyof JSX.IntrinsicElements;
	displayStyle?: "inline" | "flex";
	children: ((className: string) => React.ReactNode) | React.ReactNode;
};
