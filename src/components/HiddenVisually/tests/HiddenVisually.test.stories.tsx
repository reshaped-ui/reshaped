import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import HiddenVisually from "components/HiddenVisually";

export default {
	title: "Utilities/HiddenVisually/tests",
	component: HiddenVisually,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-visually",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const children: StoryObj = {
	name: "children",
	render: () => <HiddenVisually>Content</HiddenVisually>,
	play: ({ canvas }) => {
		const el = canvas.getByText("Content");

		expect(el).toBeInTheDocument();
	},
};
