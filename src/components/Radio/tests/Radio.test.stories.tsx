import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, fn } from "storybook/test";
import Radio from "components/Radio";

export default {
	title: "Components/Radio/tests",
	component: Radio,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/radio",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const render: StoryObj = {
	name: "name, value",
	render: () => (
		<Radio name="test-name" value="test-value">
			Content
		</Radio>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("radio");

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
		<Radio name="test-name" value="test-value" checked onChange={args.handleChange}>
			Content
		</Radio>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("radio") as HTMLInputElement;

		expect(input).toBeChecked();
	},
};

export const checkedFalse: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "checked false, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Radio name="test-name" value="test-value" checked={false} onChange={args.handleChange}>
			Content
		</Radio>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("radio") as HTMLInputElement;

		expect(input).not.toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: true,
			event: expect.objectContaining({ target: input }),
		});

		// Still not checked because it's controlled
		expect(input).not.toBeChecked();
	},
};

export const defaultChecked: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Radio name="test-name" value="test-value" defaultChecked onChange={args.handleChange}>
			Content
		</Radio>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("radio") as HTMLInputElement;

		expect(input).toBeChecked();
	},
};

export const defaultCheckedFalse: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultChecked false, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Radio name="test-name" value="test-value" onChange={args.handleChange}>
			Content
		</Radio>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("radio") as HTMLInputElement;

		expect(input).not.toBeChecked();

		await userEvent.click(input);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: true,
			event: expect.objectContaining({ target: input }),
		});

		expect(input).toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Radio name="test-name" value="test-value" disabled>
			Content
		</Radio>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("radio") as HTMLInputElement;

		expect(input).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Radio className="test-classname" attributes={{ id: "test-id" }} value="value">
				Content
			</Radio>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
