import { StoryObj } from "@storybook/react";
import { expect, fn, fireEvent } from "@storybook/test";
import Slider from "components/Slider";

export default {
	title: "Components/Slider/tests",
	component: Slider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/slider",
		},
	},
};

export const defaultValue: StoryObj<{
	handleChange: ReturnType<typeof fn>;
	handleChangeCommit: ReturnType<typeof fn>;
}> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<Slider
			name="test-name"
			defaultValue={50}
			onChange={args.handleChange}
			onChangeCommit={args.handleChangeCommit}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("slider");

		expect(input).toHaveValue("50");

		fireEvent.change(input, { target: { value: 51 } });

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ value: 51, name: "test-name" });
		expect(input).toHaveValue("51");
	},
};

export const value: StoryObj<{
	handleChange: ReturnType<typeof fn>;
	handleChangeCommit: ReturnType<typeof fn>;
}> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<Slider
			name="test-name"
			value={50}
			onChange={args.handleChange}
			onChangeCommit={args.handleChangeCommit}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("slider");

		expect(input).toHaveValue("50");

		fireEvent.change(input, { target: { value: 51 } });

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ value: 51, name: "test-name" });
		expect(input).toHaveValue("50");
	},
};

export const rangeDefaultValue: StoryObj<{
	handleChange: ReturnType<typeof fn>;
	handleChangeCommit: ReturnType<typeof fn>;
}> = {
	name: "range, defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<Slider
			range
			name="test-name"
			defaultMinValue={50}
			defaultMaxValue={70}
			onChange={args.handleChange}
			onChangeCommit={args.handleChangeCommit}
		/>
	),
	play: async ({ canvas, args }) => {
		const [minInput, maxInput] = canvas.getAllByRole("slider");

		expect(minInput).toHaveValue("50");
		expect(maxInput).toHaveValue("70");

		fireEvent.change(minInput, { target: { value: 51 } });

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			minValue: 51,
			maxValue: 70,
			name: "test-name",
		});

		expect(minInput).toHaveValue("51");
		expect(maxInput).toHaveValue("70");
	},
};

export const rangeValue: StoryObj<{
	handleChange: ReturnType<typeof fn>;
	handleChangeCommit: ReturnType<typeof fn>;
}> = {
	name: "range, value, controlled",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<Slider
			range
			name="test-name"
			minValue={50}
			maxValue={70}
			onChange={args.handleChange}
			onChangeCommit={args.handleChangeCommit}
		/>
	),
	play: async ({ canvas, args }) => {
		const [minInput, maxInput] = canvas.getAllByRole("slider");

		expect(minInput).toHaveValue("50");
		expect(maxInput).toHaveValue("70");

		fireEvent.change(minInput, { target: { value: 51 } });

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			minValue: 51,
			maxValue: 70,
			name: "test-name",
		});

		expect(minInput).toHaveValue("50");
		expect(maxInput).toHaveValue("70");
	},
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => <Slider name="nmae" range min={50} max={70} />,
	play: async ({ canvas }) => {
		const [minInputEl, maxInputEl] = canvas.getAllByRole("slider");

		expect(minInputEl).toHaveAttribute("min", "50");
		expect(minInputEl).toHaveAttribute("max", "70");
		expect(maxInputEl).toHaveAttribute("min", "50");
		expect(maxInputEl).toHaveAttribute("max", "70");
	},
};

export const step: StoryObj = {
	name: "step",
	render: () => <Slider name="name" defaultValue={11} step={5} />,
	play: async ({ canvas }) => {
		const inputEl = canvas.getByRole("slider");
		expect(inputEl).toHaveValue("10");
	},
};

export const stepFloat: StoryObj = {
	name: "step, float",
	render: () => <Slider name="name" defaultValue={20.24} step={0.1} />,
	play: async ({ canvas }) => {
		const inputEl = canvas.getByRole("slider");
		expect(inputEl).toHaveValue("20.2");
	},
};

export const renderValue: StoryObj = {
	name: "renderValue",
	render: () => <Slider name="name" defaultValue={50} renderValue={(args) => `$${args.value}`} />,
	play: async ({ canvas }) => {
		const tooltipEl = canvas.getByText(`$50`);
		expect(tooltipEl).toBeInTheDocument();
	},
};

export const withoutTooltipValue: StoryObj = {
	name: "renderValue=false",
	render: () => <Slider name="name" defaultValue={50} renderValue={false} />,
	play: async ({ canvas }) => {
		const tooltipEl = canvas.queryByText(`$50`);
		expect(tooltipEl).not.toBeInTheDocument();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => <Slider name="name" defaultValue={50} disabled />,
	play: async ({ canvas }) => {
		const inputEl = canvas.getByRole("slider");
		expect(inputEl).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Slider name="name" className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
