import type React from "react";
import type * as G from "types/global";

export type Variant =
	| "title-1"
	| "title-2"
	| "title-3"
	| "title-4"
	| "title-5"
	| "title-6"
	| "featured-1"
	| "featured-2"
	| "featured-3"
	| "body-1"
	| "body-2"
	| "body-3"
	| "caption-1"
	| "caption-2";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Text render variant */
	variant?: G.Responsive<Variant>;
	/** Text font weight */
	weight?: G.Responsive<"regular" | "medium" | "bold">;
	/** Render monospace font */
	monospace?: boolean;
	/** Text color, based on the color tokens */
	color?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "warning"
		| "positive"
		| "primary"
		| "disabled";
	/** Text alignment */
	align?: G.Responsive<"start" | "center" | "end">;
	/** CSS wrapping style */
	wrap?: "balance";
	/** CSS text decoration style */
	decoration?: "line-through";
	/** Maximum number of lines to render, used for text truncation */
	maxLines?: number;
	/** Render as a numeric value to preserve the width of each character */
	numeric?: true;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<TagName>;
	/** Render as a different html tag */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
};
