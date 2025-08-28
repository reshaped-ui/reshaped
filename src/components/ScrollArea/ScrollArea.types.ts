import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting content */
	children: React.ReactNode;
	/** Scrollbar visibility behavior based on the user interaction */
	scrollbarDisplay?: "visible" | "hover" | "hidden";
	/** Callback when the scroll area is scrolled */
	onScroll?: (args: G.Coordinates) => void;
	/** Height of the scroll area, literal css value or unit token multiplier */
	height?: G.Responsive<string | number>;
	/** Maximum height of the scroll area, literal css value or unit token multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type BarProps = {
	ratio: number;
	position: number;
	vertical?: boolean;
	onThumbMove: (args: { value: number; type: "absolute" | "relative" }) => void;
};
