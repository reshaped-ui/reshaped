import React from "react";
import Button from "components/Button";
import View from "components/View";
import Hidden from "components/Hidden";
import Text from "components/Text";
import HiddenVisually from "components/HiddenVisually";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import { onNextFrame } from "utilities/animation";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarControls = (props: T.ControlsProps) => {
	const {
		selectionMode,
		onMonthTitleClick,
		monthTitleRef,
		monthDate,
		renderSelectedMonthLabel,
		isFirstMonth,
		isLastMonth,
		onNextClick,
		onPreviousClick,
		monthSelectionAriaLabel = "Select a month",
		previousMonthAriaLabel = "Previous month",
		previousYearAriaLabel = "Previous year",
		nextMonthAriaLabel = "Next month",
		nextYearAriaLabel = "Next year",
	} = props;
	const prevRef = React.useRef<HTMLButtonElement>(null);
	const nextRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (!isFirstMonth) return;
		if (document.activeElement !== prevRef.current) return;

		const targetEl = nextRef.current || monthTitleRef.current;

		onNextFrame(() => {
			targetEl?.focus();
		});
	}, [isFirstMonth, monthTitleRef]);

	React.useEffect(() => {
		if (!isLastMonth) return;
		if (document.activeElement !== nextRef.current) return;

		const targetEl = prevRef.current || monthTitleRef.current;

		onNextFrame(() => {
			targetEl?.focus();
		});
	}, [isLastMonth, monthTitleRef]);

	return (
		<View direction="row" gap={2} align="center">
			<Hidden visibility hide={isFirstMonth}>
				<div className={s.control}>
					<Button
						variant="ghost"
						icon={IconChevronLeft}
						onClick={onPreviousClick}
						attributes={{
							ref: prevRef,
							"aria-label":
								selectionMode === "date" ? previousMonthAriaLabel : previousYearAriaLabel,
						}}
					/>
				</div>
			</Hidden>
			<View.Item grow>
				{selectionMode === "date" && (
					<Button
						fullWidth
						variant="ghost"
						onClick={onMonthTitleClick}
						attributes={{ ref: monthTitleRef }}
					>
						{renderSelectedMonthLabel
							? renderSelectedMonthLabel({ date: monthDate })
							: monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
						<HiddenVisually>{monthSelectionAriaLabel}</HiddenVisually>
					</Button>
				)}

				{selectionMode === "month" && (
					<Text align="center" weight="medium">
						{monthDate.toLocaleDateString("en-US", { year: "numeric" })}
					</Text>
				)}
			</View.Item>
			<Hidden visibility hide={isLastMonth}>
				<div className={s.control}>
					<Button
						variant="ghost"
						icon={IconChevronRight}
						onClick={onNextClick}
						attributes={{
							ref: nextRef,
							"aria-label": selectionMode === "date" ? nextMonthAriaLabel : nextYearAriaLabel,
						}}
					/>
				</div>
			</Hidden>
		</View>
	);
};

CalendarControls.displayName = "CalendarControls";

export default CalendarControls;
