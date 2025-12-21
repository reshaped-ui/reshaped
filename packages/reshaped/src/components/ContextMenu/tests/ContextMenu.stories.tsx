import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import ContextMenu from "components/ContextMenu";
import View from "components/View";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

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

const menuData = [
	{ label: "Action 1" },
	{ label: "Action 2" },
	{
		label: "Action 3",
		children: [
			{ label: "Action 1" },
			{ label: "Action 2" },
			{
				label: "Action 3",
				children: [
					{
						label: "Action 1",
					},
					{
						label: "Action 2 with a very long trigger text",
					},
					{
						label: "Action 3",
						children: [
							{
								label: "Action 1",
							},
							{
								label: "Action 2",
							},
							{
								label: "Action 3",
							},
							{
								label: "Action 4",
							},
							{
								label: "Action 5",
							},
							{
								label: "Action 6",
							},
							{
								label: "Action 7",
							},
							{
								label: "Action 8",
							},
							{
								label: "Action 9",
							},
							{
								label: "Action 10",
							},
							{
								label: "Action 11",
							},
							{
								label: "Action 12",
							},
							{
								label: "Action 13",
							},
							{
								label: "Action 14",
							},
							{
								label: "Action 15",
							},
							{
								label: "Action 16",
							},
							{
								label: "Action 17",
							},
							{
								label: "Action 18",
							},
							{
								label: "Action 19",
							},
						],
					},
				],
			},
		],
	},
];

const renderMenuItems = (items: NonNullable<(typeof menuData)[number]["children"]>) => {
	return items.map((item, idx) => {
		if (item.children) {
			return (
				<ContextMenu.SubMenu key={idx} fallbackAdjustLayout>
					<ContextMenu.SubTrigger>{item.label}</ContextMenu.SubTrigger>
					<ContextMenu.Content>{renderMenuItems(item.children)}</ContextMenu.Content>
				</ContextMenu.SubMenu>
			);
		}

		return <ContextMenu.Item key={idx}>{item.label}</ContextMenu.Item>;
	});
};

export const menu: StoryObj = {
	name: "test: nested menu items",
	render: () => (
		<View padding={4}>
			<ContextMenu fallbackAdjustLayout>
				<View
					height={50}
					width={50}
					backgroundColor="neutral-faded"
					borderRadius="medium"
					justify="center"
					align="center"
				>
					Right Click Here
				</View>
				<ContextMenu.Content>{renderMenuItems(menuData)}</ContextMenu.Content>
			</ContextMenu>
		</View>
	),
};
