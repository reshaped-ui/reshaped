import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Icon from "components/Icon";
import IconZap from "icons/Zap";

export default {
	title: "Utility components/Icon/tests",
	component: Icon,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/icon",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const render: StoryObj = {
	name: "render, hidden from sr",
	render: () => (
		<div data-testid="root">
			<Icon svg={IconZap} />
		</div>
	),
	play: ({ canvas }) => {
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
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
