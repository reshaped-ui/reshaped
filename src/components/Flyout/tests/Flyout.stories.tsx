import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { createRoot } from "react-dom/client";
import { userEvent, waitFor, within, expect, fn } from "storybook/test";

import Button from "components/Button";
import Flyout, { FlyoutInstance, FlyoutProps } from "components/Flyout";
import Modal from "components/Modal";
import Reshaped from "components/Reshaped";
import Select from "components/Select";
import Switch from "components/Switch";
import TextField from "components/TextField";
import Theme from "components/Theme";
import View from "components/View";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

export default { title: "Utility components/Flyout" };

const Content: React.FC<{
	height?: number | false | string;
	width?: number | false | string;
	children?: React.ReactNode;
}> = (props) => (
	<div
		style={{
			background: "var(--rs-color-background-elevation-overlay)",
			padding: "var(--rs-unit-x4)",
			height: props.height === false ? undefined : props.height || 150,
			width: props.width === false ? undefined : props.width || 160,
			borderRadius: "var(--rs-radius-medium)",
			border: "1px solid var(--rs-color-border-neutral-faded)",
			boxSizing: "border-box",
		}}
	>
		{props.children || "Content"}
	</div>
);

const Demo: React.FC<
	FlyoutProps & {
		text?: string;
		contentHeight?: number | false | string;
		contentWidth?: number | false | string;
		height?: false;
	}
> = (props) => {
	const { position = "bottom-start", children, text, contentHeight, contentWidth, ...rest } = props;

	return (
		<Flyout position={position} {...rest}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>{text || position}</Button>}
			</Flyout.Trigger>
			<Flyout.Content
				attributes={{
					style: {
						background: "var(--rs-color-background-elevation-overlay)",
						padding: "var(--rs-unit-x4)",
						height: contentHeight === false ? undefined : contentHeight || 150,
						width: contentWidth === false ? undefined : contentWidth || 160,
						borderRadius: "var(--rs-radius-medium)",
						border: "1px solid var(--rs-color-border-neutral-faded)",
						boxSizing: "border-box",
					},
				}}
			>
				{children || "Content"}
			</Flyout.Content>
		</Flyout>
	);
};

export const position = {
	name: "position",
	render: () => {
		return (
			<View gap={4} padding={50} align="center" justify="center" height="100vh" width="120%">
				<View gap={4} direction="row">
					<Demo position="top-start" defaultActive />
					<Demo position="top" />
					<Demo position="top-end" />
				</View>

				<View gap={4} direction="row">
					<Demo position="end-top" />
					<Demo position="end" />
					<Demo position="end-bottom" />
				</View>

				<View gap={4} direction="row">
					<Demo position="start-top" />
					<Demo position="start" />
					<Demo position="start-bottom" />
				</View>

				<View gap={4} direction="row">
					<Demo position="bottom-start" />
					<Demo position="bottom" />
					<Demo position="bottom-end" />
				</View>
			</View>
		);
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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} defaultActive>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content />
			</Flyout.Content>
		</Flyout>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let item = canvas.getByText("Content");

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
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} active>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content />
			</Flyout.Content>
		</Flyout>
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
	name: "active: false, controlled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<Flyout onOpen={args.handleOpen} onClose={args.handleClose} active={false}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content />
			</Flyout.Content>
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

const modeContent = (
	<View direction="row" gap={2}>
		<Button onClick={() => {}}>Action 1</Button>
		<Button onClick={() => {}}>Action 2</Button>
		<Button onClick={() => {}}>Action 3</Button>
	</View>
);

export const modes = {
	name: "triggerType, trapFocusMode",
	render: () => {
		return (
			<Example>
				<Example.Item title="triggerType: click">
					<View direction="row" gap={4}>
						<Demo position="bottom-start" trapFocusMode="dialog" text="dialog">
							{modeContent}
						</Demo>
						<Demo position="bottom-start" trapFocusMode="action-menu" text="action-menu">
							{modeContent}
						</Demo>
						<Demo position="bottom-start" trapFocusMode="action-bar" text="action-bar">
							{modeContent}
						</Demo>
						<Demo position="bottom-start" trapFocusMode="content-menu" text="content-menu">
							{modeContent}
						</Demo>
						<Demo position="bottom-start" trapFocusMode={false} text="false">
							{modeContent}
						</Demo>
					</View>
				</Example.Item>

				<Example.Item title="triggerType: hover">
					<View direction="row" gap={4}>
						<Demo position="bottom-start" trapFocusMode="dialog" triggerType="hover" text="dialog">
							{modeContent}
						</Demo>
						<Demo
							position="bottom-start"
							trapFocusMode="action-menu"
							triggerType="hover"
							text="action-menu"
						>
							{modeContent}
						</Demo>
						<Demo
							position="bottom-start"
							trapFocusMode="action-bar"
							triggerType="hover"
							text="action-bar"
						>
							{modeContent}
						</Demo>
						<Demo
							position="bottom-start"
							trapFocusMode="content-menu"
							triggerType="hover"
							text="content-menu"
						>
							{modeContent}
						</Demo>
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const positionFallbacks = {
	name: "fallbackPositions",
	render: () => {
		return (
			<Example>
				<Example.Item title="position: top, default fallbacks">
					<View justify="center" align="center">
						<Demo position="top" />
					</View>
				</Example.Item>
				<Example.Item title="position: top, fallbackPositions: [start]">
					<View justify="center" align="center">
						<Demo position="top" fallbackPositions={["start"]} contentHeight={200} defaultActive />
					</View>
				</Example.Item>
				<Example.Item title="position: top, fallbackPositions: false">
					<View justify="center" align="center">
						<Demo position="top" fallbackPositions={false} contentHeight={400} />
					</View>
				</Example.Item>
			</Example>
		);
	},
};

const FallbackAdjustLayoutControls = ({
	containerRef,
	large,
}: {
	containerRef?: React.RefObject<HTMLDivElement | null>;
	large?: boolean;
}) => {
	const contentHeight = large ? "2000px" : "200px";
	const contentWidth = large ? "2000px" : "300px";
	const content = <div style={{ height: "1500px" }}>Content</div>;

	return (
		<>
			{/* Left side */}
			<View position="absolute" insetStart={4} insetTop={10} gap={2}>
				<Demo
					contentHeight={contentHeight}
					position="end"
					fallbackAdjustLayout
					fallbackPositions={false}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					contentHeight={contentHeight}
					position="end-bottom"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
			</View>

			<View position="absolute" insetStart={4} insetTop={80} gap={2}>
				<Demo
					position="top"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="top-end"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="bottom-end"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="bottom"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
			</View>

			<View position="absolute" insetBottom={4} insetStart={4} gap={2}>
				<Demo
					contentHeight={contentHeight}
					position="end-top"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					contentHeight={contentHeight}
					position="end"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
			</View>

			{/* Right side */}

			<View position="absolute" insetTop={10} insetEnd={4} gap={2}>
				<Demo
					contentHeight={contentHeight}
					position="start"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					contentHeight={contentHeight}
					position="start-bottom"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
			</View>

			<View position="absolute" insetEnd={4} insetTop={80} gap={2}>
				<Demo
					position="top-start"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="top"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="bottom-start"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					position="bottom"
					fallbackPositions={false}
					fallbackAdjustLayout
					contentWidth={contentWidth}
					containerRef={containerRef}
					children={content}
				/>
			</View>

			<View position="absolute" insetBottom={4} insetEnd={4} gap={2}>
				<Demo
					contentHeight={contentHeight}
					position="start-top"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
				<Demo
					contentHeight={contentHeight}
					position="start"
					fallbackPositions={false}
					fallbackAdjustLayout
					containerRef={containerRef}
					children={content}
				/>
			</View>
		</>
	);
};

export const fallbackAdjustLayout = {
	name: "fallbackAdjustLayout",
	render: () => {
		return (
			<Demo
				contentHeight={false}
				position="bottom-start"
				width="200px"
				fallbackAdjustLayout
				defaultActive
			>
				<div style={{ height: "600px" }}>Content</div>
			</Demo>
		);
	},
};

export const fallbackMinHeight = {
	name: "fallbackAdjustLayout, fallbackMinHeight",
	render: () => {
		return (
			<div style={{ height: "1000px", paddingTop: "700px" }}>
				<Demo
					contentHeight={false}
					position="bottom-start"
					width="200px"
					fallbackAdjustLayout
					defaultActive
					fallbackMinHeight="150px"
				>
					<div style={{ height: "600px" }}>Content</div>
				</Demo>
			</div>
		);
	},
};

export const fallbackAdjustLayoutShift = {
	name: "fallbackAdjustLayout, shift",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={10}>
				<View height="95vh" width="100%" align="center" justify="center">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						height="1000px"
						width="600px"
						padding={4}
						paddingBlock={15}
						overflow="auto"
					>
						<FallbackAdjustLayoutControls />
						<View height="150%" width="150%" attributes={{ style: { pointerEvents: "none" } }} />
					</View>
				</View>

				<View height="95vh" width="100%" align="center" justify="center">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						height="1000px"
						width="600px"
						attributes={{ ref: containerRef }}
						padding={4}
						paddingBlock={15}
						overflow="auto"
					>
						<FallbackAdjustLayoutControls containerRef={containerRef} />
						<View height="150%" width="150%" attributes={{ style: { pointerEvents: "none" } }} />
					</View>
				</View>

				<FallbackAdjustLayoutControls />
				<div style={{ height: "100vh", width: "250%" }} />
			</View>
		);
	},
};

export const fallbackAdjustLayoutSize = {
	name: "fallbackAdjustLayout, size",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={10}>
				<View height="95vh" width="100%" align="center" justify="center">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						height="1000px"
						width="600px"
						padding={4}
						paddingBlock={15}
						overflow="auto"
					>
						<FallbackAdjustLayoutControls large />
						<View height="150%" width="150%" attributes={{ style: { pointerEvents: "none" } }} />
					</View>
				</View>

				<View height="95vh" width="100%" align="center" justify="center">
					<View
						backgroundColor="neutral-faded"
						borderRadius="medium"
						height="1000px"
						width="600px"
						attributes={{ ref: containerRef }}
						padding={4}
						paddingBlock={15}
						overflow="auto"
					>
						<FallbackAdjustLayoutControls containerRef={containerRef} large />
						<View height="150%" width="150%" attributes={{ style: { pointerEvents: "none" } }} />
					</View>
				</View>

				<FallbackAdjustLayoutControls large />
				<div style={{ height: "100vh", width: "250%" }} />
			</View>
		);
	},
};

export const originCoordinates = {
	name: "originCoordinates",
	render: () => {
		return (
			<View gap={4} direction="row">
				<Demo position="bottom-start" originCoordinates={{ x: 150, y: 150 }} defaultActive />
			</View>
		);
	},
};

export const width = {
	name: "width",
	render: () => (
		<Example>
			<Example.Item title="width: 300px">
				<Demo width="300px" contentWidth={false} position="bottom" />
			</Example.Item>

			<Example.Item title="width: trigger">
				<Demo width="trigger" contentWidth={false} defaultActive />
			</Example.Item>
		</Example>
	),
};

export const contentGap = {
	name: "contentGap",
	render: () => <Demo contentGap={10} defaultActive />,
};

export const contentShift = {
	name: "contentShift",
	render: () => <Demo contentShift={10} defaultActive />,
};

export const contentMaxHeight = {
	name: "contentMaxHeight",
	render: () => (
		<Demo contentMaxHeight="500px" defaultActive contentHeight={false} fallbackAdjustLayout>
			<View gap={4}>
				{Array.from({ length: 20 }).map((_, index) => (
					<View.Item key={index}>Item {index + 1}</View.Item>
				))}
			</View>
		</Demo>
	),
};

export const disableContentHover: StoryObj = {
	name: "disableContentHover",
	render: () => <Demo triggerType="hover" disableContentHover />,
	// Can't trigger real mouse move from trigger to content in play function, so testing it manually
};

export const disableCloseOnOutsideClick: StoryObj = {
	name: "disableCloseOnOutsideClick",
	render: () => <Demo disableCloseOnOutsideClick />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			const content = canvas.getByText("Content");
			expect(content).toBeVisible();
		});

		await userEvent.click(document.body);
		await sleep(500);

		const content = canvas.getByText("Content");
		expect(content).toBeVisible();
	},
};

export const disableHideAnimation = {
	name: "disableHideAnimation",
	render: () => <Demo disableHideAnimation defaultActive />,
};

export const disabled: StoryObj<{ handleOpen: ReturnType<typeof fn> }> = {
	name: "disabled",
	args: {
		handleOpen: fn(),
	},
	render: () => (
		<Flyout disabled>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content />
			</Flyout.Content>
		</Flyout>
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
		const portalRef = React.useRef<HTMLDivElement>(null);
		const portalRef2 = React.useRef<HTMLDivElement>(null);
		const portalRef3 = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={4} direction="row">
				<View
					grow
					backgroundColor="neutral-faded"
					borderRadius="small"
					height={80}
					attributes={{ ref: portalRef, "data-testid": "container" }}
					justify="end"
					align="start"
					padding={4}
				>
					<Demo containerRef={portalRef} position="bottom-start" defaultActive />
				</View>
				<View
					grow
					backgroundColor="neutral-faded"
					borderRadius="small"
					height={80}
					attributes={{ ref: portalRef2 }}
					justify="start"
					align="end"
					padding={4}
				>
					<Demo containerRef={portalRef2} position="top-end" />
				</View>
				<View
					width={50}
					backgroundColor="neutral-faded"
					borderRadius="small"
					height={80}
					attributes={{ ref: portalRef3 }}
					padding={4}
					overflow="auto"
				>
					<View height={120} width="120%" justify="center" align="center">
						<Demo containerRef={portalRef3} position="bottom-end" />
					</View>
				</View>
			</View>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const containerEl = canvas.getByTestId("container");
		const contentEl = canvas.getAllByText("Content")[0];

		expect(containerEl).toContainElement(contentEl);
	},
};

export const positionRef: StoryObj = {
	name: "positionRef",
	render: () => {
		const ref = React.useRef<HTMLButtonElement>(null);

		return (
			<View gap={10}>
				<View.Item>
					<Flyout position="bottom" positionRef={ref} width="trigger" active>
						<Flyout.Trigger>
							{(attributes) => <Button attributes={attributes}>Trigger</Button>}
						</Flyout.Trigger>
						<Flyout.Content
							attributes={{
								style: {
									background: "var(--rs-color-background-elevation-overlay)",
									padding: "var(--rs-unit-x4)",
									borderRadius: "var(--rs-radius-medium)",
									border: "1px solid var(--rs-color-border-neutral-faded)",
									boxSizing: "border-box",
								},
							}}
						>
							Content
						</Flyout.Content>
					</Flyout>
				</View.Item>

				<Button onClick={() => {}} ref={ref}>
					Trigger 2
				</Button>
			</View>
		);
	},
};

export const initialFocusRef: StoryObj = {
	name: "initialFocusRef",
	render: () => {
		const initialFocusRef = React.useRef<HTMLInputElement>(null);

		return (
			<Demo initialFocusRef={initialFocusRef}>
				<View gap={4}>
					<Button onClick={() => {}}>Action 1</Button>
					<TextField name="foo" inputAttributes={{ ref: initialFocusRef }} />
				</View>
			</Demo>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			const input = canvas.getByRole("textbox");
			expect(input).toBe(document.activeElement);
		});
	},
};

export const instanceRef: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "instanceRef",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => {
		const flyoutRef = React.useRef<FlyoutInstance>(null);

		return (
			<View direction="row" gap={4}>
				<Demo
					instanceRef={flyoutRef}
					disableCloseOnOutsideClick
					onOpen={args.handleOpen}
					onClose={args.handleClose}
				/>

				<Button onClick={() => flyoutRef.current?.open()}>Open</Button>
				<Button onClick={() => flyoutRef.current?.close()}>Close</Button>
			</View>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const openTrigger = canvas.getAllByRole("button")[1];
		const closeTrigger = canvas.getAllByRole("button")[2];

		await userEvent.click(openTrigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		await sleep(500);
		await userEvent.click(closeTrigger);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({});
		});
	},
};

export const contentAttributes: StoryObj = {
	name: "content: className, attributes",
	render: () => {
		return (
			<Flyout position="bottom" defaultActive>
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Trigger</Button>}
				</Flyout.Trigger>
				<Flyout.Content attributes={{ "data-testid": "test-id" }} className="test-classname">
					<Content />
				</Flyout.Content>
			</Flyout>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const content = canvas.getByTestId("test-id");

		expect(content).toHaveClass("test-classname");
	},
};

/*
 * Test edge cases
 */

class CustomElement extends window.HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		if (!this.shadowRoot) return;

		const node = (
			<Reshaped>
				<Demo defaultActive>
					Content
					<div id="test-id" />
				</Demo>
			</Reshaped>
		);
		const root = createRoot(this.shadowRoot);
		root.render(node);
	}
}

if (!window.customElements.get("custom-element-flyout")) {
	window.customElements.define("custom-element-flyout", CustomElement);
}

export const testShadowDom = {
	name: "test: shadow dom",
	// @ts-expect-error - custom-element-flyout is not a valid HTML element
	render: () => <custom-element-flyout />,
};

export const testInsideFixed: StoryObj = {
	name: "test: inside position fixed",
	render: () => (
		<React.Fragment>
			<View
				position="fixed"
				insetBottom={2}
				insetStart={2}
				insetEnd={2}
				backgroundColor="elevation-overlay"
				borderColor="neutral-faded"
				borderRadius="small"
				padding={4}
				zIndex={10}
				attributes={{ "data-testid": "container" }}
				height={20}
			>
				<Demo defaultActive position="top-start" />
			</View>
			<View paddingTop={18} gap={4}>
				<View height={200} backgroundColor="neutral-faded" borderRadius="small" />
				<View height={200} backgroundColor="neutral-faded" borderRadius="small" />
			</View>
		</React.Fragment>
	),
	play: ({ canvas }) => {
		const container = canvas.getByTestId("container");
		const content = canvas.getByText("Content");

		expect(container).toContainElement(content);
	},
};

export const testInsideSticky: StoryObj = {
	name: "test: inside position sticky",
	render: () => (
		<React.Fragment>
			<View
				position="sticky"
				insetTop={4}
				insetStart={0}
				insetEnd={0}
				backgroundColor="elevation-overlay"
				borderColor="neutral-faded"
				borderRadius="small"
				padding={4}
				zIndex={10}
				attributes={{ "data-testid": "container" }}
			>
				<Demo defaultActive />
			</View>
			<View gap={4} paddingTop={2}>
				<View height={200} backgroundColor="neutral-faded" borderRadius="small" />
				<View height={200} backgroundColor="neutral-faded" borderRadius="small" />
			</View>
		</React.Fragment>
	),
	play: ({ canvas }) => {
		const container = canvas.getByTestId("container");
		const content = canvas.getByText("Content");

		expect(container).toContainElement(content);
	},
};

export const testInsideScrollable = {
	name: "test: inside scrollable",
	render: () => {
		const containerRef = React.useRef<HTMLDivElement>(null);

		return (
			<View padding={20}>
				<View height={30} overflow="auto" backgroundColor="neutral-faded" borderRadius="small">
					<View height={50} attributes={{ ref: containerRef }} padding={20} paddingBottom={30}>
						<Demo position="bottom" />
					</View>
				</View>
			</View>
		);
	},
};

export const testInsideModal = {
	name: "test: inside modal",
	render: () => {
		return (
			<Modal active position="end">
				<View gap={4} align="start">
					<Modal.Title>Title</Modal.Title>
					<Demo position="bottom-start" />
					<View height={300} width={25} backgroundColor="neutral-faded" />
					<Demo position="start" />
					<View height={300} width={25} backgroundColor="neutral-faded" />
					<Demo position="bottom-start" />
				</View>
			</Modal>
		);
	},
};

export const testDynamicBounds = {
	name: "test: auto position update",
	render: () => {
		const [left, setLeft] = React.useState(50);
		const [top, setTop] = React.useState(50);
		const [size, setSize] = React.useState<"medium" | "large">("medium");
		const [contentSize, setContentSize] = React.useState<"medium" | "large">("medium");
		const flyoutRef = React.useRef<FlyoutInstance>(null);

		React.useEffect(() => {
			flyoutRef.current?.updatePosition();
		}, [left, top]);

		return (
			<View gap={4}>
				<View direction="row" gap={2}>
					<Button onClick={() => setLeft((prev) => prev - 10)}>Left</Button>
					<Button onClick={() => setLeft((prev) => prev + 10)}>Right</Button>
					<Button onClick={() => setTop((prev) => prev - 10)}>Up</Button>
					<Button onClick={() => setTop((prev) => prev + 10)}>Down</Button>
					<Button
						onClick={() => {
							setLeft(50);
							setTop(50);
						}}
					>
						Center
					</Button>
					<Button onClick={() => setSize("large")}>Large button</Button>
					<Button onClick={() => setSize("medium")}>Small button</Button>
					<Button onClick={() => setContentSize("large")}>Large content</Button>
					<Button onClick={() => setContentSize("medium")}>Small content</Button>
				</View>
				<View height={100}>
					<Flyout
						position="bottom"
						instanceRef={flyoutRef}
						disableCloseOnOutsideClick
						defaultActive
					>
						<Flyout.Trigger>
							{(attributes) => (
								<div style={{ position: "absolute", left: `${left}%`, top: `${top}%` }}>
									<Button color="primary" attributes={attributes} size={size}>
										Open
									</Button>
								</div>
							)}
						</Flyout.Trigger>
						<Flyout.Content>
							<Content
								height={contentSize === "large" ? 200 : undefined}
								width={contentSize === "large" ? 200 : undefined}
							/>
						</Flyout.Content>
					</Flyout>
				</View>
			</View>
		);
	},
};

export const testScopedTheming = {
	name: "test: content uses scope theme",
	render: () => (
		<View gap={3} align="start">
			<Button color="primary">Slate button</Button>
			<Theme name="reshaped">
				<Flyout triggerType="click" active position="bottom-start">
					<Flyout.Trigger>
						{(attributes) => (
							<Button color="primary" attributes={attributes}>
								Reshaped button
							</Button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>
						<Content>
							<View gap={1}>
								<View.Item>Portal content, rendered in body</View.Item>
								<Button color="primary">Reshaped button</Button>
							</View>
						</Content>
					</Flyout.Content>
				</Flyout>
			</Theme>
		</View>
	),
};

export const testWithoutFocusable: StoryObj = {
	name: "test: without focusable content",
	render: () => <Demo position="bottom-start" />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			const content = canvas.getByText("Content");
			expect(content).toBeVisible();
		});

		expect(document.activeElement).toBe(trigger);
	},
};

export const testChangeSize = {
	name: "test: size updates",
	render: () => {
		const [position, setPosition] = React.useState<FlyoutProps["position"]>("bottom-start");
		const [updatedHeight, setUpdatedHeight] = React.useState(false);

		return (
			<>
				<View direction="row" gap={4} align="center">
					<Select
						name="position"
						options={[
							"bottom-start",
							"bottom",
							"bottom-end",
							"top-start",
							"top",
							"top-end",
							"start-top",
							"start",
							"start-bottom",
							"end-top",
							"end",
							"end-bottom",
						].map((p) => ({ label: p, value: p }))}
						onChange={(args) => setPosition(args.value as FlyoutProps["position"])}
						value={position}
					/>
					<Switch name="height" onChange={(args) => setUpdatedHeight(args.checked)}>
						Change height
					</Switch>
				</View>
				<div
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Demo position={position} disableCloseOnOutsideClick active contentHeight={false}>
						<View
							backgroundColor="neutral-faded"
							borderRadius="small"
							height={updatedHeight ? 50 : 25}
							attributes={{ style: { transition: "0.2s ease-in-out" } }}
						/>
					</Demo>
				</div>
			</>
		);
	},
};
