import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Variant =
	| "headline-1"
	| "headline-2"
	| "headline-3"
	| "featured-1"
	| "featured-2"
	| "featured-3"
	| "featured-4"
	| "featured-5"
	| "featured-6"
	| "body-1"
	| "body-2"
	| "caption-1"
	| "caption-2";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = {
	/** Text render variant, applies the font size, line height, weight and family of the typography token.
	 * Font size, weight and family are inherited from the parent when not passed
	 */
	variant?: G.Responsive<Variant>;
	/** Text font weight, overrides the font weight of the `variant` */
	weight?: G.Responsive<"regular" | "medium" | "semibold" | "bold" | "extrabold">;
	/** Render monospace font */
	monospace?: boolean;
	/** Text color, based on the color tokens. Color is inherited from the parent when not passed */
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
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName>;
	/** Render as a different html tag. When not passed, "featured-1" to "featured-6" variants render as h1 to h6
	 * and the rest of the variants render as div
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
};
