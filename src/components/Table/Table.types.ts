import React from "react";
import type * as G from "types/global";

export type Props = {
	border?: boolean;
	columnBorder?: boolean;
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type RowProps = {
	highlighted?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"tr">;
};

export type CellProps = {
	align?: "start" | "center" | "end";
	verticalAlign?: "start" | "center" | "end";
	rowSpan?: number;
	colSpan?: number;
	padding?: number;
	paddingInline?: number;
	paddingBlock?: number;
	width?: "auto" | string | number;
	minWidth?: string | number;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"td">;
};

export type HeadingProps = CellProps & {
	attributes?: G.Attributes<"th">;
};

export type BodyProps = {
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"tbody">;
};

export type HeadProps = {
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"thead">;
};

export type PrivateCellProps = CellProps & {
	tagName: "td" | "th";
};
