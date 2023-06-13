import React from "react";
import * as G from "types/global";

export type InstanceRef =
	| {
			navigateBack: () => void;
			navigateForward: () => void;
	  }
	| undefined;

export enum ControlType {
	back = "back",
	forward = "forward",
}

export type ControlProps = {
	type: ControlType;
	scrollElRef: React.RefObject<HTMLElement>;
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
	instanceRef?: React.Ref<InstanceRef>;
	className?: G.ClassName;
	attributes?: G.Attributes<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
};
