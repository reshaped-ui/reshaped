import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import { sleep } from "utilities/helpers";

export default {
	title: "Components/DropdownMenu/tests",
	component: DropdownMenu,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/dropdown-menu",
		},
		chromatic: { disableSnapshot: true },
	},
};
