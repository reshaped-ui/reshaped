import React from "react";

import Button from "components/Button";
import Hidden from "components/Hidden";
import HiddenVisually from "components/HiddenVisually";
import Text from "components/Text";
import View from "components/View";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import { onNextFrame } from "utilities/animation";

import s from "./Calendar.module.css";

import type * as T from "./Calendar.types";

const CalendarControls: React.FC<T.ControlsProps> = (props) => {
	const {
		selectionMode,
		onMonthTitleClick,
		monthTitleRef,
		monthDate,
		renderSelectedMonthLabel,
		hidePrevious,
		hideNext,
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
		if (!hidePrevious) return;
		if (document.activeElement !== prevRef.current) return;

		const targetEl = nextRef.current || monthTitleRef?.current;

		onNextFrame(() => {
			targetEl?.focus();
		});
	}, [hidePrevious, monthTitleRef]);

	React.useEffect(() => {
		if (!hideNext) return;
		if (document.activeElement !== nextRef.current) return;

		const targetEl = prevRef.current || monthTitleRef?.current;

		onNextFrame(() => {
			targetEl?.focus();
		});
	}, [hideNext, monthTitleRef]);

	return (
		<View direction="row" gap={2} align="center">
			<Hidden visibility hide={hidePrevious}>
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
			<Hidden visibility hide={hideNext}>
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
