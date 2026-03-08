import type * as TColor from "../color/color.types";

export type Name =
	| "raised"
	| "overlay"
	| "border"
	| "borderRaised"
	| "borderOverlay"
	| "borderFaded"
	| "borderFadedRaised"
	| "borderFadedOverlay";

type Part = {
	offsetX: number;
	offsetY: number;
	blurRadius?: number;
	spreadRadius?: number;
	colorToken: TColor.Name;
	opacity: number;
};

export type Token = {
	parts: Array<Part>;
	dark?: {
		parts: Array<Part>;
	};
};
export type ResolvedToken = Array<Omit<Token["parts"][0], "colorToken"> & { color: TColor.Token }>;
