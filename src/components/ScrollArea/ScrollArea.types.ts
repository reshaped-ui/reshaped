import type React from "react";
import type * as G from "types/global";

export type Props = {
	children: React.ReactNode;
	scrollbarDisplay?: "visible" | "hover" | "hidden";
	onScroll?: (args: { x: number; y: number }) => void;
	height?: G.Responsive<string | number>;
	maxHeight?: G.Responsive<string | number>;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type BarProps = {
	ratio: number;
	position: number;
	vertical?: boolean;
	onThumbMove: (args: { value: number; type: "absolute" | "relative" }) => void;
};
