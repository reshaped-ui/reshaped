import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import FormControl from "@/components/FormControl";
import PinField from "@/components/PinField";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/PinField",
	component: PinField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/pin-field",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<PinField name="pin" variant="faded" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<PinField name="pin" size="small" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: medium">
				<PinField name="pin" size="medium" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: large">
				<PinField name="pin" size="large" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: xlarge">
				<PinField name="pin" size="xlarge" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: responsive, s: medium, m+: xlarge">
				<PinField
					name="pin"
					size={{ s: "medium", m: "xlarge" }}
					inputAttributes={{ "aria-label": "Pin" }}
				/>
			</Example.Item>
		</Example>
	),
};

export const valueLength: StoryObj = {
	name: "valueLength",
	render: () => (
		<PinField name="test-name" valueLength={6} inputAttributes={{ "aria-label": "Label" }} />
	),
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole("textbox");

		expect(elInput).toHaveAttribute("maxlength", "6");
	},
};

export const formControl: StoryObj = {
	name: "test: with FormControl",
	render: () => (
		<FormControl>
			<FormControl.Label>Label</FormControl.Label>
			<PinField name="test-name" />
		</FormControl>
	),
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole("textbox");

		expect(elInput).toHaveAccessibleName("Label");
	},
};
