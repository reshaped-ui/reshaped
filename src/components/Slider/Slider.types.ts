import type * as G from "types/global";

export type SingleChangeArgs = {
	value: number;
	minValue?: never;
	maxValue?: never;
	name: string;
};

export type RangeChangeArgs = {
	value?: never;
	minValue: number;
	maxValue: number;
	name: string;
};

type RangeSelectionProps = {
	range: true;
	onChange?: (args: RangeChangeArgs) => void;
	onChangeCommit?: (args: RangeChangeArgs) => void;
};
type SingleSelectionProps = {
	range?: false;
	onChange?: (args: SingleChangeArgs) => void;
	onChangeCommit?: (args: SingleChangeArgs) => void;
};

type ControlledSingleProps = { value: number; defaultValue?: never };
type ControlledRangeProps = {
	minValue: number;
	maxValue: number;
	defaultMinValue?: never;
	defaultMaxValue?: never;
};

type UncontrolledSingleProps = { value?: never; defaultValue?: number };
type UncontrolledRangeProps = {
	minValue?: never;
	maxValue?: never;
	defaultMinValue?: number;
	defaultMaxValue?: number;
};

type BaseProps = {
	name: string;
	step?: number;
	disabled?: boolean;
	min?: number;
	max?: number;
	renderValue?: (args: { value: number }) => string;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps &
	((ControlledSingleProps & SingleSelectionProps) | (ControlledRangeProps & RangeSelectionProps));
export type UncontrolledProps = BaseProps &
	(
		| (UncontrolledSingleProps & SingleSelectionProps)
		| (UncontrolledRangeProps & RangeSelectionProps)
	);

export type Props = ControlledProps | UncontrolledProps;
export type DefaultProps = { min: number; max: number };

export type ThumbProps = {
	id: string;
	name: string;
	disabled?: boolean;
	value: number;
	active?: boolean;
	position: number;
	onChange: (value: number, options?: { commit?: boolean }) => void;
	onDragStart: () => void;
	max: number;
	min: number;
	step: NonNullable<BaseProps["step"]>;
	renderValue?: BaseProps["renderValue"];
	tooltipRef: React.RefObject<HTMLDivElement>;
};
