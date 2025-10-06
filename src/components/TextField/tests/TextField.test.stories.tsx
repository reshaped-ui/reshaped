import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import TextField from "components/TextField";

export default {
	title: "Components/TextField/tests",
	component: TextField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-area",
		},
		chromatic: { disableSnapshot: true },
	},
};
