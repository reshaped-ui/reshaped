import { StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn } from "storybook/test";
import Link from "components/Link";

export default {
	title: "Components/Link/tests",
	component: Link,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
		chromatic: { disableSnapshot: true },
	},
};
