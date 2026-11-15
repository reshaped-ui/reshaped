import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Props = {
	/** Add border around the table */
	border?: boolean;
	/** Add border between the table columns */
	columnBorder?: boolean;
	/** Node for inserting children.
	 * Rows can be passed directly and get wrapped with Table.Body, unless the first child is Table.Head or Table.Body
	 */
	children: React.ReactNode;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element, which is a horizontally scrollable div wrapping the table element */
	attributes?: Attributes<"div">;
};

export type RowProps = {
	/** Highlight the row with a background color, for example for selected rows or for the row with headings.
	 * Only changes the styles and doesn't set any selection attributes
	 */
	highlighted?: boolean;
	/** Callback when the row is clicked. Makes the row focusable and shows a pointer cursor,
	 * but doesn't add a role or trigger on Enter and Space, so keep the same action available from a control inside the row
	 */
	onClick?: (e: React.MouseEvent) => void;
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the row element */
	className?: ClassName;
	/** Additional attributes for the row element */
	attributes?: Attributes<"tr">;
};

export type CellProps = {
	/** Align the cell content horizontally
	 * @default "start"
	 */
	align?: "start" | "center" | "end";
	/** Align the cell content vertically
	 * @default "start"
	 */
	verticalAlign?: "start" | "center" | "end";
	/** Merge the cell with the cells below */
	rowSpan?: number;
	/** Merge the cell with the cells to the right */
	colSpan?: number;
	/** Padding of the cell for both directions, base unit token number multiplier.
	 * paddingInline and paddingBlock take priority over it
	 */
	padding?: number;
	/** Padding of the cell inline, base unit token number multiplier.
	 * Applied only to the start side unless it's the last cell of the row or the table uses columnBorder
	 * @default 4
	 */
	paddingInline?: number;
	/** Padding of the cell block, base unit token number multiplier
	 * @default 3
	 */
	paddingBlock?: number;
	/** Width of the cell, literal css value or a base unit token number multiplier.
	 * Use "auto" to shrink the column to the width of its content without wrapping it
	 */
	width?: "auto" | string | number;
	/** Minimum width of the cell, literal css value or a base unit token number multiplier */
	minWidth?: string | number;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the cell element */
	className?: ClassName;
	/** Additional attributes for the cell element */
	attributes?: Attributes<"td">;
};

export type HeadingProps = CellProps & {
	/** Additional attributes for the heading element */
	attributes?: Attributes<"th">;
};

export type BodyProps = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the body element */
	className?: ClassName;
	/** Additional attributes for the body element */
	attributes?: Attributes<"tbody">;
};

export type HeadProps = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Additional classname for the head element */
	className?: ClassName;
	/** Additional attributes for the head element */
	attributes?: Attributes<"thead">;
};

export type PrivateCellProps = CellProps & {
	tagName: "td" | "th";
};
