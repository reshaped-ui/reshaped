import React from "react";
import * as G from "types/global";

export type Radius = "small" | "medium" | "large" | "circular" | "none";
export type Position = "relative" | "absolute" | "fixed" | "sticky" | "static";
export type BorderColor =
	| "neutral"
	| "neutral-faded"
	| "critical"
	| "critical-faded"
	| "warning"
	| "warning-faded"
	| "positive"
	| "positive-faded"
	| "primary"
	| "primary-faded"
	| "disabled"
	| "brand"
	| "transparent";

/**
 * Utility controlled only with classnames
 */
export type StaticStyleUtility<Value> = (value?: G.Responsive<Value>) => null | {
	classNames: G.ClassName;
};

/**
 * Utility controlled with classNames and css variables
 * Classnames define the styles, variables define the values for those styles
 */
export type DynamicStyleUtilityResult = null | {
	classNames: G.ClassName;
	variables: React.CSSProperties;
};

export type DynamicStyleUtility<Value> = (value?: G.Responsive<Value>) => DynamicStyleUtilityResult;
