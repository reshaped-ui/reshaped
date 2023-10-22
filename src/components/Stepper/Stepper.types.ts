import React from "react";
import type * as G from "types/global";

export type Props = {
	activeId?: string | number;
	labelDisplay?: G.Responsive<"inline" | "hidden">;
	children?: React.ReactNode;
	direction?: "row" | "column";
	className?: G.ClassName;
	attributes?: G.Attributes<"ul", Props>;
};

export type ItemProps = {
	id?: string;
	completed?: boolean;
	title?: React.ReactNode;
	subtitle?: React.ReactNode;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"li", ItemProps>;
};

export type ItemPrivateProps = ItemProps & {
	labelDisplay: Props["labelDisplay"];
	step: number;
	active: boolean;
	direction: Props["direction"];
	last: boolean;
};
