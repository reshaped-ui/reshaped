"use client";

import React from "react";
import Button from "components/Button";
import View from "components/View";
import Text from "components/Text";
import Hidden from "components/Hidden";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import {
	setMonthToPrevious,
	setMonthToNext,
	setMonthTo,
	setYearToNext,
	setYearToPrevious,
	getMonthNames,
	applyNavigationBounds,
} from "./Calendar.utils";
import CalendarMonth from "./CalendarMonth";
import type * as T from "./Calendar.types";

const CalendarControlled = (props: T.ControlledProps & T.BaseProps) => {
	const { value, onChange, defaultMonth, min, max } = props;
	const [selectionMode, setSelectionMode] = React.useState<"date" | "month">("date");
	const [monthDate, setMonthDate] = React.useState(defaultMonth || new Date());
	const bounds = applyNavigationBounds({ date: monthDate, min, max });

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

	return (
		<View gap={2}>
			<View direction="row" gap={2} align="center">
				<Hidden visibility hide={bounds.isFirstMonth}>
					<Button variant="ghost" icon={IconChevronLeft} onClick={handlePreviousClick} />
				</Hidden>
				<View.Item grow>
					{selectionMode === "date" && (
						<Button fullWidth variant="ghost" onClick={handleMonthTitleClick}>
							{monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
						</Button>
					)}
					{selectionMode === "month" && (
						<Text align="center" weight="medium">
							{monthDate.toLocaleDateString("en-US", { year: "numeric" })}
						</Text>
					)}
				</View.Item>
				<Hidden visibility hide={bounds.isLastMonth}>
					<Button variant="ghost" icon={IconChevronRight} onClick={handleNextClick} />
				</Hidden>
			</View>

			{selectionMode === "date" && (
				<CalendarMonth date={monthDate} value={value} onChange={onChange} min={min} max={max} />
			)}

			{selectionMode === "month" && (
				<View direction="row" gap={2}>
					{getMonthNames().map((name, i) => {
						const date = new Date(monthDate.getFullYear(), i);
						const isOutsideMinBound =
							min && min.getFullYear() >= date.getFullYear() && min.getMonth() > date.getMonth();
						const isOutsideMaxBound =
							max && max.getFullYear() <= date.getFullYear() && max.getMonth() < date.getMonth();

						return (
							<View.Item columns={4} key={name}>
								<Button
									variant="ghost"
									onClick={() => handleMonthClick(i)}
									fullWidth
									disabled={isOutsideMaxBound || isOutsideMinBound}
								>
									{name}
								</Button>
							</View.Item>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default CalendarControlled;
