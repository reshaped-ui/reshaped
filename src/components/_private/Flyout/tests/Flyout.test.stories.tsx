import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within, waitFor } from "@storybook/test";
import Flyout from "components/_private/Flyout";
import Button from "components/Button";
import Reshaped from "components/Reshaped";
import { useRef } from "react";
import { createRoot } from "react-dom/client";

export default {
	title: "Internal/Flyout/tests",
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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} defaultActive>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Flyout.Trigger>
			<Flyout.Content>Content</Flyout.Content>
		</Flyout>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let item = canvas.getByText("Content");

		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith();
		});

		expect(item).not.toBeInTheDocument();

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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} active>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Flyout.Trigger>
			<Flyout.Content>Content</Flyout.Content>
		</Flyout>
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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} active={false}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Flyout.Trigger>
			<Flyout.Content>Content</Flyout.Content>
		</Flyout>
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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} triggerType="hover">
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</Flyout.Trigger>
			<Flyout.Content>Content</Flyout.Content>
		</Flyout>
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

export const disabled: StoryObj<{ handleOpen: ReturnType<typeof fn> }> = {
	name: "disabled",
	args: {
		handleOpen: fn(),
	},
	render: () => (
		<div data-testid="root">
			<Flyout disabled>
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Flyout.Trigger>
				<Flyout.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					Content
				</Flyout.Content>
			</Flyout>
		</div>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleOpen).toHaveBeenCalledTimes(0);
	},
};

export const containerRef: StoryObj = {
	name: "containerRef",
	render: () => {
		const portalRef = useRef<HTMLDivElement>(null);

		return (
			<div ref={portalRef} data-testid="test-id">
				<Flyout containerRef={portalRef} active>
					<Flyout.Trigger>
						{(attributes) => <Button attributes={attributes}>Trigger</Button>}
					</Flyout.Trigger>
					<Flyout.Content>Content</Flyout.Content>
				</Flyout>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const containerEl = canvas.getByTestId("test-id");
		const contentEl = canvas.getByText("Content");

		expect(containerEl).toContainElement(contentEl);
	},
};

class CustomElement extends window.HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		if (!this.shadowRoot) return;

		const root = createRoot(this.shadowRoot);
		root.render(
			<Reshaped>
				<Flyout active>
					<Flyout.Trigger>
						{(attributes) => <button {...attributes}>Trigger</button>}
					</Flyout.Trigger>
					<Flyout.Content>
						<div id="test-id" />
					</Flyout.Content>
				</Flyout>
			</Reshaped>
		);
	}
}

window.customElements.define("custom-element-flyout", CustomElement);

export const shadowDom: StoryObj = {
	name: "shadow DOM",
	// @ts-ignore
	render: () => <custom-element-flyout />,
	play: async () => {
		expect(
			document.querySelector("custom-element-flyout")?.shadowRoot?.querySelector(`#test-id`)
		).toBeTruthy();
		expect(document.body.querySelector(`#test-id`)).toBe(null);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Flyout active>
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Flyout.Trigger>
				<Flyout.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					Content
				</Flyout.Content>
			</Flyout>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const menu = await canvas.findByTestId("test-id");

		expect(menu).toHaveClass("test-classname");
	},
};
