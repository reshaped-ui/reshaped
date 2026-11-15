import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type BaseProps = {
	/** Node for inserting the label. When omitted, label the checkbox with `aria-label` in inputAttributes or by using it inside FormControl */
	children?: React.ReactNode;
	/** Component name attribute. Ignored inside CheckboxGroup, which applies its own name */
	name?: string;
	/** Disable the component, passing `false` doesn't enable it inside a disabled CheckboxGroup or FormControl */
	disabled?: boolean;
	/** Show an error state, automatically inherited when component is used inside FormControl or CheckboxGroup with an error.
	 * Only visible while the checkbox is not checked
	 */
	hasError?: boolean;
	/** Component value used for form submission. Required inside CheckboxGroup, where the checkbox is selected when the group value includes it */
	value?: string;
	/** Show an indeterminate state, used for "select all" checkboxes with some of the individual checkboxes selected.
	 * It doesn't change `checked`, gets reset by the browser on click and is re-applied when `checked` changes, so use it in controlled mode
	 */
	indeterminate?: boolean;
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Callback when the component selection changes. The new state is passed as `checked`, while `value` is the value property of the component.
	 * Still called inside CheckboxGroup, before the group onChange
	 */
	onChange?: G.ChangeHandler<boolean>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"label">;
	/** Additional attributes for the input element, can be used for focus and blur handlers.
	 * Inside FormControl without the group flag, its id and aria attributes take priority
	 */
	inputAttributes?: Attributes<"input">;
};

export type ControlledProps = BaseProps & {
	/** Component checked state, enables controlled mode. Ignored inside CheckboxGroup, where the group value is used instead */
	checked: boolean;
	/** Default checked state, enables uncontrolled mode. Ignored inside CheckboxGroup, where the group defaultValue is used instead */
	defaultChecked?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Component checked state, enables controlled mode. Ignored inside CheckboxGroup, where the group value is used instead */
	checked?: never;
	/** Default checked state, enables uncontrolled mode. Ignored inside CheckboxGroup, where the group defaultValue is used instead */
	defaultChecked?: boolean;
};

export type Props = ControlledProps | UncontrolledProps;
