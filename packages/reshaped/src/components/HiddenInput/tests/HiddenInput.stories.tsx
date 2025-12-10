import { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";

import Badge from "components/Badge";
import CheckboxGroup from "components/CheckboxGroup";
import FormControl from "components/FormControl";
import HiddenInput from "components/HiddenInput";
import RadioGroup from "components/RadioGroup";
import View from "components/View";
import Example from "utilities/storybook/Example";

export default {
	title: "Utility components/HiddenInput",
	component: HiddenInput,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-input",
		},
	},
};

export const typeCheckbox: StoryObj = {
	name: "type",
	render: () => (
		<>
			<HiddenInput type="checkbox" name="test-checkbox-name" value="test-checkbox-value" />
			<HiddenInput type="radio" name="test-radio-name" value="test-radio-value" />
		</>
	),
	play: async ({ canvas }) => {
		const inputCheckbox = canvas.getByRole("checkbox");
		const inputRadio = canvas.getByRole("radio");

		expect(inputCheckbox).toHaveAttribute("type", "checkbox");
		expect(inputCheckbox).toHaveAttribute("name", "test-checkbox-name");
		expect(inputCheckbox).toHaveAttribute("value", "test-checkbox-value");
		expect(inputCheckbox).not.toBeChecked();

		expect(inputRadio).toHaveAttribute("type", "radio");
		expect(inputRadio).toHaveAttribute("name", "test-radio-name");
		expect(inputRadio).toHaveAttribute("value", "test-radio-value");
		expect(inputRadio).not.toBeChecked();
	},
};

export const checked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "checked, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<HiddenInput
			type="checkbox"
			name="test-name"
			value="test-value"
			checked
			onChange={args.handleChange}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});

		expect(input).toBeChecked();
	},
};

export const defaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<HiddenInput
			type="checkbox"
			name="test-name"
			value="test-value"
			defaultChecked
			onChange={args.handleChange}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});

		// Now unchecked because it's uncontrolled
		expect(input).not.toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => <HiddenInput type="checkbox" name="test-name" value="test-value" disabled />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeDisabled();
	},
};

export const onFocus: StoryObj<{ handleFocus: ReturnType<typeof fn> }> = {
	name: "onFocus",
	args: {
		handleFocus: fn(),
	},
	render: (args) => (
		<HiddenInput type="checkbox" name="test-name" value="test-value" onFocus={args.handleFocus} />
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		await userEvent.click(input);

		expect(args.handleFocus).toHaveBeenCalledTimes(1);
		expect(args.handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	},
};

export const onBlur: StoryObj<{ handleBlur: ReturnType<typeof fn> }> = {
	name: "onBlur",
	args: {
		handleBlur: fn(),
	},
	render: (args) => (
		<div>
			<HiddenInput type="checkbox" name="test-name" value="test-value" onBlur={args.handleBlur} />
			<button type="button">Other element</button>
		</div>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");
		const [button] = canvas.getAllByRole("button");

		await userEvent.click(input);
		await userEvent.click(button);

		expect(args.handleBlur).toHaveBeenCalledTimes(1);
		expect(args.handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<HiddenInput type="checkbox" className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toHaveClass("test-classname");
		expect(input).toHaveAttribute("id", "test-id");
	},
};

export const attributesHandlers: StoryObj<{
	handleFocus: ReturnType<typeof fn>;
	handleBlur: ReturnType<typeof fn>;
}> = {
	name: "attributes: onFocus, onBlur",
	args: {
		handleFocus: fn(),
		handleBlur: fn(),
	},
	render: (args) => (
		<div>
			<HiddenInput
				type="checkbox"
				name="test-name"
				value="test-value"
				attributes={{
					onFocus: args.handleFocus,
					onBlur: args.handleBlur,
				}}
			/>
			<button type="button">Other element</button>
		</div>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");
		const [button] = canvas.getAllByRole("button");

		await userEvent.click(input);

		expect(args.handleFocus).toHaveBeenCalledTimes(1);
		expect(args.handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input }));

		await userEvent.click(button);

		expect(args.handleBlur).toHaveBeenCalledTimes(1);
		expect(args.handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
	},
};

export const checkboxGroup: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "test: checkboxGroup",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<CheckboxGroup name="test-name" onChange={args.handleChange} value={["1"]}>
			<HiddenInput type="checkbox" value="1" />
			<HiddenInput type="checkbox" value="2" />
		</CheckboxGroup>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("checkbox");

		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).not.toBeChecked();

		await userEvent.click(inputs[1]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: ["1", "2"],
			event: expect.objectContaining({ target: inputs[1] }),
		});

		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).toBeChecked();
	},
};

export const radioGroup: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "test: radioGroup",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<RadioGroup name="test-name" onChange={args.handleChange} defaultValue="1">
			<HiddenInput type="radio" value="1" />
			<HiddenInput type="radio" value="2" />
		</RadioGroup>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("radio");

		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).not.toBeChecked();

		await userEvent.click(inputs[1]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2",
			event: expect.objectContaining({ target: inputs[1] }),
		});

		expect(inputs[0]).not.toBeChecked();
		expect(inputs[1]).toBeChecked();
	},
};

export const formControl: StoryObj = {
	name: "test: formControl",
	render: () => (
		<FormControl disabled>
			<HiddenInput type="radio" value="1" />
		</FormControl>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("radio");

		expect(input).toBeDisabled();
	},
};

export const composition: StoryObj = {
	name: "test: composition",
	render: () => {
		const [checkboxValue, setCheckboxValue] = useState<string[]>(["React"]);
		const [radioValue, setRadioValue] = useState<string>("React");

		const options = ["React", "Vue", "Angular", "Svelte"];

		return (
			<Example>
				<Example.Item title="CheckboxGroup">
					<CheckboxGroup
						name="categories"
						value={checkboxValue}
						onChange={(args) => setCheckboxValue(args.value)}
					>
						<View gap={2} direction="row">
							{options.map((option) => (
								<Badge
									as="label"
									color={checkboxValue.includes(option) ? "primary" : "neutral"}
									key={option}
								>
									{option}
									<HiddenInput type="checkbox" value={option} />
								</Badge>
							))}
						</View>
					</CheckboxGroup>
				</Example.Item>
				<Example.Item title="RadioGroup">
					<RadioGroup
						name="categories"
						value={radioValue}
						onChange={(args) => setRadioValue(args.value)}
					>
						<View gap={2} direction="row">
							{options.map((option) => (
								<Badge
									as="label"
									color={radioValue === option ? "primary" : "neutral"}
									key={option}
								>
									{option}
									<HiddenInput type="radio" value={option} />
								</Badge>
							))}
						</View>
					</RadioGroup>
				</Example.Item>
			</Example>
		);
	},
};
