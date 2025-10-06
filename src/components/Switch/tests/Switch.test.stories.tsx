import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import Switch from "components/Switch";

export default {
	title: "Components/Switch/tests",
	component: Switch,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/switch",
		},
		chromatic: { disableSnapshot: true },
	},
};
