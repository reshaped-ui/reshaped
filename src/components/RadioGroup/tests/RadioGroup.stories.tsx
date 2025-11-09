import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Radio from "components/Radio";
import RadioGroup from "components/RadioGroup";

export default {
	title: "Components/RadioGroup",
	component: RadioGroup,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/radio",
		},
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<RadioGroup name="test-name" value="1" onChange={args.handleChange}>
			{/* checked should be ignored */}
			<Radio value="1" checked={false}>
				Content
			</Radio>

			<Radio value="2">Content 2</Radio>
		</RadioGroup>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("radio");

		expect(inputs[0]).toBeChecked();

		await userEvent.click(inputs[1]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2",
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
		<RadioGroup name="test-name" defaultValue="1" onChange={args.handleChange}>
			{/* checked should be ignored */}
			<Radio value="1" checked={false}>
				Content
			</Radio>

			<Radio value="2">Content 2</Radio>
		</RadioGroup>
	),
	play: async ({ canvas, args }) => {
		const inputs = canvas.getAllByRole("radio");

		expect(inputs[0]).toBeChecked();

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

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<RadioGroup name="test-name" disabled>
			<Radio value="test-value">Content</Radio>
		</RadioGroup>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("radio");

		expect(input).toBeDisabled();
	},
};
