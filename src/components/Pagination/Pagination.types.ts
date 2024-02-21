import type * as G from "types/global";

export type BaseProps = {
	/**
	 * Total number of pages available
	 */
	total: number;
	/**
	 * Event handler triggered when the current page changes
	 */
	onChange?: (args: { page: number }) => void;
	/**
	 * Function to dynamically get an aria-label for each
	 */
	pageAriaLabel?: (args: { page: number }) => string;
	/**
	 * aria-label for the previous page button
	 */
	previousAriaLabel: string;
	/**
	 * aria-label for the next page button
	 */
	nextAriaLabel: string;
	/**
	 * Custom root element className
	 */
	className?: G.ClassName;
	/**
	 * Custom root element attributes
	 */
	attributes?: G.Attributes<"div", Props>;
};

export type ControlledProps = BaseProps & {
	/**
	 * Currently selected page number, starts with 1.
	 * Enables controlled component behavior.
	 */
	page: number;
	defaultPage?: never;
};

export type UncontrolledProps = BaseProps & {
	page?: never;
	/**
	 * Default selected page number, starts with 1.
	 * Enables uncontrolled component behavior.
	 */
	defaultPage?: number;
};

export type Props = ControlledProps | UncontrolledProps;
