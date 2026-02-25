import { useMode, modeOklch, type Oklch, formatHex, modeRgb } from "culori/fn";

import type * as TColor from "../color.types";

// eslint-disable-next-line react-hooks/rules-of-hooks
const oklch = useMode(modeOklch);
// eslint-disable-next-line react-hooks/rules-of-hooks
const rgb = useMode(modeRgb);

export const hexToOklch = (hex: string): Oklch => {
	const result = oklch(formatHex(hex));

	if (!result) throw new Error(`[Reshaped] Can't convert ${hex} to oklch`);
	return result;
};

export const oklchToRgb = (oklch: Oklch) => {
	const value = rgb(oklch);

	return {
		...value,
		r: Number(value.r.toFixed(4)),
		g: Number(value.g.toFixed(4)),
		b: Number(value.b.toFixed(4)),
	};
};

export const tokenToOklchToken = (token: TColor.PassedToken): TColor.InternalToken => {
	const hexDarkFallback = token.hexDark ? hexToOklch(token.hexDark) : undefined;

	return {
		oklch: token.oklch ? { ...token.oklch, mode: "oklch" } : hexToOklch(token.hex),
		oklchDark: token.oklchDark ? { ...token.oklchDark, mode: "oklch" } : hexDarkFallback,
	};
};
