import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, waitFor } from "storybook/test";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import FormControl from "@/components/FormControl";
import NumberField from "@/components/NumberField";
import PinField from "@/components/PinField";
import Radio from "@/components/Radio";
import RadioGroup from "@/components/RadioGroup";
import Select from "@/components/Select";
import Slider from "@/components/Slider";
import Switch from "@/components/Switch";
import TextArea from "@/components/TextArea";
import TextField from "@/components/TextField";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";
import IconCheckmark from "@/icons/Checkmark";

export default {
	title: "Utility components/FormControl",
	component: FormControl,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/form-control",
		},
	},
};

export const status: StoryObj = {
	name: "status",
	render: () => (
		<Example>
			<Example.Item title="status: default">
				<FormControl>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>
			</Example.Item>

			<Example.Item title="status: error">
				<FormControl hasError>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const inputs = canvas.getAllByRole("textbox");

		expect(inputs[0]).toHaveAccessibleName("Label");
		expect(inputs[0]).toHaveAccessibleDescription("Caption");

		expect(inputs[1]).toHaveAccessibleName("Label");
		expect(inputs[1]).toHaveAccessibleDescription("Caption Error");
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: medium">
				<FormControl size="medium">
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>

			<Example.Item title="size: large">
				<FormControl size="large">
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" size="large" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<FormControl disabled>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toBeDisabled();
	},
};

export const required = {
	name: "required",
	render: () => (
		<Example>
			<Example.Item title="required">
				<FormControl required>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const composition = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="horizontal">
				<FormControl>
					<View direction="row" gap={10} align="center">
						<View width="100px">
							<FormControl.Label>Label</FormControl.Label>
						</View>
						<View.Item grow>
							<TextField name="name" placeholder="Enter value" />
						</View.Item>
					</View>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<FormControl id="test-id" hasError>
			<FormControl.Label>Label</FormControl.Label>
			<TextField name="name" />
			<FormControl.Helper>Caption</FormControl.Helper>
			<FormControl.Error>Error</FormControl.Error>
		</FormControl>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		const label = canvas.getByText("Label");

		expect(input).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("aria-describedby", `test-id-caption test-id-error`);

		expect(label).toHaveAttribute("for", "test-id");
		expect(label).toHaveAttribute("id", `test-id-label`);
	},
};

export const group: StoryObj = {
	name: "group, gap",
	render: () => (
		<FormControl group gap={2}>
			<FormControl.Label>Label</FormControl.Label>
			<RadioGroup name="name">
				<View gap={2}>
					<Radio value="1">One</Radio>
					<Radio value="2">Two</Radio>
				</View>
			</RadioGroup>
			<FormControl.Helper>Caption</FormControl.Helper>
		</FormControl>
	),
	play: async ({ canvas }) => {
		const group = canvas.getByRole("group");
		const radios = canvas.getAllByRole("radio");

		expect(group).toHaveAccessibleDescription("Caption");

		// Group fields don't receive the FormControl attributes
		radios.forEach((radio) => {
			expect(radio).not.toHaveAttribute("id");
			expect(radio).not.toHaveAttribute("aria-describedby");
		});
	},
};

export const testCaptions: StoryObj = {
	name: "test: captions",
	render: () => {
		const [hasError, setHasError] = React.useState(true);

		return (
			<View gap={4}>
				<FormControl hasError={hasError}>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>

				<FormControl>
					<FormControl.Label>Label 2</FormControl.Label>
					<TextField name="name-2" />
				</FormControl>

				<Button onClick={() => setHasError((prev) => !prev)}>Toggle error</Button>
			</View>
		);
	},
	play: async ({ canvas }) => {
		const [input, inputWithoutCaptions] = canvas.getAllByRole("textbox");
		const helper = canvas.getByText("Caption");
		const error = canvas.getByText("Error");

		// Only errors are announced and they shouldn't interrupt the user
		expect(helper).not.toHaveAttribute("role");
		expect(helper).not.toHaveAttribute("aria-live");
		expect(error).not.toHaveAttribute("role");
		expect(error).toHaveAttribute("aria-live", "polite");
		expect(input).toHaveAccessibleDescription("Caption Error");

		await userEvent.click(canvas.getByRole("button", { name: "Toggle error" }));

		await waitFor(() => {
			expect(canvas.queryByText("Error")).not.toBeInTheDocument();
		});
		expect(input).toHaveAttribute("aria-describedby", `${input.id}-caption`);

		expect(inputWithoutCaptions).not.toHaveAttribute("aria-describedby");
	},
};

export const testInputAttributes: StoryObj = {
	name: "test: icon label",
	render: () => (
		<FormControl>
			<FormControl.Label>Label</FormControl.Label>
			<TextField name="name" icon={IconCheckmark} />
			<FormControl.Helper>Caption</FormControl.Helper>
		</FormControl>
	),
	play: async ({ canvas, canvasElement }) => {
		const input = canvas.getByRole("textbox");
		const iconLabel = canvasElement.querySelector(`label[for="${input.id}"]:not([id])`);

		expect(input).toHaveAccessibleName("Label");
		expect(input).toHaveAccessibleDescription("Caption");
		expect(iconLabel).toBeInTheDocument();
	},
};

export const testErrorRequired: StoryObj = {
	name: "test: hasError, required",
	render: () => (
		<View gap={4}>
			<FormControl hasError required>
				<FormControl.Label>TextField</FormControl.Label>
				<TextField name="text-field" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>TextArea</FormControl.Label>
				<TextArea name="text-area" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>NumberField</FormControl.Label>
				<NumberField
					name="number-field"
					increaseAriaLabel="Increase"
					decreaseAriaLabel="Decrease"
				/>
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>PinField</FormControl.Label>
				<PinField name="pin-field" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Select</FormControl.Label>
				<Select name="select">
					<option value="1">One</option>
				</Select>
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Custom Select</FormControl.Label>
				<Select name="custom-select" placeholder="Select">
					<Select.Option value="1">One</Select.Option>
				</Select>
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Switch</FormControl.Label>
				<Switch name="switch" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Checkbox</FormControl.Label>
				<Checkbox name="checkbox" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Radio</FormControl.Label>
				<Radio name="radio" value="1" />
			</FormControl>
			<FormControl hasError required>
				<FormControl.Label>Slider</FormControl.Label>
				<Slider name="slider" defaultValue={10} />
			</FormControl>
		</View>
	),
	play: async ({ canvas }) => {
		const names = [
			"TextField",
			"TextArea",
			"NumberField",
			"PinField",
			"Select",
			"Switch",
			"Checkbox",
			"Radio",
			"Slider",
		];

		names.forEach((name) => {
			const input = canvas.getByLabelText(name);

			expect(input).toHaveAttribute("aria-invalid", "true");
			expect(input).toHaveAttribute("aria-required", "true");
		});

		expect(canvas.getByRole("button", { name: /Select/ })).toHaveAttribute("aria-invalid", "true");
	},
};

export const testSingleCheckbox: StoryObj = {
	name: "test: single checkbox, radio, slider",
	render: () => (
		<View gap={4}>
			<FormControl>
				<FormControl.Label>Checkbox label</FormControl.Label>
				<Checkbox name="checkbox">Checkbox</Checkbox>
				<FormControl.Helper>Checkbox caption</FormControl.Helper>
			</FormControl>
			<FormControl>
				<FormControl.Label>Radio label</FormControl.Label>
				<Radio name="radio" value="1">
					Radio
				</Radio>
				<FormControl.Helper>Radio caption</FormControl.Helper>
			</FormControl>
			<FormControl>
				<FormControl.Label>Slider label</FormControl.Label>
				<Slider name="slider" defaultValue={10} />
				<FormControl.Helper>Slider caption</FormControl.Helper>
			</FormControl>
			<FormControl>
				<FormControl.Label>Range label</FormControl.Label>
				<Slider name="range" range defaultMinValue={10} defaultMaxValue={20} />
				<FormControl.Helper>Range caption</FormControl.Helper>
			</FormControl>
		</View>
	),
	play: async ({ canvas }) => {
		const checkbox = canvas.getByRole("checkbox");
		const radio = canvas.getByRole("radio");
		const [slider, rangeMin, rangeMax] = canvas.getAllByRole("slider");

		expect(checkbox).toHaveAccessibleName(expect.stringContaining("Checkbox label"));
		expect(checkbox).toHaveAccessibleDescription("Checkbox caption");
		expect(radio).toHaveAccessibleName(expect.stringContaining("Radio label"));
		expect(radio).toHaveAccessibleDescription("Radio caption");

		expect(slider).toHaveAccessibleName("Slider label");
		expect(slider).toHaveAccessibleDescription("Slider caption");
		expect(rangeMin).toHaveAccessibleName("Range label");
		expect(rangeMin).toHaveAccessibleDescription("Range caption");
		expect(rangeMax).not.toHaveAttribute("id");
		expect(rangeMax).toHaveAccessibleDescription("Range caption");
	},
};

export const testPinField: StoryObj = {
	name: "test: PinField disabled",
	render: () => (
		<FormControl disabled>
			<FormControl.Label>Label</FormControl.Label>
			<PinField name="pin" defaultValue="12" />
		</FormControl>
	),
	play: async ({ canvas, canvasElement }) => {
		const input = canvas.getByRole("textbox");
		const items = canvasElement.querySelectorAll('[aria-hidden="true"]');

		expect(input).toBeDisabled();
		expect(input).toHaveAccessibleName("Label");
		expect(items).toHaveLength(4);
	},
};
