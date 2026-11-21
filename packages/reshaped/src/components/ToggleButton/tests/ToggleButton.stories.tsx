import { type StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Example } from "@/utilities/storybook";
import ToggleButton from "../ToggleButton";

export default {
	title: "Components/ToggleButton",
	component: ToggleButton,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toggle-button",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="outline">
				<ToggleButton>Button</ToggleButton>
			</Example.Item>
			<Example.Item title="ghost">
				<ToggleButton variant="ghost">Button</ToggleButton>
			</Example.Item>
		</Example>
	),
};

export const selectedColor = {
	name: "selectedColor, selectedVariant",
	render: () => (
		<Example>
			<Example.Item title="selectedColor: primary">
				<ToggleButton selectedColor="primary" defaultChecked>
					Button
				</ToggleButton>
			</Example.Item>
			<Example.Item title="selectedVariant: solid">
				<ToggleButton selectedVariant="solid" defaultChecked>
					Button
				</ToggleButton>
			</Example.Item>
		</Example>
	),
};

export const checked: StoryObj = {
	name: "checked, defaultChecked",
	render: () => (
		<Example>
			<Example.Item title="defaultChecked">
				<ToggleButton defaultChecked value="1">
					Button
				</ToggleButton>
			</Example.Item>
			<Example.Item title="checked">
				<ToggleButton checked value="2">
					Button
				</ToggleButton>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByText("Button");

		buttons.forEach((button) =>
			expect(button.closest("[aria-pressed]")).toHaveAttribute("aria-pressed", "true")
		);
	},
};
