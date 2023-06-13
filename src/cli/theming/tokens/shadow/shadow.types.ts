import type * as TColor from "../color/color.types";

export type Name = "raised" | "overlay";

export type Token = Array<{
	offsetX: number;
	offsetY: number;
	blurRadius?: number;
	spreadRadius?: number;
	colorToken: TColor.Name;
	opacity: number;
}>;
export type ResolvedToken = Array<Omit<Token[0], "colorToken"> & { color: TColor.Token }>;
