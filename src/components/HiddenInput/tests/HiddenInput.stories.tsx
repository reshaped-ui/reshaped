import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import HiddenInput from "components/HiddenInput";
import { Example } from "utilities/storybook";

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
		<Example>
			<Example.Item title="type: checkbox">
				<HiddenInput type="checkbox" name="test-checkbox-name" value="test-checkbox-value" />
			</Example.Item>
			<Example.Item title="type: radio">
				<HiddenInput type="radio" name="test-radio-name" value="test-radio-value" />
			</Example.Item>
		</Example>
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
		expect(args.handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: input }));

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
		expect(args.handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: input }));

		// Now unchecked because it's uncontrolled
		expect(input).not.toBeChecked();
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<HiddenInput type="checkbox" name="test-name" value="test-value" disabled />
			</Example.Item>
		</Example>
	),
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
