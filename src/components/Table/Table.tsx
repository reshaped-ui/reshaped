import React from "react";
import { classNames, responsiveVariables } from "utilities/helpers";
import getWidthStyles from "styles/width";
import getMinWidthStyles from "styles/minWidth";
import type * as T from "./Table.types";
import s from "./Table.module.css";

const TableCellPrivate = (props: T.PrivateCellProps) => {
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
		attributes,
	} = props;
	const width = props.width === "auto" ? "0px" : props.width;
	const widthStyles = getWidthStyles(width);
	const minWidthStyles = getMinWidthStyles(minWidth || width);
	const headingClassNames = classNames(
		s.cell,
		widthStyles?.classNames,
		minWidthStyles?.classNames,
		align && s[`cell--align-${align}`],
		verticalAlign && s[`cell--valign-${verticalAlign}`]
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

const TableCell = (props: T.CellProps) => {
	return <TableCellPrivate {...props} tagName="td" />;
};

const TableHeading = (props: T.HeadingProps) => {
	return <TableCellPrivate {...props} tagName="th" />;
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

const TableBody = (props: T.BodyProps) => {
	return <tbody>{props.children}</tbody>;
};

const TableHead = (props: T.HeadProps) => {
	return <thead>{props.children}</thead>;
};

const Table = (props: T.Props) => {
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
export default Table;
