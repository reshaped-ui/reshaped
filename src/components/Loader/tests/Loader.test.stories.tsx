import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Loader from "components/Loader";

export default {
	title: "Components/Loader/tests",
	component: Loader,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/loader",
		},
		chromatic: { disableSnapshot: true },
	},
};
