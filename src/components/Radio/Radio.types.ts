import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	children?: React.ReactNode;
	name?: string;
	disabled?: boolean;
	hasError?: boolean;
	value: string;
	onChange?: G.ChangeHandler<boolean>;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	className?: G.ClassName;
	attributes?: G.Attributes<"label", Props>;
	inputAttributes?: G.Attributes<"input">;
};

export type ControlledProps = BaseProps & { checked: boolean; defaultChecked?: never };
export type UncontrolledProps = BaseProps & { checked?: never; defaultChecked?: boolean };
export type Props = ControlledProps | UncontrolledProps;
