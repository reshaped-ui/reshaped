import React from "react";
import type * as G from "types/global";

export type Props = {
	border?: "all" | "rows";
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
	children?: React.ReactNode;
	attributes?: G.Attributes<"td">;
};

export type HeadingProps = Pick<CellProps, "align" | "rowSpan" | "colSpan" | "children"> & {
	width?: string | number;
	minWidth?: string | number;
	attributes?: G.Attributes<"th">;
};
