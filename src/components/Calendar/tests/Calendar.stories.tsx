import { Example } from "utilities/storybook";
import Calendar from "components/Calendar";
import View from "components/View";
import useToggle from "hooks/useToggle";
import React from "react";
import Popover from "components/Popover";
import Select from "components/Select";

export default {
	title: "Components/Calendar",
	component: Calendar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/calendar",
		},
	},
};

export const base = () => (
	<Example>
		<Example.Item title="base month">
			<Calendar defaultMonth={new Date(2023, 11)} onChange={console.log} />
		</Example.Item>
	</Example>
);

export const selection = () => (
	<Example>
		<Example.Item title="single">
			<Calendar defaultMonth={new Date(2023, 11)} defaultValue={new Date(2023, 11, 15)} />
		</Example.Item>
		<Example.Item title="range">
			<Calendar
				range
				defaultMonth={new Date(2023, 11)}
				defaultValue={{ start: new Date(2023, 11, 15), end: new Date(2023, 11, 18) }}
			/>
		</Example.Item>
	</Example>
);

export const boundaries = () => (
	<Example>
		<Example.Item title="min">
			<Calendar defaultMonth={new Date(2023, 11)} min={new Date(2023, 11, 4)} />
		</Example.Item>
		<Example.Item title="max">
			<Calendar defaultMonth={new Date(2023, 11)} max={new Date(2023, 11, 20)} />
		</Example.Item>
	</Example>
);

export const translation = () => (
	<Example>
		<Example.Item title="NL">
			<Calendar
				defaultMonth={new Date(2023, 11)}
				renderMonthLabel={({ date }) => date.toLocaleDateString("nl", { month: "short" })}
				renderSelectedMonthLabel={({ date }) =>
					date.toLocaleDateString("nl", { month: "long", year: "numeric" })
				}
				renderWeekDay={({ date }) => date.toLocaleDateString("nl", { weekday: "short" })}
			/>
		</Example.Item>
	</Example>
);
