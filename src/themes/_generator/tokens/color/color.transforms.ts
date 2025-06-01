import type * as T from "./color.types";
import type { Transformer, TransformedToken } from "../types";

const transformTokenForMode = (args: { hex?: T.HexColor; oklch?: T.OklchColor }): string => {
	const { hex, oklch } = args;

	if (oklch) {
		const components = `${oklch.l.toFixed(4)} ${oklch.c.toFixed(4)} ${oklch.h?.toFixed(4) || 0}`;
		const alphaSuffix = oklch?.alpha === undefined ? "" : ` / ${oklch.alpha.toFixed(4)}`;
		return `oklch(${components}${alphaSuffix})`;
	}

	if (hex) return hex;

	throw new Error(`[Reshaped] ${JSON.stringify(args)} is missing a color value`);
};

const transformToken: Transformer<T.Token> = (name, token) => {
	const { hex, hexDark, oklch, oklchDark } = token;
	// Apply color to both modes if dark mode is not available
	const hasDark = !!hexDark || !!oklchDark;
	const defaultMode = hasDark ? "light" : undefined;

	const result: TransformedToken[] = [
		{
			name,
			tokenType: "color",
			type: "variable",
			value: transformTokenForMode({ oklch, hex }),
			mode: defaultMode,
		},
	];

	if (hasDark) {
		result.push({
			name,
			tokenType: "color",
			type: "variable",
			value: transformTokenForMode({ oklch: oklchDark, hex: hexDark }),
			mode: "dark",
		});
	}

	return result;
};

export default transformToken;
