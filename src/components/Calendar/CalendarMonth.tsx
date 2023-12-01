import React from "react";
import { getMonthWeeks, getWeekdayNames, getLocalISODate } from "./Calendar.utils";
import CalendarDate from "./CalendarDate";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarMonth = (props: T.MonthProps) => {
	const { date, value, onChange, min, max } = props;
	const month = date.getMonth();
	const weeks = getMonthWeeks({ date });
	const weekdayNames = getWeekdayNames();

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
								const isoDate = date && getLocalISODate({ date });
								const isoValue = value && getLocalISODate({ date: value });
								const active = !!isoDate && !!isoValue && isoDate === isoValue;
								const disabled = (min && date < min) || (max && date > max);

								const handleClick = () => onChange?.({ value: date });

								return (
									<CalendarDate
										date={date}
										active={active}
										disabled={disabled}
										key={index}
										onClick={handleClick}
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
