import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, fn, Mock } from "storybook/test";

import Modal from "components/Modal";
import Slider from "components/Slider";
import View from "components/View";
import useToggle from "hooks/useToggle";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Slider",
	component: Slider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/slider",
		},
	},
};

export const base: StoryObj = {
	name: "name, minName, maxName, range",
	render: () => (
		<Example>
			<Example.Item title="single, name">
				<Slider name="slider-single" defaultValue={30} />
			</Example.Item>
			<Example.Item title="range, name">
				<Slider range name="slider-range" defaultMinValue={30} defaultMaxValue={85} />
			</Example.Item>
			<Example.Item title="range, minName, maxName">
				<Slider
					range
					minName="slider-min"
					maxName="slider-max"
					defaultMinValue={30}
					defaultMaxValue={85}
				/>
			</Example.Item>
			<div style={{ height: 2000 }} />
		</Example>
	),
	play: ({ canvas }) => {
		const inputs = canvas.getAllByRole("slider");

		expect(inputs[0]).toHaveAttribute("name", "slider-single");

		expect(inputs[1]).toHaveAttribute("name", "slider-range");
		expect(inputs[2]).toHaveAttribute("name", "slider-range");

		expect(inputs[3]).toHaveAttribute("name", "slider-min");
		expect(inputs[4]).toHaveAttribute("name", "slider-max");
	},
};

export const orientation = {
	name: "orientation",
	render: () => (
		<Example>
			<Example.Item title="orientation: vertical">
				<View height="200px">
					<Slider
						range
						name="slider"
						defaultMinValue={30}
						defaultMaxValue={85}
						orientation="vertical"
					/>
				</View>
			</Example.Item>
			<View height="2000px" />
		</Example>
	),
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => (
		<Example>
			<Example.Item title="min, max">
				<Slider name="name" min={50} max={70} defaultValue={60} />
			</Example.Item>
			<Example.Item title="min, max, value < min">
				<Slider name="name" min={50} max={70} defaultValue={30} />
			</Example.Item>
			<Example.Item title="min, max, value > max">
				<Slider name="name" min={50} max={70} defaultValue={80} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const inputs = canvas.getAllByRole("slider");

		expect(inputs[0]).toHaveAttribute("min", "50");
		expect(inputs[0]).toHaveAttribute("max", "70");
		expect(inputs[0]).toHaveValue("60");

		fireEvent.change(inputs[0], { target: { value: 30 } });
		expect(inputs[0]).toHaveValue("50");

		fireEvent.change(inputs[0], { target: { value: 80 } });
		expect(inputs[0]).toHaveValue("70");

		expect(inputs[1]).toHaveValue("50");
		expect(inputs[2]).toHaveValue("70");
	},
};

export const step: StoryObj = {
	name: "step",
	render: () => (
		<Example>
			<Example.Item title="step: 5">
				<Slider name="slider" defaultValue={30} step={5} />
			</Example.Item>

			<Example.Item title="step: 5, defaultValue: 31, rounded down to 30">
				<Slider name="slider" defaultValue={31} step={5} />
			</Example.Item>

			<Example.Item title="step: 0.01, float">
				<Slider name="slider" defaultValue={30} step={0.01} />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const inputs = canvas.getAllByRole("slider");

		expect(inputs[0]).toHaveValue("30");

		fireEvent.change(inputs[0], { target: { value: 31 } });
		expect(inputs[0]).toHaveValue("30");

		fireEvent.change(inputs[0], { target: { value: 34 } });
		expect(inputs[0]).toHaveValue("35");

		expect(inputs[1]).toHaveValue("30");
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<Slider name="slider" defaultValue={30} disabled />
			</Example.Item>

			<Example.Item title="disabled, range">
				<Slider name="slider" range defaultMinValue={30} defaultMaxValue={80} disabled />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const inputs = canvas.getAllByRole("slider");

		expect(inputs[0]).toBeDisabled();
		expect(inputs[1]).toBeDisabled();
	},
};

export const renderValue: StoryObj = {
	name: "renderValue",
	render: () => (
		<Example>
			<Example.Item title="renderValue: $">
				<Slider name="name" defaultValue={50} renderValue={(args) => `$${args.value}`} />
			</Example.Item>
			<Example.Item title="renderValue: false">
				<Slider name="name" defaultValue={50} renderValue={false} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const tooltip = canvas.getByText("$50");
		const hiddenTooltip = canvas.queryByText("50");

		expect(tooltip).toBeInTheDocument();
		expect(hiddenTooltip).not.toBeInTheDocument();
	},
};

export const defaultValue: StoryObj<{
	handleChange: Mock;
	handleChangeCommit: Mock;
}> = {
	name: "defaultValue, onChange, onChangeCommit",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<View paddingTop={10}>
			<Slider
				name="test-name"
				defaultValue={50}
				onChange={args.handleChange}
				onChangeCommit={args.handleChangeCommit}
			/>
		</View>
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
	handleChange: Mock;
	handleChangeCommit: Mock;
}> = {
	name: "value, onChange, onChangeCommit",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<View paddingTop={10}>
			<Slider
				name="test-name"
				value={50}
				onChange={args.handleChange}
				onChangeCommit={args.handleChangeCommit}
			/>
		</View>
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
	handleChange: Mock;
	handleChangeCommit: Mock;
}> = {
	name: "range, defaultValue, onChange, onChangeCommit",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<View paddingTop={10}>
			<Slider
				range
				name="test-name"
				defaultMinValue={50}
				defaultMaxValue={70}
				onChange={args.handleChange}
				onChangeCommit={args.handleChangeCommit}
			/>
		</View>
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
			minName: "test-name",
			maxName: "test-name",
		});

		expect(minInput).toHaveValue("51");
		expect(maxInput).toHaveValue("70");
	},
};

export const rangeValue: StoryObj<{
	handleChange: Mock;
	handleChangeCommit: Mock;
}> = {
	name: "range, value, onChange, onChangeCommit, minName, maxName",
	args: {
		handleChange: fn(),
		handleChangeCommit: fn(),
	},
	render: (args) => (
		<View paddingTop={10}>
			<Slider
				range
				minName="test-name-min"
				maxName="test-name-max"
				minValue={50}
				maxValue={70}
				onChange={args.handleChange}
				onChangeCommit={args.handleChangeCommit}
			/>
		</View>
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
			minName: "test-name-min",
			maxName: "test-name-max",
		});

		expect(minInput).toHaveValue("50");
		expect(maxInput).toHaveValue("70");
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

export const testForm: StoryObj<{ handleFormChange: Mock; handleFormInit: Mock }> = {
	name: "test: form onChange",
	args: {
		handleFormChange: fn(),
		handleFormInit: fn(),
	},
	render: (args) => {
		const formRef = React.useRef<HTMLFormElement>(null);
		const [data, setData] = React.useState<[string, FormDataEntryValue][]>([]);

		const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
			const formData = new FormData(e.currentTarget);
			const nextState = [...formData.entries()];

			args.handleFormChange({ formData: nextState });
			setData(nextState);
		};

		return (
			<View paddingTop={10} gap={4}>
				<form onChange={handleChange} ref={formRef}>
					<Slider
						range
						minName="slider-min"
						maxName="slider-max"
						defaultMinValue={30}
						defaultMaxValue={50}
					/>
				</form>

				{data.map((v) => v.join(": ")).join(", ")}
			</View>
		);
	},
	play: async () => {
		/**
		 * Placeholder
		 *
		 * No way to test dragging here without calling fireEvent.change
		 * Which defeats the purpose of testing custom emitted events
		 *
		 * Test this behavior manually in Storybook by dragging the thumbs
		 */
	},
};

export const testSwipe = {
	name: "test: prevents parent swipe",
	render: () => {
		const toggle = useToggle(true);

		return (
			<Modal active={toggle.active} onClose={toggle.deactivate} position="end">
				<View gap={4}>
					<Modal.Title>Modal</Modal.Title>
					<Slider name="slider" defaultValue={30} />
				</View>
			</Modal>
		);
	},
};
