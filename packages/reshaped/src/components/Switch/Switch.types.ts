import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type BaseProps = {
	/** Node for inserting the label. When omitted, label the switch with `aria-label` in inputAttributes or by using it inside FormControl */
	children?: React.ReactNode;
	/** Id of the input element, generated automatically when not passed. Inside FormControl without the group flag, its id is used instead */
	id?: string;
	/** Name of the switch input element */
	name: string;
	/** Disable the switch user interaction, passing `false` doesn't enable it inside a disabled FormControl */
	disabled?: boolean;
	/** Render the label before the switch instead of after it */
	reversed?: boolean;
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<"medium" | "small" | "large">;
	/** Callback when the switch value changes. The new state is passed as `checked`, `value` is not passed */
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
	/** Default value of the switch, enables uncontrolled mode */
	defaultChecked?: never;
	/** Value of the switch, enables controlled mode */
	checked: boolean;
};
export type UncontrolledProps = BaseProps & {
	/** Default value of the switch, enables uncontrolled mode */
	defaultChecked?: boolean;
	/** Value of the switch, enables controlled mode */
	checked?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;
