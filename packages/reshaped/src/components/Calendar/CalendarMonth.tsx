"use client";

import { useState } from "react";

import s from "./Calendar.module.css";
import { getMonthWeeks, getWeekdayNames, getLocalISODate, isDateFocusable } from "./Calendar.utils";
import CalendarDate from "./CalendarDate";

import type * as T from "./Calendar.types";

const CalendarMonth: React.FC<T.MonthProps> = (props) => {
	const {
		date,
		value,
		onChange,
		min,
		max,
		range,
		firstWeekDay,
		selectedDates,
		disabledDates,
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		renderWeekDay,
		renderDateAriaLabel,
		renderDateSlot,
	} = props;
	let foundFocusableDate = false;
	const [lastFocusedDate, setLastFocusedDate] = useState<Date>();
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
								const startValue = value && "start" in value ? value.start : value;
								const endValue = value && "end" in value ? value.end : value;
								const isoDate = date && getLocalISODate({ date });
								const focusable = disabled
									? false
									: !foundFocusableDate &&
										!!date &&
										isDateFocusable({ date, lastFocusedDate, startValue });

								// eslint-disable-next-line react-hooks/immutability
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
										onDateFocus={setLastFocusedDate}
										renderAriaLabel={renderDateAriaLabel}
										selectedDates={selectedDates}
										disabledDates={disabledDates}
										renderSlot={renderDateSlot}
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

CalendarMonth.displayName = "CalendarMonth";

export default CalendarMonth;
