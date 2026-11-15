import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type SingleChangeArgs = {
	/** Selected value of the slider */
	value: number;
	/** Selected range start value, only passed for range sliders */
	minValue?: never;
	/** Selected range end value, only passed for range sliders */
	maxValue?: never;
	/** Name of the slider input element */
	name: string;
	/** Name of the range start input element, only passed for range sliders */
	minName?: never;
	/** Name of the range end input element, only passed for range sliders */
	maxName?: never;
};

export type RangeChangeArgs = {
	/** Selected value of the slider, only passed for single value sliders */
	value?: never;
	/** Selected range start value */
	minValue: number;
	/** Selected range end value */
	maxValue: number;
	/** Name of the slider input elements */
	name: string;
	/** Name of the range start input element */
	minName?: never;
	/** Name of the range end input element */
	maxName?: never;
};

export type NameRangeChangeArgs = {
	/** Selected value of the slider, only passed for single value sliders */
	value?: never;
	/** Selected range start value */
	minValue: number;
	/** Selected range end value */
	maxValue: number;
	/** Name of the slider input elements */
	name?: never;
	/** Name of the range start input element */
	minName: string;
	/** Name of the range end input element */
	maxName: string;
};

type SingleSelectionProps = {
	/** Enables range slider with two thumbs */
	range?: false;
	/** Name of the slider input element */
	name: string;
	/** Name of the range start input element, only supported for range sliders */
	minName?: never;
	/** Name of the range end input element, only supported for range sliders */
	maxName?: never;
	/** Callback when the slider value changes, called continuously while dragging the thumb */
	onChange?: (args: SingleChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumb or changing the value with the keyboard.
	 * Can be used instead of onChange when only the final value is needed
	 */
	onChangeCommit?: (args: SingleChangeArgs) => void;
};

type RangeSelectionProps = {
	/** Enables range slider with two thumbs. Uses minValue, maxValue, defaultMinValue and defaultMaxValue instead of value and defaultValue */
	range: true;
	/** Name of the slider input elements, applied to both range inputs. Use minName and maxName instead to submit them with different names */
	name: string;
	/** Name of the range start input element, used together with maxName instead of name */
	minName?: never;
	/** Name of the range end input element, used together with minName instead of name */
	maxName?: never;
	/** Callback when the slider value changes, called continuously while dragging the thumbs */
	onChange?: (args: RangeChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumbs or changing the value with the keyboard.
	 * Can be used instead of onChange when only the final value is needed
	 */
	onChangeCommit?: (args: RangeChangeArgs) => void;
};

type NameRangeSelectionProps = {
	/** Enables range slider with two thumbs. Uses minValue, maxValue, defaultMinValue and defaultMaxValue instead of value and defaultValue */
	range: true;
	/** Name of the slider input elements, can't be combined with minName and maxName */
	name?: never;
	/** Name of the range start input element, used together with maxName instead of name */
	minName: string;
	/** Name of the range end input element, used together with minName instead of name */
	maxName: string;
	/** Callback when the slider value changes, called continuously while dragging the thumbs */
	onChange?: (args: RangeChangeArgs) => void;
	/** Callback when the user commits the change by releasing the thumbs or changing the value with the keyboard.
	 * Can be used instead of onChange when only the final value is needed
	 */
	onChangeCommit?: (args: RangeChangeArgs) => void;
};

type ControlledSingleProps = {
	/** Value of the slider, enables controlled mode */
	value: number;
	/** Default value of the slider, enables uncontrolled mode */
	defaultValue?: never;
};

type ControlledRangeProps = {
	/** Selected range start value, enables controlled mode when passed together with maxValue */
	minValue: number;
	/** Selected range end value, enables controlled mode when passed together with minValue */
	maxValue: number;
	/** Default selected range start value, enables uncontrolled mode */
	defaultMinValue?: never;
	/** Default selected range end value, enables uncontrolled mode */
	defaultMaxValue?: never;
};

type UncontrolledSingleProps = {
	/** Value of the slider, enables controlled mode */
	value?: never;
	/** Default value of the slider, enables uncontrolled mode
	 * @default min
	 */
	defaultValue?: number;
};

type UncontrolledRangeProps = {
	/** Selected range start value, enables controlled mode when passed together with maxValue */
	minValue?: never;
	/** Selected range end value, enables controlled mode when passed together with minValue */
	maxValue?: never;
	/** Default selected range start value, enables uncontrolled mode
	 * @default min
	 */
	defaultMinValue?: number;
	/** Default selected range end value, enables uncontrolled mode
	 * @default max
	 */
	defaultMaxValue?: number;
};

type BaseProps = {
	/** Step of the slider. Selected values, including the ones passed to the component, are rounded to the closest multiple of the step
	 * @default 1
	 */
	step?: number;
	/** Disable the slider user interaction, passing `false` doesn't enable it inside a disabled FormControl */
	disabled?: boolean;
	/** Minimum value of the slider
	 * @default 0
	 */
	min?: number;
	/** Maximum value of the slider
	 * @default 100
	 */
	max?: number;
	/** Orientation of the slider. Vertical slider takes the full height of its parent, so the parent should have its height defined
	 * @default "horizontal"
	 */
	orientation?: "vertical" | "horizontal";
	/** Render a custom value in the thumb tooltip, which is displayed on thumb hover, focus and drag. Pass `false` to hide the tooltip.
	 * The tooltip is only visual and is hidden from screen readers
	 */
	renderValue?: ((args: { value: number }) => string) | false;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element. They are not applied to the inputs, use the component inside FormControl to label them */
	attributes?: Attributes<"div">;
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
	inputAttributes?: Attributes<"input">;
};
