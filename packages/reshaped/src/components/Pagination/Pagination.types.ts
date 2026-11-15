import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type BaseProps = {
	/** Total number of pages available, not the number of items.
	 * Page buttons are truncated with an ellipsis when there are more than 7 pages
	 */
	total: number;
	/** Callback when a page, previous or next button is clicked, returned page starts with 1.
	 * Also called when clicking the currently selected page
	 */
	onChange?: (args: { page: number }) => void;
	/** Function to dynamically get an aria-label for each page */
	pageAriaLabel?: (args: { page: number }) => string;
	/** aria-label attribute for the previous page button */
	previousAriaLabel: string;
	/** aria-label attribute for the next page button */
	nextAriaLabel: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};

export type ControlledProps = BaseProps & {
	/** Currently selected page number, starts with 1, enables controlled mode */
	page: number;
	/** Default selected page number, starts with 1, enables uncontrolled mode
	 * @default 1
	 */
	defaultPage?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Currently selected page number, starts with 1, enables controlled mode */
	page?: never;
	/** Default selected page number, starts with 1, enables uncontrolled mode
	 * @default 1
	 */
	defaultPage?: number;
};

export type Props = ControlledProps | UncontrolledProps;
