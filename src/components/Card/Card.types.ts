import type React from "react";
import type { ActionableProps } from "components/Actionable";
import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props<TagName extends keyof React.JSX.IntrinsicElements = "div"> = {
	/** Component padding, base unit multiplier */
	padding?: G.Responsive<number>;
	/** Remove side borders and apply negative margins, base unit multiplier */
	bleed?: G.Responsive<number>;
	/** Highlight the component when component is used for an active state */
	selected?: boolean;
	/** Apply elevated styles to the component */
	elevated?: boolean;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the component is clicked, turns component into a button */
	onClick?: ActionableProps["onClick"];
	/** URL to navigate to when the component is clicked, turns component into a link */
	href?: string;
	/** Custom component tag name
	 * @default "div"
	 */
	as?: TagName;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<TagName> & ActionableProps["attributes"];
} & Pick<ViewProps, "height">;
