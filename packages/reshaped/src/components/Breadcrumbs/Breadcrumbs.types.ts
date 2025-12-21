import type { LinkProps } from "components/Link";
import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting children to position items */
	children: React.ReactElement | React.ReactElement[];
	/** Node for defining custom separator between items */
	separator?: React.ReactNode;
	/** Component color scheme
	 * @default "neutral"
	 */
	color?: "neutral" | "primary";
	/** Number of items to show by default, others will be hidden and can be expanded */
	defaultVisibleItems?: number;
	// TODO: make required in the v4
	/** Aria label for the expand button */
	expandAriaLabel?: string;
	/** Turn expand button into static text and disable the expand functionality */
	disableExpand?: boolean;
	/** aria-label attribute for the component */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"nav">;
};

export type ItemProps = Pick<LinkProps, "icon" | "href" | "onClick" | "disabled" | "children">;
