import React from "react";
import type * as G from "types/global";

export type Props = {
	children: React.ReactNode;
	active?: boolean;
	className?: G.ClassName;
	attributes?: G.Attributes<"span", Props>;
};
