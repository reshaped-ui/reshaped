import Table, { TableCell, TableHeading, TableRow, TableBody, TableHead } from "./Table";

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
	Props as TableProps,
	HeadProps as TableHeadProps,
	BodyProps as TableBodyProps,
	RowProps as TableRowProps,
	CellProps as TableCellProps,
	HeadingProps as TableHeadingProps,
} from "./Table.types";
