import type * as G from "types/global";

export type SingleChangeArgs = {
	/** Value of the slider, enables controlled mode */
	value: number;
	/** Minimum value of the slider */
	minValue?: never;
	/** Maximum value of the slider */
	maxValue?: never;
	/** Name of the slider input element */
	name: string;
	/** Name of the slider min value input element, overrides the name */
	minName?: never;
	/** Name of the slider max value input element, overrides the name */
	maxName?: never;
};

export type RangeChangeArgs = {
	/** Value of the slider, enables controlled mode */
	value?: never;
	/** Minimum value of the slider */
	minValue: number;
	/** Maximum value of the slider */
	maxValue: number;
	/** Name of the slider input element, overrides the name */
	name: string;
	/** Name of the slider min value input element, overrides the name */
	minName?: never;
	/** Name of the slider max value input element, overrides the name */
	maxName?: never;
};

export type NameRangeChangeArgs = {
	/** Value of the slider, enables controlled mode */
	value?: never;
	/** Minimum value of the slider */
	minValue: number;
	/** Maximum value of the slider */
	maxValue: number;
	/** Name of the slider input element */
	name?: never;
	/** Name of the slider min value input element, overrides the name */
	minName: string;
	/** Name of the slider max value input element, overrides the name */
	maxName: string;
};

type SingleSelectionProps = {
	/** Enables range slider with two thumbs */
	range?: false;
	/** Name of the slider input element */
	name: string;
	/** Name of the slider min value input element, overrides the name */
	minName?: never;
	/** Name of the slider max value input element, overrides the name */
	maxName?: never;
	/** Callback when the slider value changes */
	onChange?: (args: SingleChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumb */
	onChangeCommit?: (args: SingleChangeArgs) => void;
};

type RangeSelectionProps = {
	/** Enables range slider with two thumbs */
	range: true;
	/** Name of the slider input element */
	name: string;
	/** Name of the slider min value input element, overrides the name */
	minName?: never;
	/** Name of the slider max value input element, overrides the name */
	maxName?: never;
	/** Callback when the slider value changes */
	onChange?: (args: RangeChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumbs */
	onChangeCommit?: (args: RangeChangeArgs) => void;
};

type NameRangeSelectionProps = {
	/** Enables range slider with two thumbs */
	range: true;
	/** Name of the slider input element */
	name?: never;
	/** Name of the slider min value input element, overrides the name */
	minName: string;
	/** Name of the slider max value input element, overrides the name */
	maxName: string;
	/** Callback when the slider value changes */
	onChange?: (args: RangeChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumbs */
	onChangeCommit?: (args: RangeChangeArgs) => void;
};

type ControlledSingleProps = {
	/** Value of the slider, enables controlled mode */
	value: number;
	/** Default value of the slider, enables uncontrolled mode */
	defaultValue?: never;
};

type ControlledRangeProps = {
	/** Minimum value of the slider */
	minValue: number;
	/** Maximum value of the slider */
	maxValue: number;
	/** Default minimum value of the slider, enables uncontrolled mode */
	defaultMinValue?: never;
	/** Default maximum value of the slider, enables uncontrolled mode */
	defaultMaxValue?: never;
};

type UncontrolledSingleProps = {
	/** Value of the slider, enables controlled mode */
	value?: never;
	/** Default value of the slider, enables uncontrolled mode */
	defaultValue?: number;
};

type UncontrolledRangeProps = {
	/** Minimum value of the slider */
	minValue?: never;
	/** Maximum value of the slider */
	maxValue?: never;
	/** Default minimum value of the slider, enables uncontrolled mode */
	defaultMinValue?: number;
	/** Default maximum value of the slider, enables uncontrolled mode */
	defaultMaxValue?: number;
};

type BaseProps = {
	/** Step of the slider */
	step?: number;
	/** Disable the slider user interaction */
	disabled?: boolean;
	/** Minimum value of the slider */
	min?: number;
	/** Maximum value of the slider */
	max?: number;
	/** Orientation of the slider */
	orientation?: "vertical" | "horizontal";
	/** Render a custom value in the thumb tooltip */
	renderValue?: ((args: { value: number }) => string) | false;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
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
	onChange: (value: number, options?: { commit?: boolean; native?: boolean }) => void;
	onDragStart: (e: React.TouchEvent | React.MouseEvent) => void;
	max: number;
	min: number;
	step: NonNullable<BaseProps["step"]>;
	orientation: NonNullable<BaseProps["orientation"]>;
	renderValue?: BaseProps["renderValue"];
	tooltipRef: React.RefObject<HTMLDivElement | null>;
	inputRef: React.RefObject<HTMLInputElement | null>;
};
