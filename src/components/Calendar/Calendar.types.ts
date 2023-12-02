export type BaseProps = {
	defaultMonth?: Date;
	min?: Date;
	max?: Date;
	firstWeekDay?: number;
	renderWeekDay?: (args: { weekDay: number; date: Date }) => string;
	renderSelectedMonthLabel?: (args: { date: Date }) => string;
	renderMonthLabel?: (args: { month: number; date: Date }) => string;
};

export type SingleValue = Date;
export type RangeValue = { start: Date | null; end: Date | null };

export type ControlledSingleProps = {
	range?: false;
	value: SingleValue | null;
	defaultValue?: never;
	onChange?: (args: { value: SingleValue }) => void;
};

export type UncontrolledSingleProps = {
	range?: false;
	value?: never;
	defaultValue?: SingleValue;
	onChange?: (args: { value: SingleValue }) => void;
};

export type ControlledRangeProps = {
	range: true;
	value: RangeValue;
	defaultValue?: never;
	onChange?: (args: { value: RangeValue }) => void;
};

export type UncontrolledRangeProps = {
	range: true;
	value?: never;
	defaultValue?: RangeValue;
	onChange?: (args: { value: RangeValue }) => void;
};

export type UncontrolledProps = UncontrolledSingleProps | UncontrolledRangeProps;
export type ControlledProps = ControlledSingleProps | ControlledRangeProps;
export type SingleProps = ControlledSingleProps | UncontrolledSingleProps;
export type RangeProps = ControlledRangeProps | UncontrolledRangeProps;

export type Props = (SingleProps | RangeProps) & BaseProps;

export type MonthProps = {
	date: Date;
	hoveredDate: Date | null;
	onDateHover: (date: Date) => void;
	onDateHoverEnd: (date: Date) => void;
} & Pick<
	BaseProps,
	"max" | "min" | "firstWeekDay" | "renderMonthLabel" | "renderWeekDay" | "renderSelectedMonthLabel"
> &
	Pick<ControlledProps, "value" | "onChange" | "range">;

export type DateProps = {
	date: Date | null;
} & Pick<
	MonthProps,
	"hoveredDate" | "onDateHover" | "onDateHoverEnd" | "value" | "onChange" | "range" | "min" | "max"
>;
