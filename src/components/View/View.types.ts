import React from "react";
import type * as G from "types/global";
import type * as TStyles from "styles/types";

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export type Props<TagName extends keyof JSX.IntrinsicElements = "div"> = {
	children?: React.ReactNode;
	as?: TagName;
	divided?: boolean;
	direction?: G.Responsive<Direction>;
	gap?: G.Responsive<number>;
	wrap?: G.Responsive<boolean>;
	align?: G.Responsive<"center" | "start" | "end" | "stretch" | "baseline">;
	justify?: G.Responsive<"center" | "start" | "end" | "space-between">;
	height?: G.Responsive<string | number>;
	width?: G.Responsive<string | number>;
	aspectRatio?: G.Responsive<number>;
	maxHeight?: G.Responsive<string | number>;
	maxWidth?: G.Responsive<string | number>;
	padding?: G.Responsive<number>;
	paddingTop?: G.Responsive<number>;
	paddingBottom?: G.Responsive<number>;
	paddingStart?: G.Responsive<number>;
	paddingEnd?: G.Responsive<number>;
	paddingInline?: G.Responsive<number>;
	paddingBlock?: G.Responsive<number>;
	bleed?: G.Responsive<number>;
	textAlign?: "center" | "start" | "end";
	backgroundColor?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "critical-faded"
		| "positive"
		| "positive-faded"
		| "primary"
		| "primary-faded"
		| "elevation-base"
		| "elevation-raised"
		| "elevation-overlay"
		| "page"
		| "page-faded"
		| "disabled"
		| "disabled-faded"
		| "white"
		| "black";
	borderColor?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "critical-faded"
		| "positive"
		| "positive-faded"
		| "primary"
		| "primary-faded"
		| "disabled"
		| "transparent";
	borderRadius?: G.Responsive<TStyles.Radius>;
	position?: G.Responsive<TStyles.Position>;
	inset?: G.Responsive<number>;
	insetStart?: G.Responsive<number>;
	insetEnd?: G.Responsive<number>;
	insetTop?: G.Responsive<number>;
	insetBottom?: G.Responsive<number>;
	zIndex?: number;
	shadow?: "raised" | "overlay";
	overflow?: "hidden";
	animated?: boolean;
	className?: G.ClassName;
	attributes?: G.Attributes<TagName>;
} & Pick<ItemProps, "grow">;

export type ItemProps<TagName extends keyof JSX.IntrinsicElements = "div"> = {
	order?: G.Responsive<number>;
	columns?: G.Responsive<Columns>;
	grow?: G.Responsive<boolean>;
	gapBefore?: G.Responsive<number> | "auto";
	as?: TagName;
	attributes?: G.Attributes<TagName>;
	className?: G.ClassName;
	children?: React.ReactNode;
};

export type RenderItem = (args: {
	className?: string;
	child: any;
	index: number;
}) => React.ReactNode;

export type RenderDivider = (args: { className?: string; key: string }) => React.ReactNode;
