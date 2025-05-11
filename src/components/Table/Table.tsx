import React from "react";
import { classNames, responsiveVariables } from "utilities/props";
import getWidthStyles from "styles/width";
import getMinWidthStyles from "styles/minWidth";
import type * as T from "./Table.types";
import s from "./Table.module.css";

const TableCellPrivate: React.FC<T.PrivateCellProps> = (props) => {
	const {
		minWidth,
		rowSpan,
		colSpan,
		align,
		verticalAlign,
		tagName: TagName,
		padding,
		paddingInline,
		paddingBlock,
		children,
		className,
		attributes,
	} = props;
	const width = props.width === "auto" ? "0px" : props.width;
	const widthStyles = getWidthStyles(width);
	const minWidthStyles = getMinWidthStyles(minWidth || width);
	const headingClassNames = classNames(
		s.cell,
		widthStyles?.classNames,
		minWidthStyles?.classNames,
		(width === 0 || width === "0px") && s["cell--width-auto"],
		align && s[`cell--align-${align}`],
		verticalAlign && s[`cell--valign-${verticalAlign}`],
		className
	);
	const headingStyle = {
		...widthStyles?.variables,
		...minWidthStyles?.variables,
		...responsiveVariables("--rs-table-p-vertical", paddingBlock ?? padding),
		...responsiveVariables("--rs-table-p-horizontal", paddingInline ?? padding),
	};

	return (
		<TagName
			{...attributes}
			className={headingClassNames}
			rowSpan={rowSpan}
			colSpan={colSpan}
			style={headingStyle}
		>
			{children}
		</TagName>
	);
};

const TableCell: React.FC<T.CellProps> = (props) => {
	return <TableCellPrivate {...props} tagName="td" />;
};

const TableHeading: React.FC<T.HeadingProps> = (props) => {
	return <TableCellPrivate {...props} tagName="th" />;
};

const TableRow: React.FC<T.RowProps> = (props) => {
	const { highlighted, children, className, attributes } = props;
	const onClick = props.onClick || attributes?.onClick;
	const rowClassNames = classNames(s.row, highlighted && s["--row-highlighted"], className);

	return (
		<tr
			{...attributes}
			className={rowClassNames}
			onClick={onClick}
			tabIndex={onClick ? 0 : undefined}
		>
			{children}
		</tr>
	);
};

const TableBody: React.FC<T.BodyProps> = (props) => {
	const { children, attributes, className } = props;

	return (
		<tbody {...attributes} className={classNames(s.body, className)}>
			{children}
		</tbody>
	);
};

const TableHead: React.FC<T.HeadProps> = (props) => {
	const { children, attributes, className } = props;

	return (
		<thead {...attributes} className={classNames(s.head, className)}>
			{children}
		</thead>
	);
};

const Table: React.FC<T.Props> & {
	Cell: typeof TableCell;
	Heading: typeof TableHeading;
	Row: typeof TableRow;
	Body: typeof TableBody;
	Head: typeof TableHead;
} = (props) => {
	const { children, border, columnBorder, className, attributes } = props;
	const rootClassNames = classNames(
		s.root,
		className,
		border && s["--border-outer"],
		columnBorder && s["--border-column"]
	);
	const [firstChild] = React.Children.toArray(children);

	return (
		<div {...attributes} className={rootClassNames}>
			<table className={s.table}>
				{React.isValidElement(firstChild) &&
				(firstChild.type === TableBody || firstChild.type === TableHead) ? (
					children
				) : (
					<TableBody>{children}</TableBody>
				)}
			</table>
		</div>
	);
};

Table.Cell = TableCell;
Table.Heading = TableHeading;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Head = TableHead;

Table.displayName = "Table";
TableCell.displayName = "TableCell";
TableHeading.displayName = "TableHeading";
TableRow.displayName = "TableRow";
TableBody.displayName = "TableBody";
TableHead.displayName = "TableHead";

export default Table;
