import { StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect, within } from "storybook/test";

import Button from "@/components/Button";
import MenuItem from "@/components/MenuItem";
import Popover, { type PopoverProps } from "@/components/Popover";
import ScrollArea from "@/components/ScrollArea";
import Tooltip from "@/components/Tooltip";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Popover",
	component: Popover,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/popover",
		},
	},
};

const Demo: React.FC<PopoverProps> = (props) => {
	const { position, ...rest } = props;
	const id = useId();

	return (
		<Popover position={position} {...rest}>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>{position || "Open"}</Button>}
			</Popover.Trigger>
			<Popover.Content attributes={{ "aria-labelledby": id }}>
				<View gap={2} align="start">
					<span id={id}>Popover content</span>
					<View direction="row" gap={2}>
						<Button onClick={() => {}}>Action 1</Button>
						<Button onClick={() => {}}>Action 2</Button>
					</View>
				</View>
			</Popover.Content>
		</Popover>
	);
};

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title="position: bottom">
				<View align="center" justify="center" gap={8} direction="row">
					<Demo position="bottom-start" />
					<Demo position="bottom" />
					<Demo position="bottom-end" />
				</View>
			</Example.Item>
			<Example.Item title="position: top">
				<View align="center" justify="center" gap={8} direction="row">
					<Demo position="top-start" />
					<Demo position="top" />
					<Demo position="top-end" />
				</View>
			</Example.Item>
			<Example.Item title="position: start">
				<View align="center" justify="center" gap={8} direction="row">
					<Demo position="start-top" />
					<Demo position="start" />
					<Demo position="start-bottom" />
				</View>
			</Example.Item>
			<Example.Item title="position: end">
				<View align="center" justify="center" gap={8} direction="row">
					<Demo position="end-top" />
					<Demo position="end" />
					<Demo position="end-bottom" defaultActive />
				</View>
			</Example.Item>
		</Example>
	),
};

export const widthNumber = {
	name: "width: px",
	render: () => <Demo width="400px" defaultActive />,
};

export const widthFull = {
	name: "width: 100%",
	render: () => <Demo width="100%" defaultActive />,
};

export const padding = {
	name: "padding",
	render: () => (
		<Example>
			<Example.Item title="padding: 0">
				<Demo padding={0} />
			</Example.Item>
			<Example.Item title="padding: 6">
				<Demo padding={6} defaultActive />
			</Example.Item>
		</Example>
	),
};

export const elevation = {
	name: "elevation",
	render: () => (
		<Example>
			<Example.Item title="elevation: raised">
				<Demo elevation="raised" defaultActive />
			</Example.Item>
		</Example>
	),
};

export const dismissible: StoryObj = {
	name: "dismissible",
	render: () => (
		<Popover defaultActive>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>
				<Popover.Dismissible closeAriaLabel="Close" attributes={{ "data-testid": "test-id" }}>
					Content
				</Popover.Dismissible>
			</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const dismissible = await canvas.findByTestId("test-id");

		expect(within(dismissible).getByRole("button")).toHaveAccessibleName("Close");
	},
};

export const testWithTooltip = {
	name: "test: with tooltip",
	render: () => (
		<View paddingTop={10}>
			<Tooltip position="top" text="Hello">
				{(tooltipAttributes) => (
					<Popover position="bottom">
						<Popover.Trigger>
							{(attributes) => (
								<Button
									attributes={{
										...attributes,
										...tooltipAttributes,
									}}
								>
									Open
								</Button>
							)}
						</Popover.Trigger>
						<Popover.Content>
							<View gap={2} align="start">
								Popover content
								<Button onClick={() => {}}>Button</Button>
							</View>
						</Popover.Content>
					</Popover>
				)}
			</Tooltip>
		</View>
	),
};

export const testContentEditable = {
	name: "test: contenteditable",
	render: () => {
		const [active, setActive] = useState(false);

		return (
			<Popover>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<View gap={4}>
						<View.Item>
							<Button onClick={() => {}}>Hello</Button>
						</View.Item>

						<ScrollArea height="100px">
							<div
								style={{ height: "200px" }}
								contentEditable
								// oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
								role="textbox"
								aria-label="Content editable"
								tabIndex={0}
								onInput={(e) => {
									setActive(e.currentTarget.innerText.startsWith("@"));
								}}
								onKeyDown={(e) => {
									console.log(e.key);
									if (e.key === "Enter" && active) {
										e.preventDefault();
										e.currentTarget.innerText = "@hello";
										setActive(false);
									}
								}}
							/>
						</ScrollArea>

						<Popover
							active={active}
							onClose={() => setActive(false)}
							originCoordinates={{ x: 300, y: 300 }}
							trapFocusMode="selection-menu"
						>
							<Popover.Content>
								<View gap={4}>
									<MenuItem onClick={() => {}}>Action</MenuItem>
									<MenuItem onClick={() => {}}>Close</MenuItem>
								</View>
							</Popover.Content>
						</Popover>
					</View>
				</Popover.Content>
			</Popover>
		);
	},
};
