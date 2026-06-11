import type { Oklch } from "culori/fn";

export type Hue = "primary" | "positive" | "critical" | "warning" | "neutral" | "brand";

export type Name =
	| "foregroundNeutral"
	| "foregroundNeutralFaded"
	| "foregroundDisabled"
	| "foregroundPrimary"
	| "foregroundCritical"
	| "foregroundWarning"
	| "foregroundPositive"
	| "borderNeutral"
	| "borderNeutralFaded"
	| "borderDisabled"
	| "borderPrimary"
	| "borderPrimaryFaded"
	| "borderCritical"
	| "borderCriticalFaded"
	| "borderWarning"
	| "borderWarningFaded"
	| "borderPositive"
	| "borderPositiveFaded"
	| "backgroundNeutral"
	| "backgroundNeutralFaded"
	| "backgroundNeutralHighlighted"
	| "backgroundNeutralHighlightedFaded"
	| "backgroundDisabled"
	| "backgroundDisabledFaded"
	| "backgroundPrimary"
	| "backgroundPrimaryFaded"
	| "backgroundPrimaryHighlighted"
	| "backgroundPrimaryHighlightedFaded"
	| "backgroundCritical"
	| "backgroundCriticalFaded"
	| "backgroundCriticalHighlighted"
	| "backgroundCriticalHighlightedFaded"
	| "backgroundWarning"
	| "backgroundWarningFaded"
	| "backgroundWarningHighlighted"
	| "backgroundWarningHighlightedFaded"
	| "backgroundPositive"
	| "backgroundPositiveFaded"
	| "backgroundPositiveHighlighted"
	| "backgroundPositiveHighlightedFaded"
	| "backgroundPage"
	| "backgroundPageFaded"
	| "backgroundElevationBase"
	| "backgroundElevationRaised"
	| "backgroundElevationOverlay"
	| "brand"
	| "white"
	| "black";

export type GeneratedOnName =
	| "onBackgroundNeutral"
	| "onBackgroundPrimary"
	| "onBackgroundPositive"
	| "onBackgroundWarning"
	| "onBackgroundCritical";

export type RgbColor = { r: number; g: number; b: number };
export type OklchColor = Omit<Oklch, "mode">;
export type HexColor = string;

export type ColorValue = HexColor | PassedToken;

export type OklchOnlyToken = {
	oklch: OklchColor;
	oklchDark?: OklchColor;
};
export type OklchToken = OklchOnlyToken & { hex?: never; hexDark?: never };
export type HexToken = { hex: HexColor; hexDark?: HexColor; oklch?: never; oklchDark?: never };

export type PassedToken = HexToken | OklchToken;
export type InternalToken = {
	oklch: Oklch;
	oklchDark?: Oklch;
};
export type Token = Pick<HexToken, "hex" | "hexDark"> & Partial<OklchOnlyToken>;
