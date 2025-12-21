import React from "react";

import * as G from "types/global";

/* Values */
type Unit = number;
type Literal = string;
type Size = Literal | Unit;

export type Margin = Unit;
export type Padding = Unit;
export type Inset = Unit | "auto";
export type AspectRatio = number;
export type Bleed = Unit;

export type Height = Size;
export type Width = Size;
export type MaxHeight = Size;
export type MaxWidth = Size;
export type MinHeight = Size;
export type MinWidth = Size;

export type TextAlign = "start" | "center" | "end";
export type Justify = "start" | "center" | "end" | "space-between";
export type Align = "start" | "center" | "end" | "stretch" | "baseline";
export type Radius = "small" | "medium" | "large" | "circular" | "none";
export type Position = "relative" | "absolute" | "fixed" | "sticky" | "static";

export type Border = boolean;
export type BorderColor =
	| "neutral"
	| "neutral-faded"
	| "critical"
	| "critical-faded"
	| "warning"
	| "warning-faded"
	| "positive"
	| "positive-faded"
	| "primary"
	| "primary-faded"
	| "disabled"
	| "brand"
	| "transparent";

/**
 * Utilities
 */

export type StyleResolver<Value> = (value?: G.Responsive<Value>) => {
	variables?: React.CSSProperties;
	classNames?: G.ClassName;
};

export type Mixin = {
	align?: G.Responsive<Align>;
	justify?: G.Responsive<Justify>;
	textAlign?: G.Responsive<TextAlign>;

	radius?: G.Responsive<Radius>;
	aspectRatio?: G.Responsive<AspectRatio>;
	bleed?: G.Responsive<Bleed>;

	borderColor?: G.Responsive<BorderColor>;
	border?: G.Responsive<Border>;
	borderTop?: G.Responsive<Border>;
	borderBottom?: G.Responsive<Border>;
	borderStart?: G.Responsive<Border>;
	borderEnd?: G.Responsive<Border>;
	borderInline?: G.Responsive<Border>;
	borderBlock?: G.Responsive<Border>;

	width?: G.Responsive<Width>;
	height?: G.Responsive<Height>;
	maxWidth?: G.Responsive<MaxWidth>;
	maxHeight?: G.Responsive<MaxHeight>;
	minWidth?: G.Responsive<MinWidth>;
	minHeight?: G.Responsive<MinHeight>;

	position?: G.Responsive<Position>;
	inset?: G.Responsive<Inset>;
	insetTop?: G.Responsive<Inset>;
	insetBottom?: G.Responsive<Inset>;
	insetStart?: G.Responsive<Inset>;
	insetEnd?: G.Responsive<Inset>;
	insetInline?: G.Responsive<Inset>;
	insetBlock?: G.Responsive<Inset>;

	padding?: G.Responsive<Padding>;
	paddingTop?: G.Responsive<Padding>;
	paddingBottom?: G.Responsive<Padding>;
	paddingStart?: G.Responsive<Padding>;
	paddingEnd?: G.Responsive<Padding>;
	paddingInline?: G.Responsive<Padding>;
	paddingBlock?: G.Responsive<Padding>;

	margin?: G.Responsive<Margin>;
	marginTop?: G.Responsive<Margin>;
	marginBottom?: G.Responsive<Margin>;
	marginStart?: G.Responsive<Margin>;
	marginEnd?: G.Responsive<Margin>;
	marginInline?: G.Responsive<Margin>;
	marginBlock?: G.Responsive<Margin>;
};
