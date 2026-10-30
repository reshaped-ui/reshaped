import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "@/components/Button";
import ContextMenu from "@/components/ContextMenu";
import Popover from "@/components/Popover";
import View from "@/components/View";
import { sleep } from "@/utilities/helpers";
import { Example } from "@/utilities/storybook";

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
		expect(args.handleOpen).toHaveBeenCalledWith({
			event: expect.objectContaining({ type: "contextmenu", target: root }),
		});

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

export const triggerRef: StoryObj<{ handleOpen: ReturnType<typeof fn> }> = {
	name: "triggerRef",
	render: () => {
		const triggerRef = React.useRef<HTMLDivElement>(null);

		return (
			<>
				<View
					height="200px"
					backgroundColor="neutral-faded"
					borderRadius="medium"
					attributes={{ ref: triggerRef }}
				/>

				<ContextMenu triggerRef={triggerRef}>
					<ContextMenu.Content>
						<ContextMenu.Item onClick={() => {}}>Item</ContextMenu.Item>
						<ContextMenu.Item onClick={() => {}}>Item</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>
			</>
		);
	},
};

export const sameMenuRightClick: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "test: right click on the same context menu",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => {
		const triggerRef = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={4}>
				<ContextMenu onOpen={args.handleOpen} onClose={args.handleClose}>
					<View
						height="60px"
						backgroundColor="neutral-faded"
						borderRadius="medium"
						attributes={{ "data-testid": "children" }}
					/>

					<ContextMenu.Content>
						<ContextMenu.Item>Children item</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>

				<View
					height="60px"
					backgroundColor="neutral-faded"
					borderRadius="medium"
					attributes={{ ref: triggerRef, "data-testid": "trigger-ref" }}
				/>

				<ContextMenu triggerRef={triggerRef} onOpen={args.handleOpen} onClose={args.handleClose}>
					<ContextMenu.Content>
						<ContextMenu.Item>Trigger ref item</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>
			</View>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		for (const [testId, text] of [
			["children", "Children item"],
			["trigger-ref", "Trigger ref item"],
		]) {
			const trigger = canvas.getByTestId(testId);

			args.handleOpen.mockClear();
			args.handleClose.mockClear();

			const { left, top } = trigger.getBoundingClientRect();

			await userEvent.pointer({
				keys: "[MouseRight]",
				target: trigger,
				coords: { clientX: left + 10, clientY: top + 10 },
			});

			expect(args.handleOpen).toHaveBeenCalledTimes(1);

			const menu = canvas.getByRole("menu");
			const initialLeft = menu.getBoundingClientRect().left;

			// Wait for the open animation to finish
			await sleep(500);

			await userEvent.pointer({
				keys: "[MouseRight]",
				target: trigger,
				coords: { clientX: left + 210, clientY: top + 10 },
			});

			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
			expect(args.handleOpen).toHaveBeenCalledTimes(2);

			await sleep(500);

			expect(canvas.getByText(text)).toBeInTheDocument();
			expect(canvas.getByRole("menu").getBoundingClientRect().left).toBe(initialLeft + 200);

			await userEvent.click(trigger);

			expect(args.handleClose).toHaveBeenCalledTimes(2);

			await waitFor(
				() => {
					expect(canvas.queryByText(text)).not.toBeInTheDocument();
				},
				{
					timeout: 1000,
				}
			);
		}
	},
};

export const insideFlyoutRightClick: StoryObj<{
	handlePopoverClose: ReturnType<typeof fn>;
}> = {
	name: "test: right click inside another flyout",
	args: {
		handlePopoverClose: fn(),
	},
	render: (args) => (
		<Popover onClose={args.handlePopoverClose}>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open popover</Button>}
			</Popover.Trigger>
			<Popover.Content>
				<ContextMenu>
					<View
						width="200px"
						height="60px"
						backgroundColor="neutral-faded"
						borderRadius="medium"
						attributes={{ "data-testid": "popover-area" }}
					/>

					<ContextMenu.Content>
						<ContextMenu.Item>Context menu item</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>
			</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		await userEvent.click(canvas.getByText("Open popover"));
		await sleep(500);

		await userEvent.pointer({ keys: "[MouseRight]", target: canvas.getByTestId("popover-area") });

		expect(canvas.getByText("Context menu item")).toBeInTheDocument();
		expect(canvas.getByTestId("popover-area")).toBeInTheDocument();
		expect(args.handlePopoverClose).not.toHaveBeenCalled();
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
