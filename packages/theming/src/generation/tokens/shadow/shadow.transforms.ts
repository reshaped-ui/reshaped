import { hexToOklch, oklchToRgb } from "../color/utilities/convert";
import type { TransformedToken, Transformer } from "../types";
import type * as T from "./shadow.types";

const transformShadowParts = (
	parts: T.Token["parts"],
	theme: Parameters<Transformer<T.Token>>[2]["theme"]
) =>
	parts
		.map((value) => {
			const blur = ` ${value.blurRadius || 0}px`;
			const spread = ` ${value.spreadRadius || 0}px`;
			const colorRef = theme.color[value.colorToken];
			const rgb = oklchToRgb(hexToOklch(colorRef?.hex || "#000000"));
			const rgbString = `${rgb.r * 255}, ${rgb.g * 255}, ${rgb.b * 255}`;
			const color = `rgba(${rgbString}, ${value.opacity || 1})`;

			return `${value.offsetX}px ${value.offsetY}px${blur}${spread} ${color}`;
		})
		.join(", ");

const transformToken: Transformer<T.Token> = (name, token, { theme }) => {
	const value = transformShadowParts(token.parts, theme);
	const darkValue = token.dark ? transformShadowParts(token.dark.parts, theme) : undefined;
	const separateModes = !!darkValue && value !== darkValue;
	const defaultMode = separateModes ? "light" : undefined;
	const result: TransformedToken[] = [
		{
			name,
			tokenType: "shadow",
			type: "variable",
			value,
			mode: defaultMode,
		},
	];

	if (darkValue && separateModes) {
		result.push({
			name,
			tokenType: "shadow",
			type: "variable",
			value: darkValue,
			mode: "dark",
		});
	}

	return result;
};

export default transformToken;
