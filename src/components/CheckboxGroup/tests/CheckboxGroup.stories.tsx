import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Checkbox from "components/Checkbox";
import CheckboxGroup from "components/CheckboxGroup";
import View from "components/View";

export default {
	title: "Components/CheckboxGroup",
	component: CheckboxGroup,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/checkbox",
		},
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<View gap={2}>
			<CheckboxGroup name="test-name" value={["1"]} onChange={args.handleChange}>
				{/* checked should be ignored */}
				<Checkbox value="1" checked={false}>
					Content
				</Checkbox>

				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		</View>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("checkbox");

		expect(inputs[0]).toBeChecked();

		await userEvent.click(inputs[1]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: ["1", "2"],
			event: expect.objectContaining({ target: inputs[1] }),
		});

		// Still checked because it's controlled
		expect(inputs[0]).toBeChecked();
		expect(inputs[1]).not.toBeChecked();
	},
};

export const defaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<View gap={2}>
			<CheckboxGroup name="test-name" defaultValue={["1"]} onChange={args.handleChange}>
				{/* checked should be ignored */}
				<Checkbox value="1" checked={false}>
					Content
				</Checkbox>

				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		</View>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("checkbox");

		expect(inputs[0]).toBeChecked();

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

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<CheckboxGroup name="test-name" disabled>
			<Checkbox value="test-value">Item 1</Checkbox>
			<Checkbox value="test-value-2">Item 2</Checkbox>
		</CheckboxGroup>
	),
	play: async ({ canvas }) => {
		const [input] = canvas.getAllByRole("checkbox");

		expect(input).toBeDisabled();
	},
};
