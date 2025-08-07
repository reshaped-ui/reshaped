import type React from "react";
import type { Property } from "csstype";
import type * as G from "types/global";
import type * as TStyles from "styles/types";

export type Props<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	gap?: G.Responsive<number>;
	align?: G.Responsive<TStyles.Align>;
	justify?: G.Responsive<TStyles.Justify>;
	rows?: G.Responsive<number | Property.GridTemplateRows>;
	columns?: G.Responsive<number | Property.GridTemplateColumns>;
	areas?: G.Responsive<string[]>;
	autoFlow?: G.Responsive<Property.GridAutoFlow>;
	autoColumns?: G.Responsive<Property.GridAutoColumns>;
	autoRows?: G.Responsive<Property.GridAutoRows>;
	maxWidth?: G.Responsive<string | number>;
	width?: G.Responsive<string | number>;
	height?: G.Responsive<string | number>;
	children?: React.ReactNode;
	as?: TagName;
	className?: G.ClassName;
	attributes?: G.Attributes<TagName>;
};

export type ItemProps<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	area?: string;
	colStart?: G.Responsive<number>;
	colEnd?: G.Responsive<number>;
	colSpan?: G.Responsive<number>;
	rowStart?: G.Responsive<number>;
	rowEnd?: G.Responsive<number>;
	rowSpan?: G.Responsive<number>;
	children?: React.ReactNode;
	as?: TagName;
	className?: G.ClassName;
	attributes?: G.Attributes<TagName>;
};
