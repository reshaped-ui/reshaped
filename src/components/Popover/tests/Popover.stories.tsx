import { StoryObj } from "@storybook/react-vite";
import { useState, useId } from "react";
import { expect, fn, userEvent, within, waitFor } from "storybook/test";

import Button from "components/Button";
import MenuItem from "components/MenuItem";
import Popover, { type PopoverProps } from "components/Popover";
import ScrollArea from "components/ScrollArea";
import Tooltip from "components/Tooltip";
import View from "components/View";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

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

export const defaultActive: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "defaultActive, uncontrolled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Popover onOpen={args.handleOpen} onClose={args.handleClose} defaultActive>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>Content</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let item = canvas.getByText("Content");

		// Wait for the open animation
		await sleep(500);
		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
			expect(item).not.toBeInTheDocument();
		});

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		item = canvas.getByText("Content");
		expect(item).toBeInTheDocument();
	},
};

export const active: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "active, controlled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Popover onOpen={args.handleOpen} onClose={args.handleClose} active>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>Content</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const item = canvas.getByText("Content");

		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});

		expect(item).toBeInTheDocument();
	},
};

export const activeFalse: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "active false, controlled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Popover onOpen={args.handleOpen} onClose={args.handleClose} active={false}>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>Content</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		const item = canvas.queryByText("Content");
		expect(item).not.toBeInTheDocument();
	},
};

export const dismissible: StoryObj<{
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "dismissible, onClose, className, attributes, closeAriaLabel",
	args: {
		handleClose: fn(),
	},
	render: (args) => (
		<Popover onClose={args.handleClose} defaultActive>
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>
				<Popover.Dismissible
					closeAriaLabel="Close"
					attributes={{ "data-testid": "test-id" }}
					className="test-classname"
				>
					Content
				</Popover.Dismissible>
			</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		await sleep(300);

		const dismissible = canvas.getByTestId("test-id");
		const closeButton = within(dismissible).getByRole("button");

		expect(dismissible).toHaveClass("test-classname");
		expect(closeButton).toHaveAccessibleName("Close");

		await userEvent.click(closeButton);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({});
		});

		await sleep(300);

		const trigger = canvas.getAllByRole("button")[0];
		await userEvent.click(trigger);
	},
};

export const autoFocus: StoryObj = {
	name: "autoFocus",
	render: () => (
		<Example>
			<Example.Item title="autoFocus=false">
				{/* eslint-disable-next-line jsx-a11y/no-autofocus */}
				<Demo autoFocus={false} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(document.activeElement).toHaveRole("dialog");
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Popover active>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					Content
				</Popover.Content>
			</Popover>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const menu = await canvas.findByTestId("test-id");

		expect(menu).toHaveClass("test-classname");
	},
};

export const testNested = {
	name: "test: nested",
	render: () => (
		<Popover position="bottom">
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>
				<View gap={2} align="start">
					Popover content
					<Popover>
						<Popover.Trigger>
							{(attributes) => <Button attributes={attributes}>Open</Button>}
						</Popover.Trigger>
						<Popover.Content>Hello</Popover.Content>
					</Popover>
				</View>
			</Popover.Content>
		</Popover>
	),
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
								role="textbox"
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

export const variant = {
	name: "variant [deprecated]",
	render: () => (
		<Example>
			<Example.Item title="variant: headless">
				<Popover variant="headless" defaultActive position="bottom-start">
					<Popover.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</Popover.Trigger>
					<Popover.Content>
						<View
							height="100px"
							width="100px"
							borderColor="primary"
							borderRadius="medium"
							backgroundColor="primary-faded"
						/>
					</Popover.Content>
				</Popover>
			</Example.Item>
		</Example>
	),
};
