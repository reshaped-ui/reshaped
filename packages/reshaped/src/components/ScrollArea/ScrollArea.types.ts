import type React from "react";
import type { ClassName } from "@reshaped/utilities";
import type { Coordinates } from "@reshaped/utilities/internal";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Node for inserting content */
	children: React.ReactNode;
	/** Direction in which the content is allowed to scroll. Limiting it to a single axis also keeps the content from overflowing the other one
	 * @default "both"
	 */
	orientation?: "vertical" | "horizontal" | "both";
	/** Scrollbar visibility behavior based on the user interaction: always visible, while hovering the area, while scrolling or never.
	 * The area stays scrollable with hidden scrollbars
	 * @default "hover"
	 */
	scrollbarDisplay?: "visible" | "hover" | "scroll" | "hidden";
	/** Control whether scroll can chain to parent scrollable containers, `contain` keeps them from scrolling after reaching the area edge
	 * @default "auto"
	 */
	overscrollBehavior?: "auto" | "contain";
	/** Display a fade mask on the sides of the area that can be scrolled towards. Only applied in browsers supporting scroll-driven animations */
	fade?: boolean;
	/** Callback when the scroll area is scrolled. `x` and `y` are the scroll progress from 0 to 1 and not the pixel offsets */
	onScroll?: (args: Coordinates) => void;
	/** Height of the scroll area, literal css value or unit token multiplier. When not passed, the area takes the full height of its parent */
	height?: G.Responsive<string | number>;
	/** Maximum height of the scroll area, literal css value or unit token multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Additional attributes for the content wrapper inside the scrollable element. The scrollable element itself is available with the component ref */
	scrollableAttributes?: Attributes<"div">;
	/** Additional classname for the content wrapper inside the scrollable element */
	scrollableClassName?: ClassName;
};

export type BarProps = {
	ratio: number;
	vertical?: boolean;
	scrollableRef: React.RefObject<HTMLElement | null>;
	onThumbMove: (args: { value: number; type: "absolute" | "relative" }) => void;
};
