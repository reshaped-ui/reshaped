import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Stepper from "components/Stepper";

export default {
	title: "Components/Stepper/tests",
	component: Stepper,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/stepper",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Stepper className="test-classname" attributes={{ id: "test-id" }}>
				<Stepper.Item attributes={{ id: "test-item-id" }} className="test-item-classname" />
			</Stepper>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const item = root?.firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");

		expect(item).toHaveClass("test-item-classname");
		expect(item).toHaveAttribute("id", "test-item-id");
	},
};
