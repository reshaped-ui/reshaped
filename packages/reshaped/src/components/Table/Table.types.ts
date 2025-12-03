import React from "react";

import type * as G from "types/global";

export type Props = {
	/** Add border around the table */
	border?: boolean;
	/** Add border between the table columns */
	columnBorder?: boolean;
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type RowProps = {
	/** Indicate that the row is selected */
	highlighted?: boolean;
	/** Callback when the row is clicked */
	onClick?: (e: React.MouseEvent) => void;
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the row element */
	className?: G.ClassName;
	/** Additional attributes for the row element */
	attributes?: G.Attributes<"tr">;
};

export type CellProps = {
	/** Align the cell content */
	align?: "start" | "center" | "end";
	/** Align the cell content vertically */
	verticalAlign?: "start" | "center" | "end";
	/** Merge the cell with the cells below */
	rowSpan?: number;
	/** Merge the cell with the cells to the right */
	colSpan?: number;
	/** Padding of the cell */
	padding?: number;
	/** Padding of the cell inline, base unit token number multiplier */
	paddingInline?: number;
	/** Padding of the cell block, base unit token number multiplier */
	paddingBlock?: number;
	/** Width of the cell, literal css value or a base unit token number multiplier */
	width?: "auto" | string | number;
	/** Minimum width of the cell, literal css value or a base unit token number multiplier */
	minWidth?: string | number;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the cell element */
	className?: G.ClassName;
	/** Additional attributes for the cell element */
	attributes?: G.Attributes<"td">;
};

export type HeadingProps = CellProps & {
	/** Additional attributes for the heading element */
	attributes?: G.Attributes<"th">;
};

export type BodyProps = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the body element */
	className?: G.ClassName;
	/** Additional attributes for the body element */
	attributes?: G.Attributes<"tbody">;
};

export type HeadProps = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the head element */
	className?: G.ClassName;
	/** Additional attributes for the head element */
	attributes?: G.Attributes<"thead">;
};

export type PrivateCellProps = CellProps & {
	tagName: "td" | "th";
};
