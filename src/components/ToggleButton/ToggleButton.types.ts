import type { ButtonProps } from "components/Button";

type BaseProps = Omit<ButtonProps, "variant" | "higlighted"> & {
	variant?: Extract<ButtonProps["variant"], "outline" | "ghost">;
	value?: string;
	onChange?: (args: {
		checked: boolean;
		value: string;
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
};

export type ControlledProps = BaseProps & { defaultChecked?: never; checked: boolean };
export type UncontrolledProps = BaseProps & { defaultChecked?: boolean; checked?: never };
export type Props = ControlledProps | UncontrolledProps;
