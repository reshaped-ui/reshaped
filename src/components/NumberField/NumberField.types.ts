import type { TextFieldBaseProps } from "components/TextField";
import type * as G from "types/global";

export type BaseProps = Omit<TextFieldBaseProps, "endSlot" | "onChange"> & {
	onChange?: G.ChangeHandler<number>;
	increaseAriaLabel: string;
	decreaseAriaLabel: string;
	min?: number;
	max?: number;
	step?: number;
};

export type ControlledProps = BaseProps & { value: number | null; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: number };
export type Props = ControlledProps | UncontrolledProps;
