import type * as TColor from "../color/color.types";

export type Name =
	| "base"
	| "raised"
	| "overlay"
	| "baseIntense"
	| "raisedIntense"
	| "overlayIntense";

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
