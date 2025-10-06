import { Example } from "utilities/storybook";
import ContextMenu from "components/ContextMenu";
import View from "components/View";
import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { sleep } from "utilities/helpers";

export default {
	title: "Components/ContextMenu",
	component: ContextMenu,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/context-menu",
		},
	},
};

export const base = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="base">
				<div style={{ height: 200, overflow: "auto" }}>
					<ContextMenu>
						<View height="400px" backgroundColor="neutral-faded" borderRadius="medium" />

						<ContextMenu.Content>
							<ContextMenu.Item>Item 1</ContextMenu.Item>
							<ContextMenu.Item>Item 2</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu>
				</div>
			</Example.Item>
		</Example>
	),
};

export const handlers: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "handleOpen, handleClose",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<div style={{ height: 200, overflow: "auto" }} data-testid="scroll">
			<ContextMenu onOpen={args.handleOpen} onClose={args.handleClose}>
				<View
					height="400px"
					backgroundColor="neutral-faded"
					borderRadius="medium"
					attributes={{ "data-testid": "root" }}
				/>

				<ContextMenu.Content>
					<ContextMenu.Item>Item</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu>
		</div>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const root = canvas.getByTestId("root");
		const scroll = canvas.getByTestId("scroll");

		await userEvent.pointer({ keys: "[MouseRight>]", target: root });

		expect(args.handleOpen).toHaveBeenCalledTimes(1);
		expect(args.handleOpen).toHaveBeenCalledWith();

		const item = canvas.getByText("Item");

		expect(item).toBeInTheDocument();
		// Context menu locks the scroll of the closest scrollable parent
		expect(scroll).toHaveStyle("overflow: hidden");

		// Wait for the open animation to finish
		await sleep(500);

		await userEvent.click(root);

		expect(args.handleClose).toHaveBeenCalledTimes(1);
		expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });

		await waitFor(
			() => {
				expect(item).not.toBeInTheDocument();
				expect(scroll).not.toHaveStyle("overflow: hidden");
			},
			{
				timeout: 1000,
			}
		);
	},
};
