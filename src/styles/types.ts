import React from "react";
import * as G from "types/global";

/* Values */
type Unit = number;
type Literal = string;
type Size = Literal | Unit;

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
	aspectRatio?: G.Responsive<AspectRatio>;
	bleed?: G.Responsive<Bleed>;
	border?: G.Responsive<BorderColor>;
	height?: G.Responsive<Height>;
	inset?: G.Responsive<Inset>;
	justify?: G.Responsive<Justify>;
	maxHeight?: G.Responsive<MaxHeight>;
	maxWidth?: G.Responsive<MaxWidth>;
	minHeight?: G.Responsive<MinHeight>;
	minWidth?: G.Responsive<MinWidth>;
	position?: G.Responsive<Position>;
	radius?: G.Responsive<Radius>;
	textAlign?: G.Responsive<TextAlign>;
	width?: G.Responsive<Width>;
};
