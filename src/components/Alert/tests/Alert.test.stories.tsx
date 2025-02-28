import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Alert from "components/Alert";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Components/Alert/tests",
	component: Alert,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/alert",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Alert className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</Alert>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
