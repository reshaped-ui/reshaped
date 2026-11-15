import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ViewProps } from "@/components/View";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Name of the input element */
	name: string;
	/** Disable the file upload input */
	disabled?: boolean;
	/** Node for inserting children, can be a render function that receives component state.
	 * highlighted is true while files are dragged over the component
	 */
	children?: React.ReactNode | ((props: { highlighted?: boolean }) => React.ReactNode);
	/** Callback when files are picked in the file dialog or dropped on the component, value is an array of the added files.
	 * The component doesn't store or display them and dropped files are not added to the input, so keep them in your state
	 */
	onChange?: G.ChangeHandler<
		File[],
		React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
	>;
	/** Component height, literal css value or unit token multiplier */
	height?: ViewProps["height"];
	/** Component variant, headless variant is useful for rendering custom triggers like a Button
	 * @default "outline"
	 */
	variant?: "outline" | "headless";
	/** Change component to render inline making it more compact, its width is based on the content
	 * and the default padding and content centering are removed
	 */
	inline?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Additional attributes for the file input element, like accept or multiple.
	 * They only affect the file dialog, dropped files are passed to onChange without being filtered
	 */
	inputAttributes?: Attributes<"input">;
};

export type TriggerProps = {
	/** Node for inserting the element that opens the file dialog on click, like a link.
	 * When used, the rest of the component only handles the dropped files
	 */
	children: React.ReactNode;
};
