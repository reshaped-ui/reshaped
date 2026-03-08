import type { Oklch } from "culori/fn";

export type Hue = "primary" | "positive" | "critical" | "warning" | "neutral" | "brand";

export type Name =
	| "foregroundNeutral"
	| "foregroundNeutralMuted"
	| "foregroundDisabled"
	| "foregroundPrimary"
	| "foregroundCritical"
	| "foregroundWarning"
	| "foregroundPositive"
	| "borderNeutral"
	| "borderNeutralMuted"
	| "borderDisabled"
	| "borderPrimary"
	| "borderPrimaryMuted"
	| "borderCritical"
	| "borderCriticalMuted"
	| "borderWarning"
	| "borderWarningMuted"
	| "borderPositive"
	| "borderPositiveMuted"
	| "backgroundNeutral"
	| "backgroundNeutralMuted"
	| "backgroundNeutralHighlightedMuted"
	| "backgroundDisabled"
	| "backgroundDisabledMuted"
	| "backgroundPrimary"
	| "backgroundPrimaryMuted"
	| "backgroundPrimaryHighlightedMuted"
	| "backgroundCritical"
	| "backgroundCriticalMuted"
	| "backgroundCriticalHighlightedMuted"
	| "backgroundWarning"
	| "backgroundWarningMuted"
	| "backgroundWarningHighlightedMuted"
	| "backgroundPositive"
	| "backgroundPositiveMuted"
	| "backgroundPositiveHighlightedMuted"
	| "backgroundPage"
	| "backgroundPageMuted"
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

export type GeneratedRGBName =
	| "rgbBackgroundNeutral"
	| "rgbBackgroundNeutralMuted"
	| "rgbBackgroundDisabled"
	| "rgbBackgroundDisabledMuted"
	| "rgbBackgroundPrimary"
	| "rgbBackgroundPrimaryMuted"
	| "rgbBackgroundCritical"
	| "rgbBackgroundCriticalMuted"
	| "rgbBackgroundWarning"
	| "rgbBackgroundWarningMuted"
	| "rgbBackgroundPositive"
	| "rgbBackgroundPositiveMuted"
	| "rgbBackgroundPage"
	| "rgbBackgroundPageMuted"
	| "rgbBackgroundElevationBase"
	| "rgbBackgroundElevationRaised"
	| "rgbBackgroundElevationOverlay";

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
