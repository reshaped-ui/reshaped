import React from "react";
import type * as G from "types/global";

export type Props = {
	border?: boolean;
	columnBorder?: boolean;
	size?: "medium" | "large";
	children: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type RowProps = {
	highlighted?: boolean;
	children: React.ReactNode;
	attributes?: G.Attributes<"tr">;
};

export type CellProps = {
	align?: "start" | "center" | "end";
	rowSpan?: number;
	colSpan?: number;
	padding?: number;
	paddingInline?: number;
	paddingBlock?: number;
	width?: "auto" | string | number;
	minWidth?: string | number;
	children?: React.ReactNode;
	attributes?: G.Attributes<"td">;
};

export type HeadingProps = CellProps & {
	attributes?: G.Attributes<"th">;
};

export type BodyProps = {
	children: React.ReactNode;
};

export type HeadProps = {
	children: React.ReactNode;
};

export type PrivateCellProps = HeadingProps & {
	tagName: "td" | "th";
};
