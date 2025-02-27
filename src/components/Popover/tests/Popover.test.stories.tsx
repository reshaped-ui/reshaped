import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within, waitFor } from "@storybook/test";
import Popover from "components/Popover";
import Button from "components/Button";
import { sleep } from "utilities/helpers";

export default {
	title: "Components/Popover/tests",
	component: Popover,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/popover",
		},
	},
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
			expect(args.handleClose).toHaveBeenCalledWith();
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
			expect(args.handleClose).toHaveBeenCalledWith();
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
		const dismissible = canvas.getByTestId("test-id");
		const closeButton = within(dismissible).getByRole("button");

		expect(dismissible).toHaveClass("test-classname");
		expect(closeButton).toHaveAccessibleName("Close");

		await userEvent.click(closeButton);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith();
		});
	},
};

export const triggerType: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "triggerType hover",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Popover onOpen={args.handleOpen} onClose={args.handleClose} triggerType="hover">
			<Popover.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Popover.Trigger>
			<Popover.Content>Content</Popover.Content>
		</Popover>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.hover(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		await userEvent.unhover(trigger);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith();
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
