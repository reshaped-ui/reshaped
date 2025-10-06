import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Table from "components/Table";

export default {
	title: "Components/Table/tests",
	component: Table,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/table",
		},
		chromatic: { disableSnapshot: true },
	},
};
