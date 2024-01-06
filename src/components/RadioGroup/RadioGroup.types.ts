import type React from "react";
import type * as G from "types/global";
import type { RadioProps } from "components/Radio";

type BaseProps = {
	id?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	name: string;
	hasError?: boolean;
	onChange?: G.ChangeHandler<string>;
};

export type ControlledProps = BaseProps & { value: string | null; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: RadioProps["onChange"];
	hasError?: boolean;
	disabled?: boolean;
	name: string;
	value?: string | null;
};
