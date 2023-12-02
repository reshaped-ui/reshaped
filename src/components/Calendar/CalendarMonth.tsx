import React from "react";
import { getMonthWeeks, getWeekdayNames } from "./Calendar.utils";
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
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		renderWeekDay,
	} = props;
	const month = date.getMonth();
	const weeks = getMonthWeeks({ date, firstWeekDay });
	const weekdayNames = getWeekdayNames({ firstWeekDay, renderWeekDay });

	return (
		<table className={s.dates}>
			<thead>
				<tr>
					{weekdayNames.map((dayName) => (
						<th className={s.weekday} key={dayName}>
							{dayName}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{weeks.map((week) => {
					const key = [month, week[0]?.getDate()].filter(Boolean).join("-");
					return (
						<tr key={key} className={s.week}>
							{week.map((date, index) => {
								return (
									<CalendarDate
										date={date}
										key={index}
										range={range}
										value={value}
										min={min}
										max={max}
										onChange={onChange}
										hoveredDate={hoveredDate}
										onDateHover={onDateHover}
										onDateHoverEnd={onDateHoverEnd}
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
