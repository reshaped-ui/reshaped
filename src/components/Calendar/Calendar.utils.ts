const DAYS_IN_WEEK = 7;
const FIRST_WEEKDAY = 1;

/**
 * Return the ISO date format without the timezones adjustemnts
 */
export const getLocalISODate = (args: { date: Date }) => {
	const { date } = args;

	return [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2),
		date.getDate().toString().padStart(2),
	].join("-");
};

const getNormalizedDay = (args: { date: Date }) => {
	const { date } = args;

	const day = date.getDay();
	return day < FIRST_WEEKDAY ? DAYS_IN_WEEK - day - FIRST_WEEKDAY : day - FIRST_WEEKDAY;
};

/**
 * Return an array of US weekday names for the calendar
 */
export const getWeekdayNames = () => {
	const baseDate = new Date(Date.UTC(2021, 0, 4)); // Starting from a Monday
	const weekdays = [];

	for (let i = 0; i < 7; i++) {
		const weekday = baseDate.toLocaleDateString("en-US", { weekday: "short" });
		weekdays.push(weekday.slice(0, 2));
		baseDate.setDate(baseDate.getDate() + 1);
	}

	return weekdays;
};

/**
 * Return an array of all month names
 */
export const getMonthNames = () => {
	return new Array(12).fill(null).map((_, i) => {
		const date = new Date(0, i);
		return date.toLocaleString("default", { month: "short" });
	});
};

/**
 * Return an array of weeks based on the month passed to the function
 */
export const getMonthWeeks = (args: { date: Date }) => {
	const { date } = args;
	const month = date.getMonth();
	const year = date.getFullYear();
	const weeks: Date[][] = [];
	const currentDate = new Date(year, month, 1);

	// Fill in the days if month starts in the middle of the week
	const firstDay = getNormalizedDay({ date: currentDate });
	if (firstDay !== 0) weeks.push(new Array(firstDay).fill(null));

	while (month === currentDate.getMonth()) {
		const day = getNormalizedDay({ date: currentDate });

		if (day === 0 || !weeks.length) weeks.push([]);

		weeks[weeks.length - 1].push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	// Fill in the days if month ends in the middle of the week
	const lastDay = getNormalizedDay({ date: currentDate });
	if (lastDay !== 0) weeks[weeks.length - 1].push(...new Array(7 - lastDay).fill(null));

	return weeks;
};

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
