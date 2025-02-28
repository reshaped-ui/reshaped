import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Loader from "components/Loader";

export default {
	title: "Components/Loader/tests",
	component: Loader,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/loader",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const ariaLabel: StoryObj = {
	name: "ariaLabel",
	render: () => <Loader ariaLabel="Loading" attributes={{ "data-testid": "root" }} />,
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root");

		expect(root).toHaveAttribute("aria-live", "assertive");
		expect(root).toHaveAttribute("aria-label", "Loading");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Loader className="test-classname" attributes={{ id: "test-id" }} ariaLabel="Loading" />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
