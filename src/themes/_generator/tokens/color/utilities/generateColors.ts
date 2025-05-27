import type { ThemeDefinition } from "themes/_generator/tokens/types";
import {
	Token,
	HexColor,
	OklchToken,
	type Name as TokenName,
	type ColorValue,
	Hue,
} from "../color.types";
import { hexToOklch, tokenToOklchToken } from "./convert";

const parseColor = (color: HexColor | Token) => {
	const isString = typeof color === "string";

	if (!isString && "oklch" in color && color.oklch) {
		return {
			light: color.oklch,
			dark: color.oklchDark || color.oklch,
		};
	}

	const hexLight = isString ? color : color.hex;
	const hexDark = isString ? color : color.hexDark || color.hex;

	const light = hexToOklch(hexLight);
	const dark = hexToOklch(hexDark);

	if (!light || !dark) {
		throw new Error(`[Reshaped] Failed when parsing color: ${JSON.stringify(color)}`);
	}

	return { light, dark };
};

// const generateDarkModeValue = () => {};

const generateColorValues = (
	key: string,
	token: ColorValue
): Partial<Record<TokenName, OklchToken>> => {
	const { light, dark } = parseColor(token);
	const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

	return {
		[`background${capitalizedKey}`]: {
			oklch: light,
			oklchDark: dark,
		},
	};
};

const getOklchToken = (color: ColorValue) => {
	const token = typeof color === "string" ? { hex: color } : color;
	return tokenToOklchToken(token);
};

const generateColors = (args: Partial<Record<Hue, ColorValue>> = {}) => {
	const {
		primary = "#2563eb",
		critical = "#e22c2c",
		warning = "#facc15",
		positive = "#118850",
		neutral = "#e3e4e8",
		brand,
	} = args;

	return {
		...generateColorValues("primary", getOklchToken(primary)),
		...generateColorValues("critical", getOklchToken(critical)),
		...generateColorValues("warning", getOklchToken(warning)),
		...generateColorValues("positive", getOklchToken(positive)),
		...generateColorValues("neutral", getOklchToken(neutral)),
		brand: getOklchToken(brand || primary),
		white: getOklchToken("#ffffff"),
		black: getOklchToken("#000000"),
	} as ThemeDefinition["color"];
};

export default generateColors;
