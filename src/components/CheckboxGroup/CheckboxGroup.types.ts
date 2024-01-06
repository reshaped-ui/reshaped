import type React from "react";
import type * as G from "types/global";
import type { CheckboxProps } from "components/Checkbox";

type BaseProps = {
	id?: string;
	children?: React.ReactNode;
	hasError?: boolean;
	disabled?: boolean;
	name: string;
	onChange?: G.ChangeHandler<string[]>;
};

export type ControlledProps = BaseProps & { value: string[]; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string[] };
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: CheckboxProps["onChange"];
	hasError?: boolean;
	disabled?: boolean;
	name: string;
	value?: string[];
};
