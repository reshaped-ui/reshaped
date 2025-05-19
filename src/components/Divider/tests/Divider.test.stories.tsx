import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Divider from "components/Divider";

export default {
	title: "Components/Divider/tests",
	component: Divider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/divider",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const horizontal: StoryObj = {
	name: "orientation, horizontal",
	render: () => <Divider />,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("separator");

		expect(el).toHaveAttribute("aria-orientation", "horizontal");
	},
};

export const vertical: StoryObj = {
	name: "orientation, vertical",
	render: () => <Divider vertical />,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("separator");

		expect(el).toHaveAttribute("aria-orientation", "vertical");
	},
};

export const responsive: StoryObj = {
	name: "orientation, responsive",
	render: () => <Divider vertical={{ s: true, l: false }} />,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("separator");

		expect(el).not.toHaveAttribute("aria-orientation");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Divider className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
