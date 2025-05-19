import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, fn } from "storybook/test";
import Checkbox from "components/Checkbox";

export default {
	title: "Components/Checkbox/tests",
	component: Checkbox,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/checkbox",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const render: StoryObj = {
	name: "name, value",
	render: () => (
		<Checkbox name="test-name" value="test-value">
			Content
		</Checkbox>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toHaveAttribute("value", "test-value");
		expect(input).toHaveAttribute("name", "test-name");
		expect(input).not.toBeChecked();
	},
};

export const checked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "checked, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Checkbox name="test-name" value="test-value" checked onChange={args.handleChange}>
			Content
		</Checkbox>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox") as HTMLInputElement;

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});

		// Still checked because it's controlled
		expect(input).toBeChecked();
	},
};

export const defaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Checkbox name="test-name" value="test-value" defaultChecked onChange={args.handleChange}>
			Content
		</Checkbox>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox") as HTMLInputElement;

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});

		expect(input).not.toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Checkbox name="test-name" value="test-value" disabled>
			Content
		</Checkbox>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox") as HTMLInputElement;

		expect(input).toBeDisabled();
	},
};

export const indeterminate: StoryObj = {
	name: "indeterminate",
	render: () => (
		<Checkbox name="test-name" value="test-value" indeterminate>
			Content
		</Checkbox>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox") as HTMLInputElement;

		expect(input.indeterminate).toBeTruthy();

		await userEvent.click(input);

		expect(input.indeterminate).toBeFalsy();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Checkbox className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</Checkbox>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
