import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { ViewProps } from "@/components/View";
import type { Attributes } from "@/types/global";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = Pick<
	ViewProps,
	"padding" | "bleed" | "height" | "direction" | "gap" | "align" | "justify"
> & {
	/** Highlight the component when component is used for an active state */
	selected?: boolean;
	/** Apply elevated styles to the component */
	raised?: boolean;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the component is clicked, turns component into a button */
	onClick?: ActionableProps["onClick"];
	/** URL to navigate to when the component is clicked, turns component into a link */
	href?: string;

	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName> & ActionableProps["attributes"];
	/** Custom component tag name
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
};
