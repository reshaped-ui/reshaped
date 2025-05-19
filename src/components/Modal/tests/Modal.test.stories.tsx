import React from "react";
import { StoryObj } from "@storybook/react-vite";
import { within, expect, fn, userEvent, waitFor } from "storybook/test";
import Button from "components/Button";
import Modal from "components/Modal";
import useToggle from "hooks/useToggle";
import { sleep } from "utilities/helpers";

export default {
	title: "Components/Modal/tests",
	component: Modal,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/modal",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const renderProps: StoryObj = {
	name: "children, render props",
	render: () => (
		<Modal active className="test-classname" attributes={{ "data-testid": "test-id" }}>
			<Modal.Title>Title</Modal.Title>
			Content
		</Modal>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const root = canvas.getByText("Content");

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
				<Button onClick={overlayToggle.toggle}>Open overlay</Button>
				<Modal
					active={overlayToggle.active}
					onClose={(closeArgs) => {
						overlayToggle.deactivate();
						args.handleClose(closeArgs);
					}}
					onOpen={args.handleOpen}
					onAfterOpen={args.handleAfterOpen}
					onAfterClose={args.handleAfterClose}
				>
					<Modal.Title>Title</Modal.Title>
					Content
				</Modal>
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

		// Wait for transition
		await waitFor(() => {
			// Changing state doesn't trigger onClose
			expect(args.handleClose).toHaveBeenCalledTimes(0);

			expect(args.handleAfterClose).toHaveBeenCalledTimes(1);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});

		// Open
		await userEvent.click(trigger);
		await sleep(100);

		overlay = canvas.getAllByRole("button", { hidden: true }).at(-1)!;

		// Close by clicking on the overlay
		await userEvent.click(overlay);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "overlay-click" });

			expect(args.handleAfterClose).toHaveBeenCalledTimes(2);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});

		// Open
		await userEvent.click(trigger);
		await sleep(100);

		// Close by pressing Escape
		await userEvent.keyboard("{Escape/}");

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(2);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "escape-key" });

			expect(args.handleAfterClose).toHaveBeenCalledTimes(3);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});
	},
};

export const disableCloseOnClick: StoryObj<{
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "disableCloseOnOutsideClick",
	args: {
		handleClose: fn(),
	},
	render: (args) => (
		<Modal
			active
			disableCloseOnOutsideClick
			onClose={(closeArgs) => {
				args.handleClose(closeArgs);
			}}
		>
			<Modal.Title>Title</Modal.Title>
			Content
		</Modal>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const overlay = canvas.getByText("Content");

		await userEvent.click(overlay);

		expect(args.handleClose).toHaveBeenCalledTimes(0);

		await userEvent.keyboard("{Escape/}");

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
				<Modal active containerRef={containerRef}>
					<Modal.Title>Title</Modal.Title>
					Content
				</Modal>
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
		<Modal active className="test-classname" attributes={{ "data-testid": "test-id" }}>
			<Modal.Title>Title</Modal.Title>
			Content
		</Modal>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const root = canvas.getByTestId("test-id");

		expect(root).toHaveClass("test-classname");
	},
};
