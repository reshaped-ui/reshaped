import type * as TFontFamily from "../fontFamily/fontFamily.types";
import type * as TFontWeight from "../fontWeight/fontWeight.types";
import type * as TUnit from "../unit/unit.types";

export type Name =
	| "title1"
	| "title2"
	| "title3"
	| "title4"
	| "title5"
	| "title6"
	| "featured1"
	| "featured2"
	| "featured3"
	| "body1"
	| "body2"
	| "body3"
	| "caption1"
	| "caption2";

export type Token = {
	fontSize: TUnit.Token;
	lineHeight: TUnit.Token;
	fontFamilyToken?: TFontFamily.Name;
	fontWeightToken?: TFontWeight.Name;
	letterSpacing?: TUnit.Token;
};
