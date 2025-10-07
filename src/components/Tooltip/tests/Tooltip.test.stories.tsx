import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within, waitFor } from "storybook/test";
import Tooltip from "components/Tooltip";
import Button from "components/Button";

export default {
	title: "Components/Tooltip/tests",
	component: Tooltip,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tooltip",
		},
		chromatic: { disableSnapshot: true },
	},
};
