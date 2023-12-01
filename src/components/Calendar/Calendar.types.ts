export type BaseProps = {
	defaultMonth?: Date;
	min?: Date;
	max?: Date;
};

type ControlledSingleProps = {
	value: Date | null;
	defaultValue?: never;
	onChange?: (args: { value: Date }) => void;
};

type UncontrolledSingleProps = {
	value?: never;
	defaultValue?: Date;
	onChange?: (args: { value: Date }) => void;
};

export type UncontrolledProps = UncontrolledSingleProps;
export type ControlledProps = ControlledSingleProps;
export type SingleProps = ControlledSingleProps | UncontrolledSingleProps;

export type Props = SingleProps & BaseProps;

export type MonthProps = {
	date: Date;
} & ControlledProps &
	Pick<BaseProps, "max" | "min">;

export type DateProps = {
	date: Date | null;
	active?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};
