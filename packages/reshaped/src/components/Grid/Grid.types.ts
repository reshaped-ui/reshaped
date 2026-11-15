import type { Property } from "csstype";
import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as TStyles from "@/styles/types";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Gap between grid items, base unit token number multiplier */
	gap?: G.Responsive<number>;
	/** Horizontal gap between grid items, base unit token number multiplier. Takes priority over `gap` */
	columnGap?: G.Responsive<number>;
	/** Vertical gap between grid items, base unit token number multiplier. Takes priority over `gap` */
	rowGap?: G.Responsive<number>;
	/** Align grid items vertically inside their rows, applied as align-items */
	align?: G.Responsive<TStyles.Align>;
	/** Justify grid columns horizontally, applied as justify-content.
	 * Only has an effect when the columns don't fill the grid width, e.g. when using fixed column sizes
	 */
	justify?: G.Responsive<TStyles.Justify>;
	/** Grid template rows, a number creates that many rows of equal height
	 * and a string is used as a css grid-template-rows value
	 */
	rows?: G.Responsive<number | Property.GridTemplateRows>;
	/** Grid template columns, a number creates that many columns of equal width
	 * and a string is used as a css grid-template-columns value
	 */
	columns?: G.Responsive<number | Property.GridTemplateColumns>;
	/** Grid areas for template syntax, each array item defines the area names of a single row.
	 * Assign the children to the areas with the `area` property of Grid.Item
	 */
	areas?: G.Responsive<string[]>;
	/** Grid auto flow */
	autoFlow?: G.Responsive<Property.GridAutoFlow>;
	/** Grid auto columns */
	autoColumns?: G.Responsive<Property.GridAutoColumns>;
	/** Grid auto rows */
	autoRows?: G.Responsive<Property.GridAutoRows>;
	/** Maximum width of the grid container, literal css value or unit token multiplier */
	maxWidth?: G.Responsive<string | number>;
	/** Width of the grid container, literal css value or unit token multiplier */
	width?: G.Responsive<string | number>;
	/** Height of the grid container, literal css value or unit token multiplier */
	height?: G.Responsive<string | number>;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Custom root element html tag
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName>;
};

export type ItemProps<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Grid area for template syntax, one of the names used in the Grid `areas` */
	area?: string;
	/** Starting column position, number of the grid line starting from 1 */
	colStart?: G.Responsive<number>;
	/** Ending column position, number of the grid line the item ends at: `colStart={1} colEnd={3}` takes 2 columns.
	 * Takes priority over `colSpan`
	 */
	colEnd?: G.Responsive<number>;
	/** Number of columns the item spans, ignored when `colEnd` is passed */
	colSpan?: G.Responsive<number>;
	/** Starting row position, number of the grid line starting from 1 */
	rowStart?: G.Responsive<number>;
	/** Ending row position, number of the grid line the item ends at: `rowStart={1} rowEnd={3}` takes 2 rows.
	 * Takes priority over `rowSpan`
	 */
	rowEnd?: G.Responsive<number>;
	/** Number of rows the item spans, ignored when `rowEnd` is passed */
	rowSpan?: G.Responsive<number>;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Custom item element html tag
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
	/** Additional classname for the item element */
	className?: ClassName;
	/** Additional attributes for the item element */
	attributes?: Attributes<TagName>;
};
