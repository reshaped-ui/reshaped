import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import FormControl from "@/components/FormControl";
import NumberField from "@/components/NumberField";
import { Example } from "@/utilities/storybook";

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
		const [increaseButton, decreaseButton] = canvas.getAllByRole("button");

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

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<NumberField
			name="test-name"
			increaseAriaLabel="Increase"
			decreaseAriaLabel="Decrease"
			disabled
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toBeDisabled();
		expect(canvas.getByLabelText("Increase")).toHaveAttribute("aria-disabled", "true");
		expect(canvas.getByLabelText("Decrease")).toHaveAttribute("aria-disabled", "true");
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
