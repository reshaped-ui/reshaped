import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "components/Button";
import Overlay from "components/Overlay";
import useToggle from "hooks/useToggle";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/Overlay",
	component: Overlay,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/overlay",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate}>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const transparent: StoryObj = {
	name: "transparent",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} transparent>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const blurred: StoryObj = {
	name: "blurred",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} blurred>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const renderProps: StoryObj = {
	name: "children, render props",
	render: () => (
		<Overlay active className="test-classname" attributes={{ "data-testid": "test-id" }}>
			{(args) => (args.active ? "Opened" : "Closed")}
		</Overlay>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const root = canvas.getByText("Opened");

		expect(root).toBeInTheDocument();
	},
};

export const handlers: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleAfterOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
	handleAfterClose: ReturnType<typeof fn>;
}> = {
	name: "onOpen, onClose, onAfterOpen, onAfterClose",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
		handleAfterClose: fn(),
		handleAfterOpen: fn(),
	},
	render: (args) => {
		const overlayToggle = useToggle();

		return (
			<>
				<Button onClick={() => overlayToggle.toggle()}>Open overlay</Button>
				<Overlay
					active={overlayToggle.active}
					onClose={(closeArgs) => {
						overlayToggle.deactivate();
						args.handleClose(closeArgs);
					}}
					onOpen={args.handleOpen}
					onAfterOpen={args.handleAfterOpen}
					onAfterClose={args.handleAfterClose}
				>
					Content
				</Overlay>
			</>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let overlay: HTMLElement;

		await userEvent.click(trigger);

		overlay = canvas.getByText("Content");

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		// Wait for transition
		await waitFor(() => {
			expect(args.handleAfterOpen).toHaveBeenCalledTimes(1);
			expect(args.handleAfterOpen).toHaveBeenCalledWith();
		});

		// Close by changing the state after the trigger click
		await userEvent.click(trigger);

		// Changing state doesn't trigger onClose
		expect(args.handleClose).toHaveBeenCalledTimes(0);

		// Wait for transition
		await waitFor(() => {
			expect(args.handleAfterClose).toHaveBeenCalledTimes(1);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});

		// Open
		await userEvent.click(trigger);

		overlay = canvas.getByText("Content");

		// TODO: Fails CLI tests in Storybook without a timeout
		await sleep(100);

		// Close by clicking on the overlay
		await userEvent.click(overlay);

		expect(args.handleClose).toHaveBeenCalledTimes(1);
		expect(args.handleClose).toHaveBeenCalledWith({ reason: "overlay-click" });

		await waitFor(() => {
			expect(args.handleAfterClose).toHaveBeenCalledTimes(2);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});

		// Open
		await userEvent.click(trigger);

		// TODO: Fails CLI tests in Storybook without a timeout
		await sleep(100);

		// Close by pressing Escape
		await userEvent.keyboard("{Escape}");

		expect(args.handleClose).toHaveBeenCalledTimes(2);
		expect(args.handleClose).toHaveBeenCalledWith({ reason: "escape-key" });

		await waitFor(() => {
			expect(args.handleAfterClose).toHaveBeenCalledTimes(3);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});
	},
};

export const disableCloseOnClick: StoryObj<{
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "disableCloseOnClick",
	args: {
		handleClose: fn(),
	},
	render: (args) => (
		<Overlay
			active
			disableCloseOnClick
			onClose={(closeArgs) => {
				args.handleClose(closeArgs);
			}}
		>
			Content
		</Overlay>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const overlay = canvas.getByText("Content");

		await userEvent.click(overlay);

		// TODO: Fails CLI tests in Storybook without a timeout
		await sleep(100);

		expect(args.handleClose).toHaveBeenCalledTimes(0);

		await userEvent.keyboard("{Escape}");

		expect(args.handleClose).toHaveBeenCalledTimes(1);
	},
};

export const containerRef: StoryObj = {
	name: "containerRef",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<>
				<div ref={containerRef} data-testid="test-id" style={{ height: 200 }} />
				<Overlay active containerRef={containerRef}>
					Content
				</Overlay>
			</>
		);
	},
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const container = canvas.getByTestId("test-id");
		const overlay = canvas.getByText("Content");

		expect(container).toContainElement(overlay);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<Overlay active className="test-classname" attributes={{ "data-testid": "test-id" }}>
			Content
		</Overlay>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const root = canvas.getByTestId("test-id");

		expect(root).toHaveClass("test-classname");
	},
};
