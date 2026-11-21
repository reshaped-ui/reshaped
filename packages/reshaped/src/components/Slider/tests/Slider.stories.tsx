import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock } from "storybook/test";

import Modal from "@/components/Modal";
import Slider from "@/components/Slider";
import View from "@/components/View";
import useToggle from "@/hooks/useToggle";
import { Example } from "@/utilities/storybook";

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
	parameters: {
		chromatic: { disableSnapshot: true },
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
