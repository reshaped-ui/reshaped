import type React from "react";
import type { ActionableProps } from "components/Actionable";
import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	padding?: G.Responsive<number>;
	bleed?: G.Responsive<number>;
	selected?: boolean;
	elevated?: boolean;
	children?: React.ReactNode;
	onClick?: ActionableProps["onClick"];
	href?: string;
	as?: TagName;
	className?: G.ClassName;
	attributes?: G.Attributes<TagName> & ActionableProps["attributes"];
} & Pick<ViewProps, "height">;
