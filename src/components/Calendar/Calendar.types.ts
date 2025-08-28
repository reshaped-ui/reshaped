export type SelectionMode = "date" | "month";

export type BaseProps = {
	/** Default month to display
	 * @default Date.now()
	 */
	defaultMonth?: Date;
	/** Minimum date that can be selected */
	min?: Date;
	/** Maximum date that can be selected */
	max?: Date;
	/** First day of the week
	 * @default 1, Monday
	 */
	firstWeekDay?: number;
	/** Dates that are selected */
	selectedDates?: Date[];
	/** Render a custom weekday label, can be used for localization */
	renderWeekDay?: (args: { weekDay: number; date: Date }) => string;
	/** Render a custom month label, can be used for localization */
	renderSelectedMonthLabel?: (args: { date: Date }) => string;
	/** Render a custom month label, can be used for localization */
	renderMonthLabel?: (args: { month: number; date: Date }) => string;
	/** Aria label for the previous month button */
	previousMonthAriaLabel?: string;
	nextMonthAriaLabel?: string;
	/** Aria label for the previous year button */
	previousYearAriaLabel?: string;
	/** Aria label for the next year button */
	nextYearAriaLabel?: string;
	/** Aria label for the month selection button */
	monthSelectionAriaLabel?: string;
	/** Dynamic aria label applied to each date cell based on the arguments */
	renderDateAriaLabel?: (args: { date: Date }) => string;
	/** Dynamic aria label applied to each month element based on the arguments */
	renderMonthAriaLabel?: (args: { month: number }) => string;
};

export type SingleValue = Date;
export type RangeValue = { start: Date | null; end: Date | null };

export type ControlledSingleProps = {
	/** Disable range selection */
	range?: false;
	/** Current selected date value, enables controlled mode */
	value: SingleValue | null;
	/** Default selected date value, enables uncontrolled mode */
	defaultValue?: never;
	/** Callback when date selection changes */
	onChange?: (args: { value: SingleValue }) => void;
};

export type UncontrolledSingleProps = {
	/** Disable range selection */
	range?: false;
	value?: never;
	/** Default selected date value, enables uncontrolled mode */
	defaultValue?: SingleValue;
	/** Callback when date selection changes */
	onChange?: (args: { value: SingleValue }) => void;
};

export type ControlledRangeProps = {
	/** Enable range selection */
	range: true;
	/** Current selected range value, enables controlled mode */
	value: RangeValue;
	defaultValue?: never;
	/** Callback when range selection changes */
	onChange?: (args: { value: RangeValue }) => void;
};

export type UncontrolledRangeProps = {
	/** Enable range selection */
	range: true;
	value?: never;
	/** Default selected range value, enables uncontrolled mode */
	defaultValue?: RangeValue;
	/** Callback when range selection changes */
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
	onDateFocus: (date: Date) => void;
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
