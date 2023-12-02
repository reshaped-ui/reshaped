import React from "react";
import { Example } from "utilities/storybook";
import Calendar from "components/Calendar";

export default { title: "Components/Calendar" };

export const rendering = () => (
	<Example>
		<Example.Item title="single date selection">
			<Calendar
				// defaultMonth={new Date(2022, 0)}
				// min={new Date(2021, 11, 6)}
				// max={new Date(2022, 1, 22)}
				// defaultValue={{ start: new Date(2023, 11, 6), end: null }}
				// range
				renderWeekDay={(args) => {
					return args.date.toLocaleDateString("nl", { weekday: "short" });
				}}
				renderSelectedMonthLabel={(args) => {
					return args.date.toLocaleDateString("nl", { month: "long", year: "numeric" });
				}}
				renderMonthLabel={(args) => {
					return args.date.toLocaleDateString("nl", { month: "short" });
				}}
			/>
		</Example.Item>
	</Example>
);
