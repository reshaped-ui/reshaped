import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import { sleep } from "utilities/helpers";

export default {
	title: "Components/DropdownMenu/tests",
	component: DropdownMenu,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/dropdown-menu",
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
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} defaultActive>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let item = canvas.getByText("Item");

		await sleep(500);
		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith();
			expect(item).not.toBeInTheDocument();
		});

		await userEvent.click(trigger);

		item = canvas.getByText("Item");

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
			expect(item).toBeInTheDocument();
		});
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
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} active>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const item = canvas.getByText("Item");

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
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} active={false}>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		const item = canvas.queryByText("Item");
		expect(item).not.toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<DropdownMenu active>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					<DropdownMenu.Item>Item</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const menu = await canvas.findByTestId("test-id");

		expect(menu).toHaveClass("test-classname");
	},
};
