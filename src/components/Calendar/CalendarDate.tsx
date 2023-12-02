import React from "react";
import Actionable from "components/Actionable";
import { classNames } from "utilities/helpers";
import { getLocalISODate } from "./Calendar.utils";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarDate = (props: T.DateProps) => {
	const { date, value, min, max, onChange, range, hoveredDate, onDateHover, onDateHoverEnd } =
		props;

	if (!date) return <td className={s.date} />;

	const startValue = value && "start" in value ? value.start : value;
	const endValue = value && "end" in value ? value.end : value;

	const isoDate = date && getLocalISODate({ date });
	const isoStartValue = startValue && getLocalISODate({ date: startValue });
	const isoEndValue = endValue && getLocalISODate({ date: endValue });

	const isActiveStart = !!isoDate && !!isoStartValue && isoDate === isoStartValue;
	const isActiveEnd = !!isoDate && !!isoEndValue && isoDate === isoEndValue;
	const disabled = (min && date < min) || (max && date > max);
	const inRange =
		startValue &&
		startValue < date &&
		((endValue && endValue > date) || (hoveredDate && !endValue && hoveredDate > date));
	const dateClassNames = classNames([
		s.date,
		isActiveStart && s["date--active-start"],
		(isActiveEnd || (!endValue && isActiveStart && !(hoveredDate && hoveredDate > startValue))) &&
			s["date--active-end"],
		inRange && s["date--in-range"],
	]);

	const handleClick = () => {
		if (!range) {
			(onChange as T.SingleProps["onChange"])?.({ value: date });
			return;
		}

		const bothDatesSelected = startValue && endValue;
		const noneDatesSelected = !startValue && !endValue;
		const selectingBeforeStart = startValue && date < startValue;
		const selectingStart = bothDatesSelected || noneDatesSelected || selectingBeforeStart;
		const start = selectingStart ? date : startValue;
		const end = !selectingStart ? date : null;

		(onChange as T.RangeProps["onChange"])?.({ value: { start, end } });
	};

	const handleMouseEnter = () => {
		onDateHover(date);
	};

	const handleMouseLeave = () => {
		onDateHoverEnd(date);
	};

	return (
		<td className={dateClassNames}>
			<Actionable
				fullWidth
				insetFocus
				className={s["date-button"]}
				disabled={disabled}
				onClick={handleClick}
				attributes={{ onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }}
			>
				{date.getDate()}
			</Actionable>
		</td>
	);
};

export default CalendarDate;
