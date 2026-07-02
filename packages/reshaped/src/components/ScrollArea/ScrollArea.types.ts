import type React from "react";
import type { ClassName } from "@reshaped/utilities";
import type { Coordinates } from "@reshaped/utilities/internal";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Node for inserting content */
	children: React.ReactNode;
	/** Scrollbar visibility behavior based on the user interaction */
	scrollbarDisplay?: "visible" | "hover" | "hidden";
	/** Control whether scroll can chain to parent scrollable containers */
	overscrollBehavior?: "auto" | "contain";
	/** Display a fade mask on the sides of the area that can be scrolled towards */
	fadeMask?: boolean;
	/** Callback when the scroll area is scrolled */
	onScroll?: (args: Coordinates) => void;
	/** Height of the scroll area, literal css value or unit token multiplier */
	height?: G.Responsive<string | number>;
	/** Maximum height of the scroll area, literal css value or unit token multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Additional attributes for the scrollable element */
	scrollableAttributes?: Attributes<"div">;
	/** Additional classname for the scrollable element */
	scrollableClassName?: ClassName;
};

export type BarProps = {
	ratio: number;
	position: number;
	vertical?: boolean;
	onThumbMove: (args: { value: number; type: "absolute" | "relative" }) => void;
};
