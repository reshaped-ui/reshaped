import { classNames, responsiveVariables, responsivePropDependency } from "utilities/props";
import { resolveMixin } from "styles/mixin";
import getJustifyStyles from "styles/resolvers/justify";
import getMaxWidthStyles from "styles/resolvers/maxWidth";
import getWidthStyles from "styles/resolvers/width";
import getHeightStyles from "styles/resolvers/height";
import type * as T from "./Grid.types";
import s from "./Grid.module.css";

const GridItem = <As extends keyof React.JSX.IntrinsicElements = "div">(props: T.ItemProps<As>) => {
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
		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		as: TagName = "div" as any,
		attributes,
	} = props;
	const itemClassNames = classNames(s.item, className);
	const resolvedColSpan = responsivePropDependency(colSpan, (value) => value && `span ${value}`);
	const resolvedRowSpan = responsivePropDependency(rowSpan, (value) => value && `span ${value}`);
	const rootVariables = {
		...attributes?.style,
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

const Grid = <As extends keyof React.JSX.IntrinsicElements = "div">(props: T.Props<As>) => {
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
		width,
		height,
		maxWidth,
		// Using any here to let TS save on type resolving, otherwise TS throws an error due to the type complexity
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		as: TagName = "div" as any,
		attributes,
	} = props;
	const mixinStyles = resolveMixin({ align });
	const justifyStyles = getJustifyStyles(justify);
	const maxWidthStyles = getMaxWidthStyles(maxWidth);
	const widthStyles = getWidthStyles(width);
	const heightStyles = getHeightStyles(height);
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
	const rootClassNames = classNames(
		s.root,
		mixinStyles.classNames,
		maxWidthStyles?.classNames,
		widthStyles?.classNames,
		heightStyles?.classNames,
		className
	);
	const rootVariables = {
		...attributes?.style,
		...responsiveVariables("--rs-grid-gap", gap),
		...responsiveVariables("--rs-grid-rows", resolvedRows),
		...responsiveVariables("--rs-grid-columns", resolvedColumns),
		...responsiveVariables("--rs-grid-areas", resolvedAreas),
		...responsiveVariables("--rs-grid-auto-flow", autoFlow),
		...responsiveVariables("--rs-grid-auto-columns", autoColumns),
		...responsiveVariables("--rs-grid-auto-rows", autoRows),
		...mixinStyles.variables,
		...justifyStyles?.variables,
		...maxWidthStyles?.variables,
		...widthStyles?.variables,
		...heightStyles?.variables,
	};

	return (
		<TagName {...attributes} className={rootClassNames} style={rootVariables}>
			{children}
		</TagName>
	);
};

Grid.Item = GridItem;

Grid.displayName = "Grid";
GridItem.displayName = "Grid.Item";

export default Grid;
