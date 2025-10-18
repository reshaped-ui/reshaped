import Table, { TableCell, TableHeading, TableRow, TableBody, TableHead } from "./Table";
import type * as T from "./Table.types";

const TableRoot = Table as React.FC<T.Props> & {
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
