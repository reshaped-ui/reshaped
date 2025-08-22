import type React from "react";
import type { Property } from "csstype";
import type * as G from "types/global";
import type * as TStyles from "styles/types";

export type Props<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	/** Gap between grid items */
	gap?: G.Responsive<number>;
	/** Align grid items vertically */
	align?: G.Responsive<TStyles.Align>;
	/** Justify grid items horizontally */
	justify?: G.Responsive<TStyles.Justify>;
	/** Grid template rows */
	rows?: G.Responsive<number | Property.GridTemplateRows>;
	/** Grid template columns */
	columns?: G.Responsive<number | Property.GridTemplateColumns>;
	/** Grid areas for template syntax */
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
	/** Custom root element html tag */
	as?: TagName;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<TagName>;
};

export type ItemProps<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	/** Grid area for template syntax */
	area?: string;
	/** Starting column position */
	colStart?: G.Responsive<number>;
	/** Ending column position */
	colEnd?: G.Responsive<number>;
	/** Column span value */
	colSpan?: G.Responsive<number>;
	/** Starting row position */
	rowStart?: G.Responsive<number>;
	/** Ending row position */
	rowEnd?: G.Responsive<number>;
	/** Row span value */
	rowSpan?: G.Responsive<number>;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Custom item element html tag */
	as?: TagName;
	/** Additional classname for the item element */
	className?: G.ClassName;
	/** Additional attributes for the item element */
	attributes?: G.Attributes<TagName>;
};
