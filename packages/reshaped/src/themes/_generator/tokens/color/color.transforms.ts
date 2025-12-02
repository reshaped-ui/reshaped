import { PrivateOptions } from "themes/_generator/types";

import type * as T from "./color.types";
import type { Transformer, TransformedToken } from "../types";

const transformTokenForMode = (
	args: { hex?: T.HexColor; oklch?: T.OklchColor },
	themeOptions: PrivateOptions["themeOptions"]
): string => {
	const { hex, oklch } = args;

	if (oklch && themeOptions?.colorOutputFormat !== "hex") {
		const components = `${Number(oklch.l.toFixed(4))} ${Number(oklch.c.toFixed(4))} ${Number(oklch.h?.toFixed(4) || 0)}`;
		const alphaSuffix = oklch?.alpha === undefined ? "" : ` / ${Number(oklch.alpha.toFixed(4))}`;
		return `oklch(${components}${alphaSuffix})`;
	}

	if (hex) return hex;

	throw new Error(`[Reshaped] ${JSON.stringify(args)} is missing a color value`);
};

const transformToken: Transformer<T.Token> = (name, token, { themeOptions }) => {
	const { hex, hexDark, oklch, oklchDark } = token;
	// Apply color to both modes if dark mode is not available
	const hasDark = !!hexDark || !!oklchDark;
	const value = transformTokenForMode({ oklch, hex }, themeOptions);
	const darkValue = hasDark
		? transformTokenForMode({ oklch: oklchDark, hex: hexDark }, themeOptions)
		: undefined;
	const separateModes = hasDark && value !== darkValue;
	const defaultMode = separateModes ? "light" : undefined;

	const result: TransformedToken[] = [
		{
			name,
			tokenType: "color",
			type: "variable",
			value,
			mode: defaultMode,
		},
	];

	if (darkValue && separateModes) {
		result.push({
			name,
			tokenType: "color",
			type: "variable",
			value: darkValue,
			mode: "dark",
		});
	}

	return result;
};

export default transformToken;
