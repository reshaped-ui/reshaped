export type SelectionMode = "date" | "month";

export type BaseProps = {
	/** Default month to display. Used in uncontrolled mode to provide the initial month and then updated by the component internally.
	 * It doesn't follow the selected value, so pass it to display the month of a preselected date
	 * @default new Date()
	 */
	defaultMonth?: Date;
	/** Month to display. Used in controlled mode and should be updated using the `onMonthChange` callback */
	month?: Date;
	/** Callback when the displayed month changes with the navigation controls, month selection or keyboard navigation.
	 * `date` is a date within the first displayed month
	 */
	onMonthChange?: (args: { date: Date }) => void;
	/** Minimum date that can be selected, also hides the navigation to the earlier months.
	 * Dates are compared with their time included, so pass the start of the day to keep that day selectable
	 */
	min?: Date;
	/** Maximum date that can be selected, also hides the navigation to the later months */
	max?: Date;
	/** Number of months to render at the same time, displayed next to each other
	 * @default 1
	 */
	monthsToRender?: number;
	/** First day of the week, from 0 for Sunday to 6 for Saturday
	 * @default 1, Monday
	 */
	firstWeekDay?: number;
	/** Additional dates displayed as selected, independent from the component value. Can be used for selecting multiple individual dates */
	selectedDates?: Date[];
	/** Dates that are disabled, matched by day with their time ignored */
	disabledDates?: Date[];
	/** Render a custom weekday label, can be used for localization. Only the first 2 characters of the label are displayed.
	 * `date` is a sample date of that weekday, `weekDay` starts from firstWeekDay and keeps counting after 6
	 */
	renderWeekDay?: (args: { weekDay: number; date: Date }) => string;
	/** Render a custom label for the month title displayed above the dates, can be used for localization */
	renderSelectedMonthLabel?: (args: { date: Date }) => string;
	/** Render a custom label for the months in the month selection view, can be used for localization. `month` is a zero-based month index */
	renderMonthLabel?: (args: { month: number; date: Date }) => string;
	/** Render a custom date value instead of the day number */
	renderDateValue?: (args: { date: Date }) => React.ReactNode;
	/** Render a custom date slot content under the date number. `selected` is false for the dates in the middle of the selected range */
	renderDateSlot?: (args: { date: Date; selected: boolean }) => React.ReactNode;
	/** Aria label for the previous month button
	 * @default "Previous month"
	 */
	previousMonthAriaLabel?: string;
	/** Aria label for the next month button
	 * @default "Next month"
	 */
	nextMonthAriaLabel?: string;
	/** Aria label for the previous year button
	 * @default "Previous year"
	 */
	previousYearAriaLabel?: string;
	/** Aria label for the next year button
	 * @default "Next year"
	 */
	nextYearAriaLabel?: string;
	/** Visually hidden text added after the month title in the month selection button
	 * @default "Select a month"
	 */
	monthSelectionAriaLabel?: string;
	/** Dynamic aria label applied to each date cell based on the arguments. Defaults to the en-US weekday, month and day of the date */
	renderDateAriaLabel?: (args: { date: Date }) => string;
	/** Dynamic aria label applied to each month element based on the arguments. `month` is a zero-based month index. Defaults to the month label */
	renderMonthAriaLabel?: (args: { month: number }) => string;
};

export type SingleValue = Date;
export type RangeValue = { start: Date | null; end: Date | null };

export type ControlledSingleProps = {
	/** Disable range selection */
	range?: false;
	/** Current selected date value, enables controlled mode. Pass `null` when no date is selected */
	value: SingleValue | null;
	/** Default selected date value, enables uncontrolled mode */
	defaultValue?: never;
	/** Callback when a date is selected, `value` is set to the start of that day in the local timezone.
	 * It's also called when clicking the date that is already selected
	 */
	onChange?: (args: { value: SingleValue }) => void;
};

export type UncontrolledSingleProps = {
	/** Disable range selection */
	range?: false;
	/** Current selected date value, enables controlled mode */
	value?: never;
	/** Default selected date value, enables uncontrolled mode */
	defaultValue?: SingleValue;
	/** Callback when a date is selected, `value` is set to the start of that day in the local timezone.
	 * It's also called when clicking the date that is already selected
	 */
	onChange?: (args: { value: SingleValue }) => void;
};

export type ControlledRangeProps = {
	/** Enable range selection */
	range: true;
	/** Current selected range value, enables controlled mode. Pass `null` as `start` and `end` when they are not selected */
	value: RangeValue;
	/** Default selected range value, enables uncontrolled mode */
	defaultValue?: never;
	/** Callback when range selection changes. Called on every date click, with `end` set to `null` until the range end is selected */
	onChange?: (args: { value: RangeValue }) => void;
};

export type UncontrolledRangeProps = {
	/** Enable range selection */
	range: true;
	/** Current selected range value, enables controlled mode */
	value?: never;
	/** Default selected range value, enables uncontrolled mode */
	defaultValue?: RangeValue;
	/** Callback when range selection changes. Called on every date click, with `end` set to `null` until the range end is selected */
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
	| "disabledDates"
	| "renderMonthLabel"
	| "renderWeekDay"
	| "renderSelectedMonthLabel"
	| "renderDateAriaLabel"
	| "renderDateSlot"
	| "renderDateValue"
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
	renderValue?: MonthProps["renderDateValue"];
	renderSlot?: MonthProps["renderDateSlot"];
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
	| "disabledDates"
>;

export type ControlsProps = {
	selectionMode: SelectionMode;
	monthsToRender: number;
	onMonthTitleClick: () => void;
	monthTitleRef?: React.RefObject<HTMLButtonElement | null>;
	monthDate: Date;
	renderSelectedMonthLabel?: BaseProps["renderSelectedMonthLabel"];
	hidePrevious?: boolean;
	hideNext?: boolean;
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
