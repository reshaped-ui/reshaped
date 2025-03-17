import React from "react";
import { createRoot } from "react-dom/client";
import { StoryObj } from "@storybook/react";
import { userEvent, waitFor, within, expect, fn } from "@storybook/test";
import { Example } from "utilities/storybook";
import Reshaped from "components/Reshaped";
import View from "components/View";
import Theme from "components/Theme";
import Button from "components/Button";
import Flyout, { FlyoutInstance, FlyoutProps } from "components/_private/Flyout";
import TextField from "components/TextField";
import MenuItem from "components/MenuItem";
import { sleep } from "utilities/helpers";

export default { title: "Internal/Flyout" };

/**
 * Unit
 * - groupTimeouts
 * - id
 * - contentClassName
 * - contentAttributes
 * - content attributes
 * - content className
 */

const Content = (props: {
	height?: number;
	width?: number | false;
	children?: React.ReactNode;
}) => (
	<div
		style={{
			background: "var(--rs-color-background-elevation-overlay)",
			padding: "var(--rs-unit-x4)",
			height: props.height ?? 150,
			minWidth: props.width === false ? undefined : props.width || 160,
			borderRadius: "var(--rs-radius-medium)",
			border: "1px solid var(--rs-color-border-neutral-faded)",
			boxSizing: "border-box",
		}}
	>
		{props.children || "Content"}
	</div>
);

const Demo = (props: FlyoutProps & { contentHeight?: number; contentWidth?: number | false }) => {
	const { position = "bottom-start", children, contentHeight, contentWidth, ...rest } = props;

	return (
		<Flyout position={position} {...rest}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>{position}</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<Content height={contentHeight} width={contentWidth}>
					{children}
				</Content>
			</Flyout.Content>
		</Flyout>
	);
};

export const position = {
	name: "position",
	render: () => {
		return (
			<View gap={4} padding={50} align="center" justify="center">
				<View gap={4} direction="row">
					<Demo position="top-start" />
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
					<Demo position="bottom-end" defaultActive />
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

export const modes = {
	name: "triggerType, trapFocusMode",
	render: () => {
		return (
			<Example>
				<Example.Item
					title={[
						"triggerType: click, trapFocusMode: dialog",
						"tab navigation, completely traps the focus inside",
					]}
				>
					<Demo position="bottom-start" trapFocusMode="dialog">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item
					title={[
						"triggerType: click, trapFocusMode: action-menu",
						"arrow navigation, tab closes the content",
					]}
				>
					<Demo position="bottom-start" trapFocusMode="action-menu">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item
					title={[
						"triggerType: click, trapFocusMode: content-menu",
						"tab navigation, simulates natural focus order for navigation menus",
					]}
				>
					<Demo position="bottom-start" trapFocusMode="content-menu">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item title="triggerType: hover, trapFocusMode: dialog">
					<Demo position="bottom-start" trapFocusMode="dialog" triggerType="hover">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item title="triggerType: hover, trapFocusMode: action-menu">
					<Demo position="bottom-start" trapFocusMode="action-menu" triggerType="hover">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item title="triggerType: hover, trapFocusMode: content-menu">
					<Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover">
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
							<Button onClick={() => {}}>Action 3</Button>
						</View>
					</Demo>
				</Example.Item>

				<Example.Item
					title={[
						"triggerType: hover, trapFocusMode: content-menu, no focusable elements inside",
						"keeps the focus on trigger",
					]}
				>
					<Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover" />
				</Example.Item>

				<Example.Item
					title={[
						"triggerType: focus, trapFocusMode: selection-menu",
						"keeps real focus on trigger and simulates arrow key item selection focus on the content",
					]}
				>
					<Demo position="bottom-start" trapFocusMode="selection-menu" triggerType="focus">
						<View gap={1}>
							<MenuItem onClick={() => {}} roundedCorners>
								Action 1
							</MenuItem>
							<MenuItem onClick={() => {}} roundedCorners>
								Action 2
							</MenuItem>
							<MenuItem onClick={() => {}} roundedCorners>
								Action 3
							</MenuItem>
						</View>
					</Demo>
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
				<Example.Item title="position: top, no fallbacks passed">
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
				<Demo width="300px" position="bottom" />
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

export const disableContentHover = {
	name: "disableContentHover",
	render: () => <Demo triggerType="hover" disableContentHover />,
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

		return (
			<View
				backgroundColor="neutral-faded"
				borderRadius="small"
				height={80}
				attributes={{ ref: portalRef, "data-testid": "container" }}
				justify="end"
				align="start"
				padding={4}
			>
				<Demo containerRef={portalRef} defaultActive position="bottom-start" />
			</View>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const containerEl = canvas.getByTestId("container");
		const contentEl = canvas.getByText("Content");

		expect(containerEl).toContainElement(contentEl);
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
					{(attributes) => <Button attributes={attributes}>`Trigger</Button>}
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
	// @ts-ignore
	render: () => <custom-element-flyout />,
};

export const testInsideFixed: StoryObj = {
	name: "test: inside position fixed",
	render: () => (
		<React.Fragment>
			<View
				position="fixed"
				insetTop={2}
				insetStart={2}
				insetEnd={2}
				backgroundColor="elevation-overlay"
				borderColor="neutral-faded"
				borderRadius="small"
				padding={4}
				zIndex={10}
				attributes={{ "data-testid": "container" }}
			>
				<Demo defaultActive />
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
			<View padding={50}>
				<View height={30} overflow="auto" backgroundColor="neutral-faded" borderRadius="small">
					<View height={50} attributes={{ ref: containerRef }} padding={4} paddingBottom={30}>
						<Demo position="start" />
					</View>
				</View>
			</View>
		);
	},
};

export const testDynamicBounds = {
	name: "test: auto position update",
	render: () => {
		const [left, setLeft] = React.useState(50);
		const [top, setTop] = React.useState(50);
		const [size, setSize] = React.useState<"medium" | "large">("medium");
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
				</View>
				<View height={100}>
					<Flyout position="bottom" instanceRef={flyoutRef} disableCloseOnOutsideClick>
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
							<Content />
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
			<Button color="primary">Reshaped button</Button>
			<Theme name="slate">
				<Flyout triggerType="click" active position="bottom-start">
					<Flyout.Trigger>
						{(attributes) => (
							<Button color="primary" attributes={attributes}>
								Slate button
							</Button>
						)}
					</Flyout.Trigger>
					<Flyout.Content>
						<Content>
							<View gap={1}>
								<View.Item>Portal content, rendered in body</View.Item>
								<Button color="primary">Slate button</Button>
							</View>
						</Content>
					</Flyout.Content>
				</Flyout>
			</Theme>
		</View>
	),
};
