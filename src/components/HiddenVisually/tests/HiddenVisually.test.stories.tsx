import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import HiddenVisually from "components/HiddenVisually";

export default {
	title: "Utilities/HiddenVisually/tests",
	component: HiddenVisually,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-visually",
		},
	},
};

export const children: StoryObj = {
	name: "children",
	render: () => <HiddenVisually>Content</HiddenVisually>,
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const el = canvas.getByText("Content");

		expect(el).toBeInTheDocument(0);
	},
};
