import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { LinkProps } from "@/components/Link";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Node for inserting children to position items */
	children: React.ReactElement | React.ReactElement[];
	/** Node for defining custom separator between items, renders a chevron icon by default */
	separator?: React.ReactNode;
	/** Color of the clickable items
	 * @default "neutral"
	 */
	color?: "neutral" | "primary";
	/** Number of items to show by default, others will be hidden and can be expanded.
	 * Keeps the first item and the last items of the list visible, values lower than 2 are ignored
	 */
	defaultVisibleItems?: number;
	/** Aria label for the expand button, rendered when items are hidden with defaultVisibleItems */
	expandAriaLabel: string;
	/** Turn expand button into a static icon and disable the expand functionality */
	disableExpand?: boolean;
	/** aria-label attribute for the component */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"nav">;
};

/** Item without href, onClick and disabled is rendered as plain text representing the current page and doesn't render its icon */
export type ItemProps = Pick<LinkProps, "icon" | "href" | "onClick" | "disabled" | "children">;
