import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import Icon from "components/Icon";
import IconZap from "icons/Zap";

export default {
	title: "Utilities/Icon/tests",
	component: Icon,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/icon",
		},
	},
};

export const render: StoryObj = {
	name: "render, hidden from sr",
	render: () => (
		<div data-testid="root">
			<Icon svg={IconZap} />
		</div>
	),
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toBeInTheDocument();
		expect(root).toHaveAttribute("aria-hidden");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Icon svg={IconZap} className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
