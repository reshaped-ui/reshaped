"use client";

import React from "react";

import View from "components/View";
import { onNextFrame } from "utilities/animation";

import {
	setMonthToPrevious,
	setMonthToNext,
	setMonthTo,
	setYearToNext,
	setYearToPrevious,
	applyNavigationBounds,
} from "./Calendar.utils";
import CalendarControls from "./CalendarControls";
import CalendarMonth from "./CalendarMonth";
import CalendarYear from "./CalendarYear";
import useCalendarKeyboardNavigation from "./useCalendarKeyboardNavigation";

import type * as T from "./Calendar.types";

const CalendarControlled: React.FC<T.ControlledProps & T.BaseProps> = (props) => {
	const {
		value,
		onChange,
		defaultMonth,
		min,
		max,
		range,
		firstWeekDay,
		selectedDates,
		renderMonthLabel,
		renderSelectedMonthLabel,
		renderWeekDay,
		previousMonthAriaLabel,
		previousYearAriaLabel,
		nextMonthAriaLabel,
		nextYearAriaLabel,
		monthSelectionAriaLabel,
		renderMonthAriaLabel,
		renderDateAriaLabel,
		renderDateSlot,
	} = props;

	const [selectionMode, setSelectionMode] = React.useState<T.SelectionMode>("date");
	const [monthDate, setMonthDate] = React.useState(defaultMonth || new Date());
	const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
	const monthTitleRef = React.useRef<HTMLButtonElement>(null);
	const prevSelectionModeRef = React.useRef<typeof selectionMode>(selectionMode);
	const bounds = applyNavigationBounds({ date: monthDate, min, max });
	const selectionRootRef = React.useRef<HTMLDivElement>(null);

	const handlePreviousClick = () => {
		if (selectionMode === "month") {
			setMonthDate((prev) => setYearToPrevious(prev));
			return;
		}

		setMonthDate((prev) => setMonthToPrevious(prev));
	};

	const handleNextClick = () => {
		if (selectionMode === "month") {
			setMonthDate((prev) => setYearToNext(prev));
			return;
		}

		setMonthDate((prev) => setMonthToNext(prev));
	};

	const handleMonthTitleClick = () => {
		setSelectionMode("month");
	};

	const handleMonthClick = (i: number) => {
		setMonthDate((prev) => setMonthTo(prev, i));
		setSelectionMode("date");
	};

	const handleDateHover = (date: Date) => {
		setHoveredDate(date);
	};

	const handleDateHoverEnd = (date: Date) => {
		if (hoveredDate && +hoveredDate === +date) setHoveredDate(null);
	};

	React.useEffect(() => {
		if (selectionMode === "date" && selectionMode !== prevSelectionModeRef.current) {
			onNextFrame(() => {
				monthTitleRef.current?.focus();
			});
		}

		prevSelectionModeRef.current = selectionMode;
	}, [selectionMode]);

	useCalendarKeyboardNavigation({
		monthDate,
		rootRef: selectionRootRef,
		changeToNextMonth: handleNextClick,
		changeToPreviousMonth: handlePreviousClick,
		// Each row has 7 days in date selection and 3 months in month
		verticalDelta: selectionMode === "date" ? 7 : 3,
		min,
		max,
	});

	return (
		<View gap={2}>
			<CalendarControls
				renderSelectedMonthLabel={renderSelectedMonthLabel}
				monthDate={monthDate}
				selectionMode={selectionMode}
				isFirstMonth={bounds.isFirstMonth}
				isLastMonth={bounds.isLastMonth}
				monthTitleRef={monthTitleRef}
				onMonthTitleClick={handleMonthTitleClick}
				onNextClick={handleNextClick}
				onPreviousClick={handlePreviousClick}
				previousMonthAriaLabel={previousMonthAriaLabel}
				previousYearAriaLabel={previousYearAriaLabel}
				nextMonthAriaLabel={nextMonthAriaLabel}
				nextYearAriaLabel={nextYearAriaLabel}
				monthSelectionAriaLabel={monthSelectionAriaLabel}
			/>

			<View.Item attributes={{ ref: selectionRootRef }}>
				{selectionMode === "date" && (
					<CalendarMonth
						date={monthDate}
						value={value}
						onChange={onChange}
						min={min}
						max={max}
						range={range}
						firstWeekDay={firstWeekDay}
						hoveredDate={hoveredDate}
						selectedDates={selectedDates}
						onDateHover={handleDateHover}
						onDateHoverEnd={handleDateHoverEnd}
						renderWeekDay={renderWeekDay}
						renderDateAriaLabel={renderDateAriaLabel}
						renderDateSlot={renderDateSlot}
					/>
				)}

				{selectionMode === "month" && (
					<CalendarYear
						monthDate={monthDate}
						onMonthClick={handleMonthClick}
						renderMonthLabel={renderMonthLabel}
						renderMonthAriaLabel={renderMonthAriaLabel}
						min={min}
						max={max}
					/>
				)}
			</View.Item>
		</View>
	);
};

CalendarControlled.displayName = "CalendarControlled";

export default CalendarControlled;
