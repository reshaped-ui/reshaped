import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within, waitFor } from "@storybook/test";
import Tooltip from "components/Tooltip";
import Button from "components/Button";

export default {
	title: "Components/Tooltip/tests",
	component: Tooltip,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tooltip",
		},
	},
};

export const defaultActive: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "uncontrolled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Tooltip text="Content" onOpen={args.handleOpen} onClose={args.handleClose}>
			{(attributes) => <Button attributes={attributes}>Trigger</Button>}
		</Tooltip>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.hover(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		const item = canvas.getByText("Content");
		expect(item).toBeInTheDocument();

		await userEvent.unhover(trigger);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith();
			expect(item).not.toBeInTheDocument();
		});
	},
};
