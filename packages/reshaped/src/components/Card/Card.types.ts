import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { ViewProps } from "@/components/View";
import type { Attributes } from "@/types/global";

export type Props<TagName extends keyof React.JSX.IntrinsicElements | void = void> = Pick<
	ViewProps,
	"padding" | "bleed" | "height" | "direction" | "gap" | "align" | "justify" | "borderRadius"
> & {
	/** Highlight the card with a primary color border, for example when it wraps a checked Checkbox or Radio.
	 * Only changes the styles, selection state and its semantics should be handled by the content
	 */
	selected?: boolean;
	/** Raise the card above the page with a shadow and the raised elevation background color */
	raised?: boolean;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Callback when the card is clicked. Makes the card focusable with a button role and a hover state,
	 * while still rendering the tag passed with as. Pass as="button" to render a native button
	 */
	onClick?: ActionableProps["onClick"];
	/** URL to navigate to when the card is clicked.
	 * Renders the root element as an anchor tag with a hover state, ignoring the as property
	 */
	href?: string;

	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<TagName> & ActionableProps["attributes"];
	/** Custom component tag name, ignored when href is passed
	 * @default "div"
	 */
	as?: TagName extends keyof React.JSX.IntrinsicElements
		? TagName
		: keyof React.JSX.IntrinsicElements;
};
