import type React from "react";
import type * as G from "types/global";

export type Instance =
	| {
			navigateBack: () => void;
			navigateForward: () => void;
			navigateTo: (index: number) => void;
	  }
	| undefined;

export type ControlProps = {
	type: "back" | "forward";
	oppositeControlElRef: React.RefObject<HTMLButtonElement | null>;
	scrollElRef: React.RefObject<HTMLElement | null>;
	scrollPosition: number;
	onClick: () => void;
	isRTL: boolean;
	mounted: boolean;
};

export type Props = {
	children?: React.ReactNode;
	visibleItems?: G.Responsive<number>;
	gap?: G.Responsive<number>;
	bleed?: G.Responsive<number>;
	navigationDisplay?: "hidden";
	instanceRef?: React.Ref<Instance>;
	onChange?: (args: { index: number }) => void;
	onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};
