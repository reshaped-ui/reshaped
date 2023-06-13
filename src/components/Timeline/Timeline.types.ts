import React from "react";
import type * as G from "types/global";

export type Props = {
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"ul", Props>;
};

export type ItemProps = {
	markerSlot?: React.ReactNode | null;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"li", ItemProps>;
};
