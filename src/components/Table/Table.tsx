"use client";

import React, { isValidElement } from "react";

import useFadeSide from "hooks/_private/useFadeSide";
import { resolveMixin } from "styles/mixin";
import { classNames, responsiveVariables } from "utilities/props";

import s from "./Table.module.css";

import type * as T from "./Table.types";

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
	const mixinStyles = resolveMixin({ width, minWidth });
	const headingClassNames = classNames(
		s.cell,
		mixinStyles.classNames,
		(width === 0 || width === "0px") && s["cell--width-auto"],
		align && s[`cell--align-${align}`],
		verticalAlign && s[`cell--valign-${verticalAlign}`],
		className
	);
	const headingStyle = {
		...mixinStyles.variables,
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

export const TableCell: React.FC<T.CellProps> = (props) => {
	return <TableCellPrivate {...props} tagName="td" />;
};

export const TableHeading: React.FC<T.HeadingProps> = (props) => {
	return <TableCellPrivate {...props} tagName="th" />;
};

export const TableRow: React.FC<T.RowProps> = (props) => {
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

export const TableBody: React.FC<T.BodyProps> = (props) => {
	const { children, attributes, className } = props;

	return (
		<tbody {...attributes} className={classNames(s.body, className)}>
			{children}
		</tbody>
	);
};

export const TableHead: React.FC<T.HeadProps> = (props) => {
	const { children, attributes, className } = props;

	return (
		<thead {...attributes} className={classNames(s.head, className)}>
			{children}
		</thead>
	);
};

const Table: React.FC<T.Props> = (props) => {
	const { children, border, columnBorder, className, attributes } = props;
	const rootRef = React.useRef<HTMLDivElement>(null);
	const fadeSide = useFadeSide(rootRef);
	const rootClassNames = classNames(
		s.root,
		className,
		border && s["--border-outer"],
		columnBorder && s["--border-column"],
		(fadeSide === "start" || fadeSide === "both") && s["--fade-start"],
		(fadeSide === "end" || fadeSide === "both") && s["--fade-end"]
	);
	const [firstChild] = React.Children.toArray(children);
	const isElement = isValidElement(firstChild);
	const isBody = isElement && firstChild.type === TableBody;
	const isHead = isElement && firstChild.type === TableHead;

	return (
		<div {...attributes} className={rootClassNames} ref={rootRef}>
			<table className={s.table}>
				{isBody || isHead ? children : <TableBody>{children}</TableBody>}
			</table>
		</div>
	);
};

Table.displayName = "Table";
TableCell.displayName = "TableCell";
TableHeading.displayName = "TableHeading";
TableRow.displayName = "TableRow";
TableBody.displayName = "TableBody";
TableHead.displayName = "TableHead";

export default Table;
