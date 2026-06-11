import Table, { TableBody, TableCell, TableHead, TableHeading, TableRow } from "./Table";

const TableRoot = Table as typeof Table & {
	Cell: typeof TableCell;
	Heading: typeof TableHeading;
	Row: typeof TableRow;
	Body: typeof TableBody;
	Head: typeof TableHead;
};

TableRoot.Cell = TableCell;
TableRoot.Heading = TableHeading;
TableRoot.Row = TableRow;
TableRoot.Body = TableBody;
TableRoot.Head = TableHead;

export default TableRoot;
export type {
	BodyProps as TableBodyProps,
	CellProps as TableCellProps,
	HeadingProps as TableHeadingProps,
	HeadProps as TableHeadProps,
	Props as TableProps,
	RowProps as TableRowProps,
} from "./Table.types";
