import { classNames, responsiveVariables, responsivePropDependency } from "utilities/helpers";
import getAlignStyles from "styles/align";
import getJustifyStyles from "styles/justify";
import type * as T from "./Grid.types";
import s from "./Grid.module.css";

const GridItem = <As extends keyof JSX.IntrinsicElements = "div">(props: T.ItemProps<As>) => {
	const {
		area,
		colStart,
		colEnd,
		colSpan,
		rowStart,
		rowEnd,
		rowSpan,
		children,
		className,
		as: TagName = "div" as any,
		attributes,
	} = props;
	const itemClassNames = classNames(s.item, className);
	const resolvedColSpan = responsivePropDependency(colSpan, (value) => value && `span ${value}`);
	const resolvedRowSpan = responsivePropDependency(rowSpan, (value) => value && `span ${value}`);
	const rootVariables = {
		...responsiveVariables("--rs-grid-area", area),
		...responsiveVariables("--rs-grid-col-end", resolvedColSpan),
		// both span and end use the same css variable but end has a higher prioerity
		...responsiveVariables("--rs-grid-col-end", colEnd),
		...responsiveVariables("--rs-grid-col-start", colStart),
		...responsiveVariables("--rs-grid-row-end", resolvedRowSpan),
		...responsiveVariables("--rs-grid-row-end", rowEnd),
		...responsiveVariables("--rs-grid-row-start", rowStart),
	};

	return (
		<TagName {...attributes} className={itemClassNames} style={rootVariables}>
			{children}
		</TagName>
	);
};

const Grid = <As extends keyof JSX.IntrinsicElements = "div">(props: T.Props<As>) => {
	const {
		areas,
		columns,
		rows,
		gap,
		align,
		justify,
		autoColumns,
		autoRows,
		autoFlow,
		children,
		className,
		as: TagName = "div" as any,
		attributes,
	} = props;
	const alignStyles = getAlignStyles(align);
	const justifyStyles = getJustifyStyles(justify);
	const resolvedRows = responsivePropDependency(rows, (value) =>
		typeof value === "number" ? `repeat(${value}, 1fr)` : value
	);
	const resolvedColumns = responsivePropDependency(columns, (value) =>
		typeof value === "number" ? `repeat(${value}, 1fr)` : value
	);
	const resolvedAreas = responsivePropDependency(areas, (value) =>
		value
			? `"${value?.join('" "')}"
	`
			: undefined
	);
	const rootClassNames = classNames(s.root, className);
	const rootVariables = {
		...responsiveVariables("--rs-grid-gap", gap),
		...responsiveVariables("--rs-grid-rows", resolvedRows),
		...responsiveVariables("--rs-grid-columns", resolvedColumns),
		...responsiveVariables("--rs-grid-areas", resolvedAreas),
		...responsiveVariables("--rs-grid-auto-flow", autoFlow),
		...responsiveVariables("--rs-grid-auto-columns", autoColumns),
		...responsiveVariables("--rs-grid-auto-rows", autoRows),
		...alignStyles?.variables,
		...justifyStyles?.variables,
	};

	return (
		<TagName {...attributes} className={rootClassNames} style={rootVariables}>
			{children}
		</TagName>
	);
};

Grid.Item = GridItem;
export default Grid;
