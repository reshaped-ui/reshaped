import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Hidden from "components/Hidden";

export default {
	title: "Utilities/Hidden/tests",
	component: Hidden,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden",
		},
	},
};

export const as: StoryObj = {
	name: "as",
	render: () => <Hidden as="span">Content</Hidden>,
	play: ({ canvas }) => {
		const el = canvas.getByText("Content");

		expect(el.tagName).toEqual("SPAN");
	},
};
