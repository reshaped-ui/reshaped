import type React from "react";
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
	align?: G.Responsive<TStyles.Align>;
	justify?: G.Responsive<TStyles.Justify>;
	height?: G.Responsive<string | number>;
	width?: G.Responsive<string | number>;
	aspectRatio?: G.Responsive<number>;
	maxHeight?: G.Responsive<string | number>;
	maxWidth?: G.Responsive<string | number>;
	minHeight?: G.Responsive<string | number>;
	minWidth?: G.Responsive<string | number>;
	padding?: G.Responsive<number>;
	paddingTop?: G.Responsive<number>;
	paddingBottom?: G.Responsive<number>;
	paddingStart?: G.Responsive<number>;
	paddingEnd?: G.Responsive<number>;
	paddingInline?: G.Responsive<number>;
	paddingBlock?: G.Responsive<number>;
	bleed?: G.Responsive<number>;
	textAlign?: G.Responsive<TStyles.TextAlign>;
	backgroundColor?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "critical-faded"
		| "positive"
		| "warning"
		| "warning-faded"
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
		| "brand"
		| "white"
		| "black";
	borderColor?: G.Responsive<TStyles.BorderColor>;
	borderRadius?: G.Responsive<TStyles.Radius>;
	position?: G.Responsive<TStyles.Position>;
	inset?: G.Responsive<number>;
	insetStart?: G.Responsive<number>;
	insetEnd?: G.Responsive<number>;
	insetTop?: G.Responsive<number>;
	insetBottom?: G.Responsive<number>;
	zIndex?: number;
	shadow?: "raised" | "overlay";
	overflow?: "hidden" | "auto";
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
