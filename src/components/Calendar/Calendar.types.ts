export type SelectionMode = "date" | "month";

export type BaseProps = {
	defaultMonth?: Date;
	min?: Date;
	max?: Date;
	firstWeekDay?: number;
	selectedDates?: Date[];
	renderWeekDay?: (args: { weekDay: number; date: Date }) => string;
	renderSelectedMonthLabel?: (args: { date: Date }) => string;
	renderMonthLabel?: (args: { month: number; date: Date }) => string;

	previousMonthAriaLabel?: string;
	nextMonthAriaLabel?: string;
	previousYearAriaLabel?: string;
	nextYearAriaLabel?: string;
	monthSelectionAriaLabel?: string;
	renderDateAriaLabel?: (args: { date: Date }) => string;
	renderMonthAriaLabel?: (args: { month: number }) => string;
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
	| "max"
	| "min"
	| "firstWeekDay"
	| "selectedDates"
	| "renderMonthLabel"
	| "renderWeekDay"
	| "renderSelectedMonthLabel"
	| "renderDateAriaLabel"
> &
	Pick<ControlledProps, "value" | "onChange" | "range">;

export type YearProps = { monthDate: Date; onMonthClick: (month: number) => void } & Pick<
	BaseProps,
	"renderMonthLabel" | "min" | "max" | "renderMonthAriaLabel"
>;

export type DateProps = {
	date: Date | null;
	isoDate: string | null;
	disabled?: boolean;
	focusable?: boolean;
	startValue: Date | null;
	endValue: Date | null;
	renderAriaLabel?: MonthProps["renderDateAriaLabel"];
} & Pick<
	MonthProps,
	| "hoveredDate"
	| "onDateHover"
	| "onDateHoverEnd"
	| "onChange"
	| "range"
	| "min"
	| "max"
	| "selectedDates"
>;

export type ControlsProps = {
	selectionMode: SelectionMode;
	onMonthTitleClick: () => void;
	monthTitleRef: React.MutableRefObject<HTMLButtonElement | null>;
	monthDate: Date;
	renderSelectedMonthLabel?: BaseProps["renderSelectedMonthLabel"];
	isFirstMonth?: boolean;
	isLastMonth?: boolean;
	onNextClick: () => void;
	onPreviousClick: () => void;
} & Pick<
	BaseProps,
	| "nextMonthAriaLabel"
	| "nextYearAriaLabel"
	| "previousMonthAriaLabel"
	| "previousYearAriaLabel"
	| "monthSelectionAriaLabel"
>;
