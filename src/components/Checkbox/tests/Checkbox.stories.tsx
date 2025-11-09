import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Checkbox from "components/Checkbox";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/checkbox",
		},
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

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={4} direction="row">
					<Checkbox name="animal" value="dog" size="small" defaultChecked>
						Checkbox
					</Checkbox>
					<Checkbox name="animal" value="dog" size="small" indeterminate>
						Checkbox
					</Checkbox>
				</View>
			</Example.Item>
			<Example.Item title="size: medium">
				<View gap={4} direction="row">
					<Checkbox name="animal" value="dog" size="medium" defaultChecked>
						Checkbox
					</Checkbox>
					<Checkbox name="animal" value="dog" size="medium" indeterminate>
						Checkbox
					</Checkbox>
				</View>
			</Example.Item>
			<Example.Item title="size: large">
				<View gap={4} direction="row">
					<Checkbox name="animal" value="dog" size="large" defaultChecked>
						Checkbox
					</Checkbox>
					<Checkbox name="animal" value="dog" size="large" indeterminate>
						Checkbox
					</Checkbox>
				</View>
			</Example.Item>
			<Example.Item title="size: responsive, s: small, m: large">
				<View gap={4} direction="row">
					<Checkbox name="animal" value="dog" size={{ s: "small", m: "large" }} defaultChecked>
						Checkbox
					</Checkbox>
				</View>
			</Example.Item>
		</Example>
	),
};

export const error = {
	name: "hasError",
	render: () => (
		<Example>
			<Example.Item title="error">
				<Checkbox name="animal" value="dog" hasError>
					Checkbox
				</Checkbox>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<Checkbox name="animal" value="dog" disabled>
					Checkbox
				</Checkbox>
			</Example.Item>
			<Example.Item title="disabled, checked">
				<Checkbox name="animal" value="dog" disabled checked>
					Checkbox
				</Checkbox>
			</Example.Item>
			<Example.Item title="disabled, indeterminate">
				<Checkbox name="animal" value="dog" disabled indeterminate>
					Checkbox
				</Checkbox>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const [input] = canvas.getAllByRole("checkbox");

		expect(input).toBeDisabled();
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
