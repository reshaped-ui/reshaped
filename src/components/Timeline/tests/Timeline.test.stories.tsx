import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Timeline from "components/Timeline";

export default {
	title: "Components/Timeline/tests",
	component: Timeline,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/timeline",
		},
		chromatic: { disableSnapshot: true },
	},
};
