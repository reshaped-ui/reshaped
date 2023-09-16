import React from "react";
import { classNames } from "utilities/helpers";
import getWidthStyles from "styles/width";
import getMinWidthStyles from "styles/minWidth";
import type * as T from "./Table.types";
import s from "./Table.module.css";

const TableCell = (props: T.CellProps) => {
	const { rowSpan, colSpan, align, children, attributes } = props;
	const cellClassNames = classNames(s.cell, align && s[`cell--align-${align}`]);

	return (
		<td {...attributes} className={cellClassNames} rowSpan={rowSpan} colSpan={colSpan}>
			{children}
		</td>
	);
};

const TableHeading = (props: T.HeadingProps) => {
	const { width, minWidth, rowSpan, colSpan, align, children, attributes } = props;
	const widthStyles = getWidthStyles(width);
	const minWidthStyles = getMinWidthStyles(minWidth || width);
	const headingClassNames = classNames(
		s.cell,
		widthStyles?.classNames,
		minWidthStyles?.classNames,
		align && s[`cell--align-${align}`]
	);
	const headingStyle = { ...widthStyles?.variables, ...minWidthStyles?.variables };

	return (
		<th
			{...attributes}
			className={headingClassNames}
			rowSpan={rowSpan}
			colSpan={colSpan}
			style={headingStyle}
		>
			{children}
		</th>
	);
};

const TableRow = (props: T.RowProps) => {
	const { highlighted, children, attributes } = props;
	const rowClassNames = classNames(s.row, highlighted && s["--row-highlighted"]);

	return (
		<tr {...attributes} className={rowClassNames}>
			{children}
		</tr>
	);
};

const Table = (props: T.Props) => {
	const { children, border, className, attributes } = props;
	const rootClassNames = classNames(s.root, className, border && s[`--border-${border}`]);

	return (
		<div {...attributes} className={rootClassNames}>
			<table className={s.table}>{children}</table>
		</div>
	);
};

Table.Cell = TableCell;
Table.Heading = TableHeading;
Table.Row = TableRow;
export default Table;
