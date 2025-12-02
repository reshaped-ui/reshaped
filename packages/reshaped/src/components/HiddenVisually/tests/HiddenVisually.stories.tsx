import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import HiddenVisually from "components/HiddenVisually";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/HiddenVisually",
	component: HiddenVisually,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-visually",
		},
	},
};

export const visibility = {
	name: "visibility",
	render: () => (
		<Example>
			<Example.Item title="pronounced by screen readers">
				<HiddenVisually>Screen-reader only</HiddenVisually>
			</Example.Item>
		</Example>
	),
};

export const children: StoryObj = {
	name: "children",
	render: () => <HiddenVisually>Content</HiddenVisually>,
	play: ({ canvas }) => {
		const el = canvas.getByText("Content");

		expect(el).toBeInTheDocument();
	},
};
