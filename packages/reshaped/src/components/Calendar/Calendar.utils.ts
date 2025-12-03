import type * as T from "./Calendar.types";

const DAYS_IN_WEEK = 7;
const FIRST_WEEK_DAY = 1;

/**
 * Return the ISO date format without the timezones adjustemnts
 */
export const getLocalISODate = (args: { date: Date }) => {
	const { date } = args;

	return [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, "0"),
		date.getDate().toString().padStart(2, "0"),
	].join("-");
};

const getNormalizedDay = (args: { date: Date; firstWeekDay?: number }) => {
	const { date, firstWeekDay = FIRST_WEEK_DAY } = args;

	const day = date.getDay();

	return day < firstWeekDay ? DAYS_IN_WEEK - day - firstWeekDay : day - firstWeekDay;
};

/**
 * Return an array of US weekday names for the calendar
 */
export const getWeekdayNames = (args: {
	firstWeekDay?: number;
	renderWeekDay: T.BaseProps["renderWeekDay"];
}) => {
	const { firstWeekDay = FIRST_WEEK_DAY, renderWeekDay } = args;
	const baseDate = new Date(2021, 1, firstWeekDay); // Starting from Sunday + firstWeekDay
	const weekdays = [];

	for (let i = firstWeekDay; i < firstWeekDay + DAYS_IN_WEEK; i++) {
		const weekday = renderWeekDay
			? renderWeekDay({ weekDay: i, date: baseDate })
			: baseDate.toLocaleDateString("en-US", { weekday: "short" });
		weekdays.push(weekday.slice(0, 2));
		baseDate.setDate(baseDate.getDate() + 1);
	}

	return weekdays;
};

/**
 * Return an array of all month names
 */
export const getMonthNames = (args: { renderMonthLabel: T.BaseProps["renderMonthLabel"] }) => {
	const { renderMonthLabel } = args;

	return new Array(12).fill(null).map((_, i) => {
		const date = new Date(0, i);
		return renderMonthLabel
			? renderMonthLabel({ month: i, date })
			: date.toLocaleString("default", { month: "short" });
	});
};

/**
 * Return an array of weeks based on the month passed to the function
 */
export const getMonthWeeks = (args: { date: Date; firstWeekDay?: number }): (Date | null)[][] => {
	const { date, firstWeekDay } = args;
	const month = date.getMonth();
	const year = date.getFullYear();
	const weeks: Date[][] = [];
	const currentDate = new Date(year, month, 1);

	// Fill in the days if month starts in the middle of the week
	const firstDay = getNormalizedDay({ date: currentDate, firstWeekDay });
	if (firstDay !== 0) weeks.push(new Array(firstDay).fill(null));

	while (month === currentDate.getMonth()) {
		const day = getNormalizedDay({ date: currentDate, firstWeekDay });

		if (day === 0 || !weeks.length) weeks.push([]);

		weeks[weeks.length - 1].push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Fill in the days if month ends in the middle of the week
	const lastDay = getNormalizedDay({ date: currentDate, firstWeekDay });
	if (lastDay !== 0) weeks[weeks.length - 1].push(...new Array(7 - lastDay).fill(null));

	return weeks;
};

export const getFocusableDates = (rootEl: HTMLElement | null) => {
	return (rootEl?.querySelectorAll("[data-rs-date]") || []) as unknown as HTMLButtonElement[];
};

export const changeDate = (date: Date, delta: number) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);

export const setMonthTo = (date: Date, value: number) => {
	const resultDate = new Date(date);

	resultDate.setMonth(value);
	return resultDate;
};

export const setMonthToPrevious = (date: Date) => {
	return setMonthTo(date, date.getMonth() - 1);
};

export const setMonthToNext = (date: Date) => {
	return setMonthTo(date, date.getMonth() + 1);
};

export const setYearTo = (date: Date, value: number) => {
	const resultDate = new Date(date);

	resultDate.setFullYear(value);
	return resultDate;
};

export const setYearToPrevious = (date: Date) => {
	return setYearTo(date, date.getFullYear() - 1);
};

export const setYearToNext = (date: Date) => {
	return setYearTo(date, date.getFullYear() + 1);
};

export const applyNavigationBounds = (args: { date: Date; min?: Date; max?: Date }) => {
	const { date, min, max } = args;
	const currentMonth = date.getMonth();
	const currentYear = date.getFullYear();
	const prevMonthLastDate = new Date(currentYear, currentMonth, 0);
	const nextMonthFirstDate = setMonthToNext(date);
	nextMonthFirstDate.setDate(0);

	return {
		isFirstMonth: min && min > prevMonthLastDate,
		isLastMonth: max && max < nextMonthFirstDate,
	};
};

/**
 * Decide if date has to be focusable with Tab (only one date should be)
 * 1. If there is a selected value - it's focusable
 * 2. Otherwise, today's date is focusable
 * 3. Otherwise, first non-disabled date is focusable
 */
export const isDateFocusable = (args: {
	date: Date;
	lastFocusedDate?: Date;
	startValue: Date | null;
}) => {
	const { date, startValue, lastFocusedDate } = args;
	const today = new Date();
	const renderedMonth = date.getMonth();
	const valueMonth = startValue?.getMonth();
	const todayMonth = today.getMonth();
	const lastFocusedMonth = lastFocusedDate?.getMonth();
	const isoDate = getLocalISODate({ date });
	const isoToday = getLocalISODate({ date: today });
	const isoValueDate = startValue && getLocalISODate({ date: startValue });
	const isoLastFocusedDate = lastFocusedDate && getLocalISODate({ date: lastFocusedDate });

	if (lastFocusedDate && renderedMonth === lastFocusedMonth) return isoDate === isoLastFocusedDate;
	if (startValue && renderedMonth === valueMonth) return isoDate === isoValueDate;
	if (renderedMonth === todayMonth) return isoDate === isoToday;
	return true;
};
