import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Skeleton from "components/Skeleton";

export default {
	title: "Components/Skeleton/tests",
	component: Skeleton,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/skeleton",
		},
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Skeleton className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
