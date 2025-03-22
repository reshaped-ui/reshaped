"use client";

import Actionable from "components/Actionable";
import { classNames } from "utilities/helpers";
import { getLocalISODate } from "./Calendar.utils";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarDate = (props: T.DateProps) => {
	const {
		date,
		isoDate,
		startValue,
		endValue,
		disabled,
		focusable,
		onChange,
		range,
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		renderAriaLabel,
		selectedDates,
	} = props;

	if (!date) return <td className={s.cell} aria-hidden="true" />;

	const isoStartValue = startValue && getLocalISODate({ date: startValue });
	const isoEndValue = endValue && getLocalISODate({ date: endValue });

	const isStartValue = !!isoDate && !!isoStartValue && isoDate === isoStartValue;
	const isEndValue = !!isoDate && !!isoEndValue && isoDate === isoEndValue;
	const isAfterStartValue = startValue && date > startValue;
	const isBeforeEndValue = endValue && date < endValue;
	const isInHoveredRange = hoveredDate && !endValue && hoveredDate > date;
	const isInSelectedDates = !!selectedDates?.find(
		(selectedDate) => getLocalISODate({ date: selectedDate }) === isoDate
	);

	let selection;

	switch (true) {
		case isAfterStartValue && isInHoveredRange:
		case isAfterStartValue && isBeforeEndValue:
			selection = "range";
			break;
		case isStartValue && (!range || isEndValue):
		case isInSelectedDates:
			selection = "standalone";
			break;
		case isStartValue:
			selection = "start";
			break;
		case isEndValue:
			selection = "end";
			break;
	}

	const dateClassNames = classNames([
		s.cell,
		selection && s["--active"],
		selection && s[`--selection-${selection}`],
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
		<td className={dateClassNames} role={disabled ? "presentation" : "gridcell"}>
			<Actionable
				fullWidth
				insetFocus
				className={s["cell-button"]}
				disabled={disabled}
				onClick={handleClick}
				attributes={{
					role: "checkbox",
					tabIndex: focusable ? 0 : -1,
					"aria-hidden": disabled,
					"aria-label": renderAriaLabel
						? renderAriaLabel({ date })
						: date.toLocaleDateString("en-us", { month: "long", day: "numeric", weekday: "long" }),
					"aria-checked": !!selection,
					"data-rs-date": getLocalISODate({ date }),
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					onFocus: handleMouseEnter,
					onBlur: handleMouseLeave,
				}}
			>
				{date.getDate()}
			</Actionable>
		</td>
	);
};

export default CalendarDate;
