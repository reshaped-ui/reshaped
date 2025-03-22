"use client";

import { getMonthWeeks, getWeekdayNames, getLocalISODate } from "./Calendar.utils";
import CalendarDate from "./CalendarDate";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarMonth = (props: T.MonthProps) => {
	const {
		date,
		value,
		onChange,
		min,
		max,
		range,
		firstWeekDay,
		selectedDates,
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		renderWeekDay,
		renderDateAriaLabel,
	} = props;
	let foundFocusableDate = false;
	const month = date.getMonth();
	const weeks = getMonthWeeks({ date, firstWeekDay });
	const weekdayNames = getWeekdayNames({ firstWeekDay, renderWeekDay });

	return (
		<table className={s.selection} role="grid">
			<thead aria-hidden="true">
				<tr>
					{weekdayNames.map((dayName) => (
						<th className={s.weekday} key={dayName} scope="col">
							{dayName}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{weeks.map((week) => {
					const key = [month, week[0]?.getDate()].filter(Boolean).join("-");
					return (
						<tr key={key} className={s.row}>
							{week.map((date, index) => {
								const disabled = !!date && ((min && date < min) || (max && date > max));
								const month = date?.getMonth();
								const today = new Date();
								const isoToday = getLocalISODate({ date: today });
								const startValue = value && "start" in value ? value.start : value;
								const endValue = value && "end" in value ? value.end : value;
								const isoDate = date && getLocalISODate({ date });

								/**
								 * Decide if date has to be focusable with Tab (only one date should be)
								 * 1. If there is a selected value - it's focusable
								 * 2. Otherwise, today's date is focusable
								 * 3. Otherwise, first non-disabled date is focusable
								 */
								let focusable = false;

								if (!foundFocusableDate && date) {
									if (!!startValue && startValue.getMonth() === date?.getMonth()) {
										focusable = getLocalISODate({ date: startValue }) === getLocalISODate({ date });
									} else if (isoDate && month === today.getMonth()) {
										focusable = isoDate >= isoToday && !disabled;
									} else {
										focusable = !disabled;
									}
								}

								if (focusable) foundFocusableDate = true;

								return (
									<CalendarDate
										key={index}
										date={date}
										isoDate={isoDate}
										disabled={disabled}
										range={range}
										focusable={focusable}
										startValue={startValue}
										endValue={endValue}
										onChange={onChange}
										hoveredDate={hoveredDate}
										onDateHover={onDateHover}
										onDateHoverEnd={onDateHoverEnd}
										renderAriaLabel={renderDateAriaLabel}
										selectedDates={selectedDates}
									/>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CalendarMonth;
