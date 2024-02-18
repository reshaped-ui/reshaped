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

export type Props<TagName extends keyof JSX.IntrinsicElements | void = void> = {
	variant?: G.Responsive<Variant>;
	weight?: "regular" | "medium" | "bold";
	color?:
		| "neutral"
		| "neutral-faded"
		| "critical"
		| "warning"
		| "positive"
		| "primary"
		| "disabled";
	align?: G.Responsive<"start" | "center" | "end">;
	wrap?: "balance";
	decoration?: "line-through";
	maxLines?: number;
	as?: TagName;
	children?: React.ReactNode;
	className?: G.ClassName;
	attributes?: G.Attributes<TagName>;
};
