import type * as G from "types/global";

export type BaseProps = {
	/** Total number of pages available */
	total: number;
	/** Callback when the current page changes */
	onChange?: (args: { page: number }) => void;
	/** Function to dynamically get an aria-label for each page */
	pageAriaLabel?: (args: { page: number }) => string;
	/** aria-label attribute for the previous page button */
	previousAriaLabel: string;
	/** aria-label attribute for the next page button */
	nextAriaLabel: string;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps & {
	/** Currently selected page number, starts with 1, enables controlled mode */
	page: number;
	/** Default selected page number, starts with 1, enables uncontrolled mode */
	defaultPage?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Currently selected page number, starts with 1, enables controlled mode */
	page?: never;
	/** Default selected page number, starts with 1, enables uncontrolled mode */
	defaultPage?: number;
};

export type Props = ControlledProps | UncontrolledProps;
