import { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import Calendar from "@/components/Calendar";
import Text from "@/components/Text";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Calendar",
	component: Calendar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/calendar",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="defaultMonth: 2020 January">
				<Calendar defaultMonth={new Date(2020, 0)} range />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		expect(canvas.getByRole("grid")).toBeInTheDocument();
		expect(canvas.getAllByRole("gridcell")).toHaveLength(31);
		expect(canvas.getAllByRole("checkbox")).toHaveLength(31);
	},
};

export const today: StoryObj = {
	name: "today",
	render: () => (
		<Example>
			<Example.Item title="today's date is bold">
				<Calendar />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const now = new Date();
		const dates = canvas.getAllByRole("checkbox");
		const todayDates = dates.filter((el) => el.getAttribute("aria-current") === "date");

		expect(todayDates).toHaveLength(1);
		expect(todayDates[0]).toHaveTextContent(String(now.getDate()));
	},
};

export const defaultValue: StoryObj = {
	name: "defaultValue, range",
	render: () => (
		<Example>
			<Example.Item title="defaultValue">
				<Calendar defaultMonth={new Date(2020, 0)} defaultValue={new Date(2020, 0, 10)} />
			</Example.Item>
			<Example.Item title="defaultValue, range">
				<Calendar
					range
					defaultMonth={new Date(2020, 0)}
					defaultValue={{ start: new Date(2020, 0, 10), end: new Date(2020, 0, 15) }}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [singleCalendar, rangeCalendar] = canvas.getAllByRole("grid");
		const singleCalendarDates = within(singleCalendar).getAllByRole("checkbox");
		const rangeCalendarDates = within(rangeCalendar).getAllByRole("checkbox");

		expect(singleCalendarDates[9]).toBeChecked();

		for (let i = 9; i < 15; i++) {
			expect(rangeCalendarDates[i]).toBeChecked();
		}
	},
};

export const monthsToRender: StoryObj = {
	name: "monthsToRender",
	render: () => (
		<Example>
			<Example.Item title="monthsToRender: 2">
				<Calendar defaultMonth={new Date(2020, 0)} monthsToRender={2} range />
			</Example.Item>
		</Example>
	),
};

export const renderDate: StoryObj = {
	name: "renderDateSlot, renderDateValue",
	render: () => (
		<Example>
			<Example.Item title="renderDateSlot">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					defaultValue={new Date(2020, 0, 10)}
					renderDateSlot={(args) => {
						return (
							<Text
								color={
									args.selected
										? undefined
										: args.date.getDate() < 15
											? "positive"
											: "neutral-faded"
								}
								variant="caption-2"
							>
								{args.date.getDate() < 15 ? "$150" : "$200"}
							</Text>
						);
					}}
				/>
			</Example.Item>
			<Example.Item title="renderDateValue">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					defaultValue={new Date(2020, 0, 10)}
					renderDateValue={({ date }) => {
						const label = date.getDate();

						return date.getDate() === 3 ? (
							<Text color="primary" weight="bold">
								{label}
							</Text>
						) : (
							label
						);
					}}
				/>
			</Example.Item>
		</Example>
	),
};

export const selectedDates: StoryObj = {
	name: "selectedDates",
	render: () => (
		<Example>
			<Example.Item title="selectedDates: [4,8]">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					value={null}
					selectedDates={[new Date(2020, 0, 4), new Date(2020, 0, 8)]}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox");

		expect(dates[3]).toBeChecked();
		expect(dates[7]).toBeChecked();
	},
};

export const disabledDates: StoryObj = {
	name: "disabledDates",
	render: () => (
		<Example>
			<Example.Item title="disabledDates: [4,8]">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					value={null}
					disabledDates={[new Date(2020, 0, 4), new Date(2020, 0, 8)]}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox", { hidden: true });

		expect(dates[3]).toBeDisabled();
		expect(dates[7]).toBeDisabled();
	},
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => (
		<Example>
			<Example.Item title="min: 4, max: 20">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					min={new Date(2020, 0, 4)}
					max={new Date(2020, 0, 20)}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox");

		expect(dates).toHaveLength(17);
	},
};

export const firstWeekDay: StoryObj = {
	name: "firstWeekDay",
	render: () => (
		<Example>
			<Example.Item title="firstWeekDay: 3 (Wed)">
				<Calendar defaultMonth={new Date(2020, 0)} firstWeekDay={3} />
			</Example.Item>
		</Example>
	),
};

export const translation = {
	name: "render functions",
	render: () => (
		<Example>
			<Example.Item title="translated to NL">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					renderMonthLabel={({ date }) => date.toLocaleDateString("nl", { month: "short" })}
					renderSelectedMonthLabel={({ date }) =>
						date.toLocaleDateString("nl", { month: "long", year: "numeric" })
					}
					renderWeekDay={({ date }) => date.toLocaleDateString("nl", { weekday: "short" })}
				/>
			</Example.Item>
		</Example>
	),
};
