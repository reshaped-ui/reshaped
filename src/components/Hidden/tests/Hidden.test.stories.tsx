import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Hidden from "components/Hidden";

export default {
	title: "Utility components/Hidden/tests",
	component: Hidden,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden",
		},
		chromatic: { disableSnapshot: true },
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
