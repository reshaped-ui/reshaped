import type { ViewProps } from "components/View";
import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Name of the input element */
	name: string;
	/** Disable the file upload input */
	disabled?: boolean;
	/** Node for inserting children, can be a render function that receives component state */
	children?: React.ReactNode | ((props: { highlighted?: boolean }) => React.ReactNode);
	/** Callback when the component value is changed */
	onChange?: G.ChangeHandler<
		File[],
		React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
	>;
	/** Component height, literal css value or unit token multiplier */
	height?: ViewProps["height"];
	/** Component variant, headless variant is useful for rendering custom triggers like a Button */
	variant?: "outline" | "headless";
	/** Change component to render inline making it more compact */
	inline?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"input">;
};

export type TriggerProps = {
	/** Node for inserting children */
	children: React.ReactNode;
};
