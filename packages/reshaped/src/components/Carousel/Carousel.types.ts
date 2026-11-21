import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableRef } from "@/components/Actionable";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Instance =
	| {
			/** Scroll back by the width of the visible area, same as the back navigation control */
			navigateBack: () => void;
			/** Scroll forward by the width of the visible area, same as the forward navigation control */
			navigateForward: () => void;
			/** Scroll to the item at the given zero-based index */
			navigateTo: (index: number) => void;
	  }
	| undefined;

export type ControlProps = {
	type: "back" | "forward";
	controlRef: React.RefObject<ActionableRef | null>;
	oppositeControlElRef: React.RefObject<ActionableRef | null>;
	/** Carousel can't be scrolled further in the direction of the control, undefined until its scroll position is resolved */
	hidden?: boolean;
	onClick: () => void;
	isRTL: boolean;
};

export type Props = {
	/** Node for inserting children, each child is rendered as a carousel item. Children of a fragment are rendered together as a single item */
	children?: React.ReactNode;
	/** Number of items visible at once in the container. When not passed, the items are sized based on their content */
	visibleItems?: G.Responsive<number>;
	/** Gap between items in the container, base unit multiplier
	 * @default 3
	 */
	gap?: G.Responsive<number>;
	/** Apply negative margins, base unit multiplier, can be used to make sure the items don't get clipped when scrolling */
	bleed?: G.Responsive<number>;
	/** Hide navigation controls, can be used when navigating with the instanceRef methods.
	 * Otherwise, they are displayed on devices supporting hover or starting from the large viewport, while there is content to scroll to
	 */
	navigationDisplay?: "hidden";
	/** Ref accessor for the carousel methods */
	instanceRef?: React.Ref<Instance>;
	/** Callback when the first visible carousel index changes */
	onChange?: (args: { index: number }) => void;
	/** Callback when the carousel scrolls */
	onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element. Pass `aria-label` or `aria-labelledby` to describe the carousel content for screen readers */
	attributes?: Attributes<"div">;
};
