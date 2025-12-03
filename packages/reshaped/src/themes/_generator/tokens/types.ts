import { PartialDeep, PrivateOptions } from "../types";

import * as TZIndex from "./zIndex/zIndex.types";

import type * as TColor from "./color/color.types";
import type * as TDuration from "./duration/duration.types";
import type * as TEasing from "./easing/easing.types";
import type * as TFont from "./font/font.types";
import type * as TFontFamily from "./fontFamily/fontFamily.types";
import type * as TFontWeight from "./fontWeight/fontWeight.types";
import type * as TRadius from "./radius/radius.types";
import type * as TShadow from "./shadow/shadow.types";
import type * as TUnit from "./unit/unit.types";
import type * as TViewport from "./viewport/viewport.types";

export type TokenType =
	| "fontFamily"
	| "fontWeight"
	| "unit"
	| "radius"
	| "viewport"
	| "font"
	| "color"
	| "duration"
	| "easing"
	| "shadow"
	| "zIndex";

type TokenSet<Name extends string, Token> = Record<Name, Token> & {
	[tokenName: string]: Token;
};

/**
 * Internal theme definition with all required tokens
 */
export type ThemeDefinition = {
	unit: TokenSet<TUnit.Name, TUnit.Token>;
	radius: TokenSet<TRadius.Name, TRadius.Token>;
	fontFamily: TokenSet<TFontFamily.Name, TFontFamily.Token>;
	fontWeight: TokenSet<TFontWeight.Name, TFontWeight.Token>;
	font: TokenSet<TFont.Name, TFont.Token>;
	color: TokenSet<TColor.Name, TColor.PassedToken>;
	duration: TokenSet<TDuration.Name, TDuration.Token>;
	easing: TokenSet<TEasing.Name, TEasing.Token>;
	shadow: TokenSet<TShadow.Name, TShadow.Token>;
	viewport: Record<Exclude<TViewport.Name, "s">, TViewport.Token>;
	zIndex: Record<TZIndex.Name, TZIndex.Token>;
};

/**
 * Externally configured theme which might override just some of the tokens
 * but also might include custom "on" colors
 */
export type PassedThemeDefinition = Omit<PartialDeep<ThemeDefinition>, "color"> & {
	color?: Partial<TokenSet<TColor.Name | TColor.GeneratedOnName, TColor.PassedToken>>;
};

/**
 * Theme generation output which includes all generated tokens
 * but might not include some of the tokens when used for theme fragments
 */
export type GeneratedThemeDefinition = Omit<
	PassedThemeDefinition,
	"color" | "unit" | "viewport"
> & {
	color: Partial<
		TokenSet<TColor.GeneratedOnName | TColor.GeneratedRGBName | TColor.Name, TColor.Token>
	>;
	unit: Partial<TokenSet<TUnit.GeneratedName | TUnit.Name, TUnit.Token>>;
	viewport: Partial<TokenSet<TViewport.Name, TViewport.Token | TViewport.SToken>>;
};

export type TransformedToken = {
	name: string;
	tokenType: TokenType | "fontSize" | "lineHeight" | "letterSpacing";
	value: string;
	type: "variable" | "media";
	mode?: "light" | "dark";
	private?: boolean;
	viewport?: string;
};

export type Transformer<Token> = (
	name: string,
	token: Token,
	options: {
		theme: GeneratedThemeDefinition;
		themeOptions: PrivateOptions["themeOptions"];
	}
) => TransformedToken[];
