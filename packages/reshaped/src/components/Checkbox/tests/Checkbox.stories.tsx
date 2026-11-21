import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Checkbox from "@/components/Checkbox";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/checkbox",
		},
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
