import type * as TColor from "./color/color.types";
import type * as TDuration from "./duration/duration.types";
import type * as TEasing from "./easing/easing.types";
import type * as TFont from "./font/font.types";
import type * as TFontFamily from "./fontFamily/fontFamily.types";
import type * as TFontWeight from "./fontWeight/fontWeight.types";
import type * as TShadow from "./shadow/shadow.types";
import type * as TUnit from "./unit/unit.types";
import type * as TViewport from "./viewport/viewport.types";

export type TokenType =
	| "fontFamily"
	| "fontWeight"
	| "unit"
	| "viewport"
	| "font"
	| "color"
	| "duration"
	| "easing"
	| "shadow";

export type BaseThemeDefinition = {
	viewport: Record<TViewport.Name, TViewport.Token>;
};

type TokenSet<Name extends string, Token> = Record<Name, Token> & {
	[tokenName: string]: Token;
};

export type UserThemeDefinition = {
	unit: TokenSet<TUnit.Name, TUnit.Token>;
	fontFamily: TokenSet<TFontFamily.Name, TFontFamily.Token>;
	fontWeight: TokenSet<TFontWeight.Name, TFontWeight.Token>;
	font: TokenSet<TFont.Name, TFont.Token>;
	color: TokenSet<TColor.Name, TColor.Token>;
	duration: TokenSet<TDuration.Name, TDuration.Token>;
	easing: TokenSet<TEasing.Name, TEasing.Token>;
	shadow: TokenSet<TShadow.Name, TShadow.Token>;
};

export type PartialUserThemeDefinition = {
	unit?: Partial<UserThemeDefinition["unit"]>;
	fontFamily?: Partial<UserThemeDefinition["fontFamily"]>;
	fontWeight?: Partial<UserThemeDefinition["fontWeight"]>;
	font?: Partial<UserThemeDefinition["font"]>;
	color?: Partial<UserThemeDefinition["color"]>;
	duration?: Partial<UserThemeDefinition["duration"]>;
	easing?: Partial<UserThemeDefinition["easing"]>;
	shadow?: Partial<UserThemeDefinition["shadow"]>;
};

export type ThemeDefinition = BaseThemeDefinition & UserThemeDefinition;

// Includes generated colors
export type FullThemeDefinition = ThemeDefinition & {
	color: Record<TColor.GeneratedOnName | TColor.GeneratedRGBName | TColor.Name, TColor.Token>;
	unit: Record<TUnit.GeneratedName | TUnit.Name, TUnit.Token>;
};

export type TransformedToken = {
	name: string;
	tokenType: TokenType | "fontSize" | "lineHeight";
	value: string;
	type: "variable" | "media";
	mode?: "light" | "dark";
	private?: boolean;
	viewport?: string;
};

export type Transformer<Token> = (
	name: string,
	token: Token,
	theme: FullThemeDefinition
) => TransformedToken[];
