import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import Switch from "components/Switch";

export default {
	title: "Components/Switch/tests",
	component: Switch,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/switch",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const defaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Switch name="test-name" defaultChecked onChange={args.handleChange}>
			Label
		</Switch>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});
		expect(input).not.toBeChecked();
	},
};

export const checked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "checked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Switch name="test-name" checked onChange={args.handleChange}>
			Label
		</Switch>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("checkbox");

		expect(input).toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Switch disabled name="name">
			Label
		</Switch>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("checkbox");
		expect(input).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Switch
				className="test-classname"
				attributes={{ id: "test-id" }}
				inputAttributes={{ "aria-label": "test select", id: "test-input-id" }}
				name="name"
			>
				Label
			</Switch>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.getByRole("checkbox");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};
