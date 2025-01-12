import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import Dismissible from "components/Dismissible";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Utilities/Dismissible/tests",
	component: Dismissible,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/action-bar",
		},
	},
};

export const closeAriaLabel: StoryObj<{ handleClose: ReturnType<typeof fn> }> = {
	args: {
		handleClose: fn(),
	},
	name: "onClose, closeAriaLabel",
	render: (args) => (
		<Dismissible closeAriaLabel="Close" onClose={args.handleClose}>
			<Placeholder />
		</Dismissible>
	),
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(button).toHaveAttribute("aria-label", "Close");
		expect(args.handleClose).toHaveBeenCalledTimes(1);
		expect(args.handleClose).toHaveBeenCalledWith();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Dismissible
				closeAriaLabel="Close"
				onClose={() => {}}
				className="test-classname"
				attributes={{ id: "test-id" }}
			>
				<Placeholder />
			</Dismissible>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
