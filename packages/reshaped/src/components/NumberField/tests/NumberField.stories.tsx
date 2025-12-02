import { StoryObj } from "@storybook/react-vite";
import { expect, fn, Mock, userEvent } from "storybook/test";

import FormControl from "components/FormControl";
import NumberField from "components/NumberField";
import { Example } from "utilities/storybook";

export default {
	title: "Components/NumberField",
	component: NumberField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/number-field",
		},
	},
};

export const variant: StoryObj = {
	name: "variant",
	render: () => {
		return (
			<Example>
				<Example.Item title="variant: outline">
					<NumberField
						name="test-name"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
				<Example.Item title="variant: faded">
					<NumberField
						variant="faded"
						name="test-name"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
				<Example.Item title="variant: headless">
					<NumberField
						variant="headless"
						name="test-name"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const input = canvas.getAllByRole("textbox")[0];
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

		expect(input).toHaveAttribute("name", "test-name");
		expect(increaseButton).toHaveAccessibleName("Increase");
		expect(decreaseButton).toHaveAccessibleName("Decrease");
	},
};

export const size: StoryObj = {
	name: "size",
	render: () => {
		return (
			<Example>
				<Example.Item title="size: small">
					<NumberField
						size="small"
						name="test-name"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						suffix="m2"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
				<Example.Item title="size: medium">
					<NumberField
						size="medium"
						name="test-name"
						suffix="m2"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
				<Example.Item title="size: large">
					<NumberField
						size="large"
						name="test-name"
						suffix="m2"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
				<Example.Item title="size: xlarge">
					<NumberField
						size="xlarge"
						name="test-name"
						suffix="m2"
						increaseAriaLabel="Increase"
						decreaseAriaLabel="Decrease"
						inputAttributes={{ "aria-label": "Label" }}
					/>
				</Example.Item>
			</Example>
		);
	},
};

export const disabled: StoryObj<{ handleChange: Mock }> = {
	name: "disabled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<NumberField
			name="test-name"
			onChange={args.handleChange}
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			disabled
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");
		const increaseButton = document.querySelector('[aria-label="Increase"]')!;
		const decreaseButton = document.querySelector('[aria-label="Decrease"]')!;

		expect(input).toBeDisabled();

		await userEvent.click(increaseButton);
		expect(args.handleChange).not.toHaveBeenCalled();

		await userEvent.click(decreaseButton);
		expect(args.handleChange).not.toHaveBeenCalled();
	},
};

export const defaultValue: StoryObj<{ handleChange: Mock }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<NumberField
			name="test-name"
			defaultValue={2}
			onChange={args.handleChange}
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

		expect(input).toHaveValue("2");

		input.focus();
		await userEvent.keyboard("3");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 23,
		});
		expect(input).toHaveValue("23");

		await userEvent.click(increaseButton);

		expect(args.handleChange).toBeCalledTimes(2);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 24,
		});
		expect(input).toHaveValue("24");

		await userEvent.click(decreaseButton);

		expect(args.handleChange).toBeCalledTimes(3);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 23,
		});
		expect(input).toHaveValue("23");
	},
};

export const value: StoryObj<{ handleChange: Mock }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<NumberField
			name="test-name"
			value={2}
			onChange={args.handleChange}
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

		expect(input).toHaveValue("2");

		input.focus();
		await userEvent.keyboard("3");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 23,
		});
		expect(input).toHaveValue("23");

		await userEvent.click(increaseButton);

		expect(args.handleChange).toBeCalledTimes(2);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 24,
		});
		expect(input).toHaveValue("23");

		await userEvent.click(decreaseButton);

		expect(args.handleChange).toBeCalledTimes(3);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			name: "test-name",
			value: 22,
		});
		expect(input).toHaveValue("23");
	},
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => (
		<NumberField
			name="test-name"
			defaultValue={6}
			min={5}
			max={10}
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

		expect(input).toHaveValue("6");

		await userEvent.click(increaseButton);
		await userEvent.click(increaseButton);
		await userEvent.click(increaseButton);
		await userEvent.click(increaseButton);
		await userEvent.click(increaseButton);

		expect(input).toHaveValue("10");

		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);

		expect(input).toHaveValue("5");
	},
};

export const step: StoryObj = {
	name: "step",
	render: () => (
		<NumberField
			name="test-name"
			defaultValue={6}
			step={0.5}
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

		expect(input).toHaveValue("6");

		await userEvent.click(increaseButton);
		expect(input).toHaveValue("6.5");

		await userEvent.click(decreaseButton);
		await userEvent.click(decreaseButton);
		expect(input).toHaveValue("5.5");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<NumberField
				className="test-classname"
				attributes={{ id: "test-id" }}
				name="name"
				inputAttributes={{ id: "test-input-id", "aria-label": "Label" }}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
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

export const formControl: StoryObj = {
	name: "test: FormControl",
	render: () => (
		<Example>
			<Example.Item title="FormControl">
				<FormControl>
					<FormControl.Label>Label</FormControl.Label>
					<NumberField name="name" increaseAriaLabel="Increase" decreaseAriaLabel="Decrease" />
					<FormControl.Helper>Helper</FormControl.Helper>
				</FormControl>
			</Example.Item>

			<Example.Item title="FormControl, disabled">
				<FormControl disabled>
					<FormControl.Label>Label</FormControl.Label>
					<NumberField name="name" increaseAriaLabel="Increase" decreaseAriaLabel="Decrease" />
					<FormControl.Helper>Helper</FormControl.Helper>
				</FormControl>
			</Example.Item>

			<Example.Item title="FormControl, error">
				<FormControl hasError>
					<FormControl.Label>Label</FormControl.Label>
					<NumberField name="name" increaseAriaLabel="Increase" decreaseAriaLabel="Decrease" />
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const valueChanges: StoryObj = {
	name: "test: keyboard",
	render: () => (
		<Example>
			<Example.Item title="keyboard">
				<NumberField
					name="name"
					increaseAriaLabel="Increase"
					decreaseAriaLabel="Decrease"
					inputAttributes={{ "aria-label": "Label" }}
				/>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		input.focus();

		await userEvent.keyboard("-");
		expect(input).toHaveValue("-");

		await userEvent.keyboard("1");
		expect(input).toHaveValue("-1");

		await userEvent.keyboard("-");
		expect(input).toHaveValue("-1");

		await userEvent.keyboard("2");
		expect(input).toHaveValue("-12");

		await userEvent.keyboard("{ArrowUp}");
		expect(input).toHaveValue("-11");

		await userEvent.keyboard("{ArrowDown}");
		expect(input).toHaveValue("-12");

		await userEvent.keyboard(".");
		expect(input).toHaveValue("-12.");

		await userEvent.keyboard("3");
		expect(input).toHaveValue("-12.3");

		await userEvent.keyboard(".");
		expect(input).toHaveValue("-12.3");

		await userEvent.keyboard("-");
		expect(input).toHaveValue("-12.3");

		await userEvent.keyboard("{ArrowUp}");
		await userEvent.keyboard("{ArrowUp}");
		await userEvent.keyboard("{ArrowUp}");
		await userEvent.keyboard("{ArrowUp}");
		await userEvent.keyboard("{ArrowUp}");
		expect(input).toHaveValue("-7.3");

		await userEvent.keyboard("{ArrowDown}");
		expect(input).toHaveValue("-8.3");
	},
};

// Value change edge cases
