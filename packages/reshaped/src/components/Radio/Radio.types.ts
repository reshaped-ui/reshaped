import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type BaseProps = {
	/** Node for inserting the label. When omitted, label the radio with `aria-label` in inputAttributes */
	children?: React.ReactNode;
	/** Name of the input element. Ignored inside RadioGroup, which applies its own name */
	name?: string;
	/** Disable the component, passing `false` doesn't enable it inside a disabled RadioGroup or FormControl */
	disabled?: boolean;
	/** Show an error state, automatically inherited when component is used inside FormControl or RadioGroup with an error.
	 * Only visible while the radio is not checked
	 */
	hasError?: boolean;
	/** Value of the input element used for form submission. Inside RadioGroup, the radio is selected when it matches the group value */
	value: string;
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Callback when the radio gets selected, it's not called for the radio losing the selection.
	 * The state is passed as `checked`, while `value` is the value property of the component
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
	/** Component checked state, enables controlled mode. Ignored inside RadioGroup, where the group value is used instead */
	checked: boolean;
	/** Default checked state, enables uncontrolled mode. Ignored inside RadioGroup, where the group defaultValue is used instead */
	defaultChecked?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Component checked state, enables controlled mode. Ignored inside RadioGroup, where the group value is used instead */
	checked?: never;
	/** Default checked state, enables uncontrolled mode. Ignored inside RadioGroup, where the group defaultValue is used instead */
	defaultChecked?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;
