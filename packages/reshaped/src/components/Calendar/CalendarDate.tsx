"use client";

import Actionable from "components/Actionable";
import { classNames } from "utilities/props";

import s from "./Calendar.module.css";
import { getLocalISODate } from "./Calendar.utils";

import type * as T from "./Calendar.types";

const CalendarDate: React.FC<T.DateProps> = (props) => {
	const {
		date,
		isoDate,
		startValue,
		endValue,
		disabled: passedDisabled,
		focusable,
		onChange,
		range,
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		onDateFocus,
		selectedDates,
		disabledDates,
		renderAriaLabel,
		renderSlot,
	} = props;

	if (!date) return <td className={s.cell} aria-hidden="true" />;

	const isoStartValue = startValue && getLocalISODate({ date: startValue });
	const isoEndValue = endValue && getLocalISODate({ date: endValue });

	const isStartValue = Boolean(isoDate && !!isoStartValue && isoDate === isoStartValue);
	const isEndValue = Boolean(isoDate && !!isoEndValue && isoDate === isoEndValue);
	const isAfterStartValue = Boolean(isoDate && isoStartValue && isoDate > isoStartValue);
	const isBeforeEndValue = Boolean(isoDate && isoEndValue && isoDate < isoEndValue);
	const isInHoveredRange = Boolean(hoveredDate && !endValue && hoveredDate > date);
	const isInSelectedDates = !!selectedDates?.some(
		(selectedDate) => getLocalISODate({ date: selectedDate }) === isoDate
	);
	const disabled =
		passedDisabled ||
		disabledDates?.some((disabledDate) => getLocalISODate({ date: disabledDate }) === isoDate);

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

	const handleFocus = () => {
		handleMouseEnter();
		onDateFocus(date);
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
					onFocus: handleFocus,
					onBlur: handleMouseLeave,
				}}
			>
				{date.getDate()}
				{renderSlot?.({ date, selected: Boolean(selection && selection !== "range") })}
			</Actionable>
		</td>
	);
};

CalendarDate.displayName = "CalendarDate";

export default CalendarDate;
