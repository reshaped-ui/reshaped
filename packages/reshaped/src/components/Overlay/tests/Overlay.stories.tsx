import { StoryObj } from "@storybook/react-vite";
import React from "react";
import ReactDOM from "react-dom";
import { expect, fn, Mock, userEvent, waitFor, within } from "storybook/test";

import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import View from "@/components/View";
import useToggle from "@/hooks/useToggle";
import { sleep } from "@/utilities/helpers";
import { Example } from "@/utilities/storybook";

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
	handleAfterOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
	handleAfterClose: ReturnType<typeof fn>;
}> = {
	name: "onClose, onAfterOpen, onAfterClose",
	args: {
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

		await userEvent.click(trigger);

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

		const overlay = canvas.getByText("Content").parentElement!;

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

export const containerRefNotContained: StoryObj = {
	name: "containerRef with contained={false}",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<>
				<div ref={containerRef} data-testid="test-id" style={{ height: 200 }} />
				<Overlay active containerRef={containerRef} contained={false}>
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
		// Backdrop click is a pointer shortcut, it shouldn't be announced as a button
		expect(root).toHaveAttribute("role", "presentation");
	},
};

export const testPortal: StoryObj<{
	handleClose: Mock;
}> = {
	name: "test: second portal",
	args: {
		handleClose: fn(),
	},
	parameters: {
		docs: {
			source: {
				type: "code",
				code: [],
			},
		},
	},
	render: (args) => {
		const overlayToggle = useToggle(false);

		const handleClose = () => {
			args.handleClose();
			overlayToggle.deactivate();
		};

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.activate}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={handleClose}>
						Overlay content
						{ReactDOM.createPortal(
							<View
								position="absolute"
								insetTop={4}
								insetStart={4}
								width={30}
								height={30}
								backgroundColor="neutral"
								zIndex={9999}
								padding={4}
								borderRadius="small"
								align="center"
								justify="center"
								attributes={{ "data-testid": "portal" }}
							>
								Portal
							</View>,
							document.body
						)}
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await sleep(300);

		const portal = canvas.getByTestId("portal");

		expect(portal).toBeInTheDocument();

		await userEvent.click(portal);

		expect(args.handleClose).toHaveBeenCalledTimes(0);
	},
};

export const testTransitionStart: StoryObj = {
	name: "test: transition start",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<>
				<Button onClick={overlayToggle.activate}>Open overlay</Button>
				<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate}>
					Content
				</Overlay>
			</>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		// Transitions are paused for a couple of frames after the theme is mounted
		await sleep(100);

		// Dispatched without the user event delays to check the overlay in the frame following the click
		trigger.click();
		await new Promise((resolve) => requestAnimationFrame(resolve));

		const overlay = canvas.getByText("Content").closest<HTMLElement>("[role=presentation]")!;
		const transitions = overlay
			.getAnimations()
			.filter((animation) => animation instanceof CSSTransition);

		// Overlay is already fading in instead of staying hidden for a few more frames
		expect(transitions).toHaveLength(1);
		expect(transitions[0].transitionProperty).toBe("opacity");

		await waitFor(() => {
			expect(overlay).toHaveStyle({ opacity: "1" });
		});
	},
};

export const testImmediateClose: StoryObj<{ handleAfterClose: ReturnType<typeof fn> }> = {
	name: "test: closed before the open transition",
	args: {
		handleAfterClose: fn(),
	},
	render: (args) => {
		const overlayToggle = useToggle(false);

		return (
			<>
				<Button onClick={overlayToggle.activate}>Open overlay</Button>
				<Button onClick={overlayToggle.deactivate}>Close overlay</Button>
				<Overlay active={overlayToggle.active} onAfterClose={args.handleAfterClose}>
					Content
				</Overlay>
			</>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const [openTrigger, closeTrigger] = canvas.getAllByRole("button");

		// Transitions are paused for a couple of frames after the theme is mounted
		await sleep(100);

		// Overlay is closed in the same frame it was opened in, before the browser could start its transition
		openTrigger.click();
		await Promise.resolve();
		expect(canvas.getByText("Content")).toBeInTheDocument();
		closeTrigger.click();

		await waitFor(() => {
			expect(canvas.queryByText("Content")).not.toBeInTheDocument();
			expect(args.handleAfterClose).toHaveBeenCalledTimes(1);
		});

		// Overlay still animates the next time it opens
		openTrigger.click();
		await new Promise((resolve) => requestAnimationFrame(resolve));

		const overlay = canvas.getByText("Content").closest<HTMLElement>("[role=presentation]")!;

		expect(overlay.getAnimations()).toHaveLength(1);
	},
};
