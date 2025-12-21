import type { ActionableRef } from "components/Actionable";
import type React from "react";
import type * as G from "types/global";

export type Instance =
	| {
			/** Scroll to the previous item */
			navigateBack: () => void;
			/** Scroll to the next item */
			navigateForward: () => void;
			/** Scroll to the item at the given index */
			navigateTo: (index: number) => void;
	  }
	| undefined;

export type ControlProps = {
	type: "back" | "forward";
	oppositeControlElRef: React.RefObject<ActionableRef | null>;
	scrollElRef: React.RefObject<HTMLElement | null>;
	scrollPosition: number;
	onClick: () => void;
	isRTL: boolean;
	mounted: boolean;
};

export type Props = {
	/** Node for inserting children, each child is rendered as a carousel item */
	children?: React.ReactNode;
	/** Number of items visible at once in the container*/
	visibleItems?: G.Responsive<number>;
	/** Gap between items in the container, base unit multiplier */
	gap?: G.Responsive<number>;
	/** Apply negative margins, base unit multiplier, can be used to make sure the items don't get clipped when scrolling */
	bleed?: G.Responsive<number>;
	/** Hide navigation controls */
	navigationDisplay?: "hidden";
	/** Ref accessor for the carousel methods */
	instanceRef?: React.Ref<Instance>;
	/** Callback when the first visible carousel index changes */
	onChange?: (args: { index: number }) => void;
	/** Callback when the carousel scrolls */
	onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
