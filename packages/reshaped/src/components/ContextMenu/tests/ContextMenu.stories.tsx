import { StoryObj } from "@storybook/react-vite";
import React from "react";

import ContextMenu from "@/components/ContextMenu";
import View from "@/components/View";
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

export const triggerRef: StoryObj = {
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
