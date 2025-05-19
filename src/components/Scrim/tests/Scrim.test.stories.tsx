import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Scrim from "components/Scrim";

export default {
	title: "Components/Scrim/tests",
	component: Scrim,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/scrim",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Scrim className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</Scrim>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
