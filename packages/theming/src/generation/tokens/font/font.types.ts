import type * as TFontFamily from "../fontFamily/fontFamily.types";
import type * as TFontWeight from "../fontWeight/fontWeight.types";
import type * as TUnit from "../unit/unit.types";

export type Name =
	| "headline1"
	| "headline2"
	| "headline3"
	| "featured1"
	| "featured2"
	| "featured3"
	| "featured4"
	| "featured5"
	| "featured6"
	| "body1"
	| "body2"
	| "caption1"
	| "caption2";

export type Token = {
	fontSize: TUnit.Token;
	lineHeight: TUnit.Token;
	fontFamilyToken?: TFontFamily.Name;
	fontWeightToken?: TFontWeight.Name;
	letterSpacing?: TUnit.Token;
};
