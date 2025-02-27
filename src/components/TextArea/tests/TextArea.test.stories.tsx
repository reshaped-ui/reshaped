import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import TextArea from "components/TextArea";

export default {
	title: "Components/TextArea/tests",
	component: TextArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-area",
		},
	},
};

export const render: StoryObj = {
	name: "base",
	render: () => <TextArea name="test-name" inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveAttribute("name", "test-name");
		expect(input).toHaveAccessibleName("Label");
	},
};

export const placeholder: StoryObj = {
	name: "placeholder",
	render: () => (
		<TextArea
			name="test-name"
			placeholder="Placeholder"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("");
		expect(input).toHaveAttribute("placeholder", "Placeholder");
	},
};

export const id: StoryObj = {
	name: "id",
	render: () => (
		<TextArea name="test-name" id="test-id" inputAttributes={{ "aria-label": "Label" }} />
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		expect(input).toHaveAttribute("id", "test-id");
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => <TextArea name="test-name" disabled inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		expect(input).toBeDisabled();
	},
};

export const defaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<TextArea
			name="test-name"
			defaultValue="value"
			onChange={args.handleChange}
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("value");

		input.focus();
		await userEvent.keyboard("2");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("2value");
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<TextArea
			name="test-name"
			value="value"
			onChange={args.handleChange}
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("value");

		input.focus();
		await userEvent.keyboard("2");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("value");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<TextArea
				className="test-classname"
				attributes={{ id: "test-id" }}
				name="name"
				inputAttributes={{ id: "test-input-id", "aria-label": "Label" }}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.getByRole("textbox");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};
