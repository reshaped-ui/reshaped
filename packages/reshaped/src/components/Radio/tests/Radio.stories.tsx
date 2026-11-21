import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Radio from "@/components/Radio";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Radio",
	component: Radio,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/radio",
		},
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={4} direction="row">
					<Radio name="animal" value="dog" size="small" defaultChecked>
						Radio
					</Radio>
				</View>
			</Example.Item>
			<Example.Item title="size: medium">
				<View gap={4} direction="row">
					<Radio name="animal" value="dog" size="medium">
						Radio
					</Radio>
				</View>
			</Example.Item>
			<Example.Item title="size: large">
				<View gap={4} direction="row">
					<Radio name="animal" value="dog" size="large">
						Radio
					</Radio>
				</View>
			</Example.Item>
			<Example.Item title="size: responsive, s: small, m: large">
				<View gap={4} direction="row">
					<Radio name="animal" value="dog" size={{ s: "small", m: "large" }}>
						Radio
					</Radio>
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
				<Radio name="error" value="dog" hasError>
					Radio
				</Radio>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<Radio name="disabled" value="dog" disabled>
					Radio
				</Radio>
			</Example.Item>
			<Example.Item title="disabled, checked">
				<Radio name="disabled-checked" value="dog" disabled checked>
					Radio
				</Radio>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const inputs = canvas.getAllByRole("radio");

		inputs.forEach((input) => expect(input).toBeDisabled());
	},
};
