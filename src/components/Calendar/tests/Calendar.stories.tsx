import React from "react";
import { Example } from "utilities/storybook";
import Calendar from "components/Calendar";

export default { title: "Components/Calendar" };

export const rendering = () => (
	<Example>
		<Example.Item title="single date selection">
			<Calendar
				defaultMonth={new Date(2023, 11)}
				min={new Date(2023, 1, 6)}
				max={new Date(2024, 1, 22)}
				// defaultValue={{ start: new Date(2023, 11, 6), end: null }}
				// range
				renderWeekDay={(args) => {
					return args.date.toLocaleDateString("en-us", { weekday: "short" });
				}}
				renderSelectedMonthLabel={(args) => {
					return args.date.toLocaleDateString("en-us", { month: "long", year: "numeric" });
				}}
				renderMonthLabel={(args) => {
					return args.date.toLocaleDateString("en-us", { month: "short" });
				}}
			/>
		</Example.Item>
	</Example>
);
