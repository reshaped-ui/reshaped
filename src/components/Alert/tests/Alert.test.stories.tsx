import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import Alert from "components/Alert";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Components/Alert/tests",
	component: Alert,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/alert",
		},
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
