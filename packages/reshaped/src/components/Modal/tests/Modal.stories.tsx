import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "components/Button";
import Dismissible from "components/Dismissible";
import DropdownMenu from "components/DropdownMenu";
import Modal, { type ModalProps } from "components/Modal";
import Radio from "components/Radio";
import Switch from "components/Switch";
import TextField from "components/TextField";
import View from "components/View";
import useToggle from "hooks/useToggle";
import { sleep } from "utilities/helpers";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/modal",
		},
	},
};

const Demo: React.FC<ModalProps & { title?: string; subtitle?: string }> = (props) => {
	const { active: activeProp, title, subtitle, children, ...modalProps } = props;
	const { active, activate, deactivate } = useToggle(activeProp);

	return (
		<>
			<Button onClick={activate}>Open dialog</Button>
			<Modal {...modalProps} active={active} onClose={deactivate}>
				<View gap={3}>
					{(title || subtitle) && (
						<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
							{title && <Modal.Title>{title}</Modal.Title>}
							{subtitle && <Modal.Subtitle>{subtitle}</Modal.Subtitle>}
						</Dismissible>
					)}
					{children ||
						"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."}
					<Button onClick={deactivate}>Close</Button>
					<TextField name="hey" />
				</View>
			</Modal>
		</>
	);
};

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title={["responsive position", "[s] full-screen", "[m] center", "[l] end"]}>
				<Demo position={{ s: "full-screen", m: "center", l: "end" }} />
			</Example.Item>
			<Example.Item title="position: center">
				<Demo position="center" />
			</Example.Item>
			<Example.Item title="position: bottom">
				<Demo position="bottom" />
			</Example.Item>
			<Example.Item title="position: start">
				<Demo position="start" />
			</Example.Item>
			<Example.Item title="position: end">
				<Demo position="end" />
			</Example.Item>
			<Example.Item title="position: full-screen">
				<Demo position="full-screen" />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => {
		return (
			<Example>
				<Example.Item title="size: default">
					<Demo />
				</Example.Item>
				<Example.Item title="size: 300px">
					<Demo size="300px" />
				</Example.Item>
				<Example.Item
					title={["size: 800px", "should have max width of 100% minus gaps on the sides"]}
				>
					<Demo size="800px" />
				</Example.Item>
				<Example.Item
					title={[
						"responsive size, responsive position",
						"[s] auto",
						"[m+] 600px",
						"bottom position changes height instead of width",
					]}
				>
					<Demo
						position={{ s: "bottom", m: "center", l: "end" }}
						size={{ s: "auto", m: "600px" }}
					/>
				</Example.Item>
			</Example>
		);
	},
};

export const padding = {
	name: "padding",
	render: () => (
		<Example>
			<Example.Item title="padding: 0">
				<Demo padding={0} />
			</Example.Item>
			<Example.Item title="padding: 6">
				<Demo padding={6} />
			</Example.Item>
			<Example.Item title={["responsive padding", "[s] 2", "[m+]: 6"]}>
				<Demo padding={{ s: 2, m: 6 }} />
			</Example.Item>
		</Example>
	),
};

export const overflow = {
	name: "overflow",
	render: () => (
		<Example>
			<Example.Item title="default overflow">
				<Demo>
					<div
						style={{
							position: "absolute",
							top: -32,
							left: -32,
							height: 100,
							width: 100,
							background: "tomato",
						}}
					/>
				</Demo>
			</Example.Item>

			<Example.Item title="overflow: visible">
				<Demo overflow="visible">
					<div
						style={{
							position: "absolute",
							top: -32,
							left: -32,
							height: 100,
							width: 100,
							background: "tomato",
						}}
					/>
				</Demo>
			</Example.Item>
		</Example>
	),
};

export const composition = {
	name: "composition",
	render: () => (
		<Example>
			<Example.Item title="title, subtitle, dismissible">
				<Demo title="Modal title" subtitle="Modal subtitle" />
			</Example.Item>
		</Example>
	),
};

export const overlay = {
	name: "overlay",
	render: () => (
		<Example>
			<Example.Item title="transparentOverlay, doesn't lock scroll">
				<Demo transparentOverlay />
			</Example.Item>
			<Example.Item title="blurredOverlay">
				<Demo blurredOverlay />
			</Example.Item>
			<View height="1000px" />
		</Example>
	),
};

export const flags: StoryObj<{
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "disableCloseOnOutsideClick",
	args: {
		handleClose: fn(),
	},
	render: (args) => {
		return (
			<Example>
				<Example.Item title="disableCloseOnOutsideClick">
					<Demo disableCloseOnOutsideClick onClose={args.handleClose} active />
				</Example.Item>
			</Example>
		);
	},
};

export const containerRef = {
	name: "containerRef",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);
		const containerRef2 = React.useRef<HTMLDivElement>(null);
		const toggle = useToggle();
		const toggle2 = useToggle();

		return (
			<Example>
				<Example.Item title={["in scrollable container", "scroll and then open"]}>
					<View
						attributes={{ ref: containerRef2 }}
						borderRadius="medium"
						height="400px"
						overflow="auto"
						backgroundColor="neutral-faded"
						padding={4}
					>
						<View gap={4} align="start">
							<Button onClick={toggle2.activate}>Open modal</Button>
							<View height="500px" backgroundColor="primary" width="500px" borderRadius="medium" />
						</View>
						<Modal
							containerRef={containerRef2}
							active={toggle2.active}
							onClose={toggle2.deactivate}
							position="end"
						>
							<Placeholder />
						</Modal>
					</View>
				</Example.Item>
				<Example.Item title="in static container">
					<View
						attributes={{ ref: containerRef }}
						borderRadius="medium"
						height="400px"
						overflow="hidden"
						backgroundColor="neutral-faded"
						padding={4}
					>
						<Button onClick={toggle.activate}>Open modal</Button>
						<Modal
							containerRef={containerRef}
							active={toggle.active}
							onClose={toggle.deactivate}
							position="end"
						>
							<Placeholder />
						</Modal>
					</View>
				</Example.Item>
			</Example>
		);
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
				<Button onClick={() => overlayToggle.toggle()}>Open overlay</Button>
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
		await userEvent.keyboard("{Escape}");

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(2);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "escape-key" });

			expect(args.handleAfterClose).toHaveBeenCalledTimes(3);
			expect(args.handleAfterClose).toHaveBeenCalledWith();
		});
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

export const edgeCases = {
	name: "test: edge cases",
	render: () => {
		const menuModalToggle = useToggle();
		const menuModalToggleInner = useToggle();
		const scrollModalToggle = useToggle();
		const inputRef = React.useRef<HTMLInputElement>(null);

		return (
			<Example>
				<Example.Item title="Scrolls with long content on touch devices">
					<Demo position="center">
						<Button onClick={() => {}}>Action</Button>
						<View height="2000px" backgroundColor="primary-faded" />
					</Demo>
				</Example.Item>
				<Example.Item title="keyboard focus stays on the modal first">
					{/* eslint-disable-next-line jsx-a11y/no-autofocus */}
					<Demo title="Modal title" autoFocus={false} />
				</Example.Item>
				<Example.Item title="trap focus works with custom children components">
					<Demo title="Modal title">
						<View gap={3} direction="row">
							<Button onClick={() => {}}>Button</Button>
							<Switch name="switch" />
						</View>
					</Demo>
				</Example.Item>
				<Example.Item title="focus moves to the input">
					<Demo
						title="Modal title"
						onOpen={() => {
							inputRef.current?.focus();
						}}
					>
						<View gap={3} direction="row">
							<Button onClick={() => {}}>Button</Button>
							<TextField name="name" inputAttributes={{ ref: inputRef }} />
						</View>
					</Demo>
				</Example.Item>
				<Example.Item title="Focus moves to the input with autoFocus">
					<Demo title="Modal title">
						<View gap={3} direction="row">
							<Button onClick={() => {}}>Button</Button>
							<TextField
								name="name"
								placeholder="autofocus"
								inputAttributes={{ autoFocus: true }}
							/>
						</View>
					</Demo>
				</Example.Item>
				<Example.Item title="scrollable area in modal ignores swipe-to-close">
					<View gap={3} direction="row">
						<Button onClick={scrollModalToggle.activate}>Open</Button>
						<Modal
							active={scrollModalToggle.active}
							onClose={scrollModalToggle.deactivate}
							size="300px"
							position="bottom"
						>
							<View
								height="1000px"
								backgroundColor="neutral-faded"
								borderRadius="medium"
								padding={4}
							>
								Content
							</View>
						</Modal>
					</View>
				</Example.Item>
				<Example.Item
					title={[
						"trap focus works correctly when it was already trapped",
						"focus return back to the dropdown trigger on modal close",
						"closing dropdown inside the modal doesn't close the modal",
					]}
				>
					<DropdownMenu>
						<DropdownMenu.Trigger>
							{(attributes) => <Button attributes={attributes}>Open menu</Button>}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={menuModalToggle.activate}>Open dialog</DropdownMenu.Item>
							<DropdownMenu.Item>Item 2</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
					<Modal active={menuModalToggle.active} onClose={menuModalToggle.deactivate}>
						<View gap={3}>
							<DropdownMenu>
								<DropdownMenu.Trigger>
									{(attributes) => <Button attributes={attributes}>Open menu</Button>}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item>Item 1</DropdownMenu.Item>
									<DropdownMenu.Item>Item 2</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
							<Button onClick={menuModalToggleInner.activate}>Open dialog</Button>
							<Button onClick={menuModalToggle.deactivate}>Close</Button>
							<Modal active={menuModalToggleInner.active} onClose={menuModalToggleInner.deactivate}>
								<Button onClick={menuModalToggleInner.deactivate}>Close</Button>
							</Modal>
						</View>
					</Modal>
				</Example.Item>

				<Example.Item title="disableSwipeGesture">
					<Demo disableSwipeGesture position="start" />
				</Example.Item>

				<Example.Item title="scroll locks on open">
					<Demo />
					<View height="1000px" />
				</Example.Item>
			</Example>
		);
	},
};

export const trapFocusEdgeCases = {
	name: "test: trap focus edge cases",
	render: () => {
		const toggle = useToggle();

		return (
			<Example>
				<Example.Item title="Radio should be navigatable with arrow keys">
					<Button onClick={toggle.activate}>Open modal</Button>
					<Modal active={toggle.active} onClose={toggle.deactivate}>
						<View gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Radio name="radio" value="1">
								Option 1
							</Radio>
							<Radio name="radio" value="2">
								Option 2
							</Radio>
							<Button onClick={() => {}}>Action 2</Button>
						</View>
					</Modal>
				</Example.Item>
			</Example>
		);
	},
};
