import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type BaseProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Unique identifier for the switch */
	id?: string;
	/** Name of the switch input element */
	name: string;
	/** Disable the switch user interaction */
	disabled?: boolean;
	/** Reverse the children position */
	reversed?: boolean;
	/** Component size */
	size?: G.Responsive<"medium" | "small" | "large">;
	/** Callback when the switch value changes */
	onChange?: G.ChangeHandler<boolean>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"label">;
	/** Additional attributes for the input element */
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
