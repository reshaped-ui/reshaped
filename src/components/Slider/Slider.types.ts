import type * as G from "types/global";

export type SingleChangeArgs = {
	value: number;
	minValue?: never;
	maxValue?: never;
	name: string;
	minName?: never;
	maxName?: never;
};

export type RangeChangeArgs = {
	value?: never;
	minValue: number;
	maxValue: number;
	name: string;
	minName?: never;
	maxName?: never;
};

export type NameRangeChangeArgs = {
	value?: never;
	minValue: number;
	maxValue: number;
	name?: never;
	minName: string;
	maxName: string;
};

type SingleSelectionProps = {
	range?: false;
	name: string;
	minName?: never;
	maxName?: never;
	onChange?: (args: SingleChangeArgs) => void;
	onChangeCommit?: (args: SingleChangeArgs) => void;
};

type RangeSelectionProps = {
	range: true;
	name: string;
	minName?: never;
	maxName?: never;
	onChange?: (args: RangeChangeArgs) => void;
	onChangeCommit?: (args: RangeChangeArgs) => void;
};

type NameRangeSelectionProps = {
	range: true;
	name?: never;
	minName: string;
	maxName: string;
	onChange?: (args: RangeChangeArgs) => void;
	onChangeCommit?: (args: RangeChangeArgs) => void;
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
	step?: number;
	disabled?: boolean;
	min?: number;
	max?: number;
	orientation?: "vertical" | "horizontal";
	renderValue?: ((args: { value: number }) => string) | false;
	className?: G.ClassName;
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps &
	(
		| (ControlledSingleProps & SingleSelectionProps)
		| (ControlledRangeProps & (RangeSelectionProps | NameRangeSelectionProps))
	);
export type UncontrolledProps = BaseProps &
	(
		| (UncontrolledSingleProps & SingleSelectionProps)
		| (UncontrolledRangeProps & (RangeSelectionProps | NameRangeSelectionProps))
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
	onDragStart: (e: React.TouchEvent | React.MouseEvent) => void;
	max: number;
	min: number;
	step: NonNullable<BaseProps["step"]>;
	orientation: NonNullable<BaseProps["orientation"]>;
	renderValue?: BaseProps["renderValue"];
	tooltipRef: React.RefObject<HTMLDivElement | null>;
};
