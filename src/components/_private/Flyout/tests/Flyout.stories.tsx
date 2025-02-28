import React from "react";
import { createRoot } from "react-dom/client";
import { Example } from "utilities/storybook";
import Reshaped from "components/Reshaped";
import View from "components/View";
import Theme from "components/Theme";
import Button from "components/Button";
import Flyout, { FlyoutInstance, FlyoutProps } from "components/_private/Flyout";
import TextField from "components/TextField";

export default { title: "Internal/Flyout" };

const Demo = (props: any) => {
	const { position = "bottom-start", children, ...rest } = props;

	return (
		<Flyout triggerType="click" position={position} {...rest}>
			<Flyout.Trigger>
				{(attributes) => <Button attributes={attributes}>{position}</Button>}
			</Flyout.Trigger>
			<Flyout.Content>
				<div
					style={{
						background: "var(--rs-color-background-elevation-overlay)",
						padding: "var(--rs-unit-x4)",
						height: 150,
						minWidth: 160,
						borderRadius: "var(--rs-radius-medium)",
						border: "1px solid var(--rs-color-border-neutral-faded)",
						boxSizing: "border-box",
					}}
				>
					{children || "Content"}
				</div>
			</Flyout.Content>
		</Flyout>
	);
};

export const position = () => (
	<div style={{ paddingTop: 200 }}>
		<View gap={3} direction="row">
			<Demo position="bottom-start" />
			<Demo position="bottom-end" />
			<Demo position="bottom" />

			<Demo position="top-start" />
			<Demo position="top-end" />
			<Demo position="top" />

			<Demo position="end" />
			<Demo position="end-top" />
			<Demo position="end-bottom" />

			<Demo position="start" />
			<Demo position="start-top" />
			<Demo position="start-bottom" />
		</View>
	</div>
);

export const dynamicPosition = () => (
	<div style={{ position: "absolute", top: 0, left: "50%" }}>
		<Demo position="top" />
	</div>
);

export const originCoordinates = () => {
	const [coordinates, setCoordinates] = React.useState<FlyoutProps["originCoordinates"] | null>(
		null
	);

	return (
		<Example>
			<Example.Item>
				<View
					height={25}
					width={25}
					attributes={{
						onContextMenu: (e) => {
							e.preventDefault();
							setCoordinates({ x: e.clientX, y: e.clientY });
						},
					}}
					backgroundColor="neutral-faded"
					borderRadius="medium"
				/>
				<br /> <br />
				<Demo
					position="top"
					originCoordinates={coordinates}
					active={!!coordinates}
					onClose={() => setCoordinates(null)}
				/>
			</Example.Item>
		</Example>
	);
};

export const modes = () => (
	<Example>
		<Example.Item title="dialog click">
			<Demo position="bottom-start" trapFocusMode="dialog">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>

		<Example.Item title="action-menu click">
			<Demo position="bottom-start" trapFocusMode="action-menu">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>

		<Example.Item title="content-menu click">
			<Demo position="bottom-start" trapFocusMode="content-menu">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>

		<Example.Item title="dialog hover">
			<Demo position="bottom-start" trapFocusMode="dialog" triggerType="hover">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>

		<Example.Item title="action-menu hover">
			<Demo position="bottom-start" trapFocusMode="action-menu" triggerType="hover">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>

		<Example.Item title="content-menu hover without buttons">
			<Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover">
				<div style={{ height: 50, width: 50, background: "tomato" }} />
			</Demo>
		</Example.Item>

		<Example.Item title="content-menu hover">
			<Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover">
				<button type="button">Item 1</button>
				<button type="button">Item 2</button>
				<button type="button">Close</button>
			</Demo>
		</Example.Item>
	</Example>
);

export const width = () => (
	<Example>
		<Example.Item title="width: 300px">
			<Demo width="300px" position="bottom" />
		</Example.Item>
		<Example.Item title="width: trigger">
			<Flyout triggerType="click" width="trigger" position="bottom">
				<Flyout.Trigger>
					{(attributes) => <Button attributes={attributes}>Trigger with long text</Button>}
				</Flyout.Trigger>
				<Flyout.Content>
					<div
						style={{
							background: "var(--rs-color-background-elevation-overlay)",
							padding: "var(--rs-unit-x4)",
							borderRadius: "var(--rs-radius-medium)",
							border: "1px solid var(--rs-color-border-neutral-faded)",
							boxSizing: "border-box",
						}}
					></div>
				</Flyout.Content>
			</Flyout>
		</Example.Item>
	</Example>
);

export const offset = () => (
	<Example>
		<Example.Item title="contentGap: x10">
			<Demo contentGap={10} />
		</Example.Item>
		<Example.Item title="contentShift: x10">
			<Demo contentShift={10} />
		</Example.Item>
	</Example>
);

export const disableFlags = () => (
	<Example>
		<Example.Item title="disableContentHover">
			<Demo triggerType="hover" disableContentHover>
				Content
			</Demo>
		</Example.Item>

		<Example.Item title="disableCloseOnOutsideClick">
			<Demo disableCloseOnOutsideClick>Content</Demo>
		</Example.Item>

		<Example.Item title="disableHideAnimation">
			<Demo disableHideAnimation>Content</Demo>
		</Example.Item>
	</Example>
);

export const initialFocus = () => {
	const initialFocusRef = React.useRef<HTMLInputElement>(null);

	return (
		<Example>
			<Example.Item title="focuses input on open">
				<Demo initialFocusRef={initialFocusRef}>
					<View gap={4}>
						<Button onClick={() => {}}>Click me</Button>
						<TextField name="foo" inputAttributes={{ ref: initialFocusRef }} />
					</View>
				</Demo>
			</Example.Item>
		</Example>
	);
};

class CustomElement extends window.HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		if (!this.shadowRoot) return;

		const node = (
			<Reshaped>
				<Flyout active>
					<Flyout.Trigger>{(attributes) => <button {...attributes}>Open</button>}</Flyout.Trigger>
					<Flyout.Content>Content</Flyout.Content>
				</Flyout>
			</Reshaped>
		);
		const root = createRoot(this.shadowRoot);
		root.render(node);
	}
}

if (!window.customElements.get("custom-element")) {
	window.customElements.define("custom-element", CustomElement);
}

export const customPortalTarget = () => {
	const portalRef = React.useRef<HTMLDivElement>(null);

	return (
		<Example>
			<Example.Item title="Custom containerRef">
				<View
					padding={4}
					paddingInline={40}
					height={50}
					overflow="auto"
					backgroundColor="neutral-faded"
					borderRadius="small"
					attributes={{ ref: portalRef }}
				>
					<Flyout position="bottom-end" active>
						<Flyout.Trigger>{(attributes) => <button {...attributes}>Open</button>}</Flyout.Trigger>
						<Flyout.Content>
							<div
								style={{
									background: "var(--rs-color-background-elevation-overlay)",
									padding: "var(--rs-unit-x4)",
									height: 200,
									width: 160,
									borderRadius: "var(--rs-radius-medium)",
									border: "1px solid var(--rs-color-border-neutral-faded)",
									boxSizing: "border-box",
								}}
							>
								{"Content"}
							</div>
						</Flyout.Content>
					</Flyout>
					<div style={{ height: 1000 }} />
				</View>
			</Example.Item>
			<Example.Item title="Shadow dom">
				{/* @ts-ignore */}
				<custom-element />
			</Example.Item>
		</Example>
	);
};

export const testInsideFixed = () => (
	<Example>
		<Example.Item title="should move the content on page scroll">
			<View
				position="fixed"
				insetTop={20}
				insetStart={0}
				insetEnd={0}
				backgroundColor="neutral-faded"
				padding={4}
			>
				<Flyout triggerType="click" position="bottom-start">
					<Flyout.Trigger>{(attributes) => <button {...attributes}>Foo</button>}</Flyout.Trigger>
					<Flyout.Content>
						<div
							style={{
								background: "var(--rs-color-background-elevation-overlay)",
								padding: "var(--rs-unit-x4)",
								height: 100,
								width: 160,
								borderRadius: "var(--rs-radius-medium)",
								border: "1px solid var(--rs-color-border-neutral-faded)",
								boxSizing: "border-box",
							}}
						>
							{"Content"}
						</div>
					</Flyout.Content>
				</Flyout>
			</View>
			<div style={{ height: 2000 }} />
		</Example.Item>
	</Example>
);

export const testDynamicBounds = () => {
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
				<Flyout
					position="bottom"
					instanceRef={flyoutRef}
					disableCloseOnOutsideClick
					fallbackPositions={["top", "bottom"]}
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
						<div
							style={{
								background: "var(--rs-color-background-elevation-overlay)",
								padding: "var(--rs-unit-x4)",
								height: 100,
								minWidth: 160,
								borderRadius: "var(--rs-radius-medium)",
								border: "1px solid var(--rs-color-border-neutral-faded)",
								boxSizing: "border-box",
							}}
						>
							Content
						</div>
					</Flyout.Content>
				</Flyout>
			</View>
		</View>
	);
};

export const testDisableOutsideClick = () => {
	return (
		<Example>
			<Example.Item title="opening second flyout shouldn't block the first one from closing">
				<View direction="row" gap={4}>
					<Demo disableCloseOnOutsideClick />
					<Demo />
				</View>
			</Example.Item>
		</Example>
	);
};

export const testScopedTheming = () => (
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
					<div
						style={{
							background: "var(--rs-color-background-elevation-overlay)",
							padding: 8,
							border: "1px solid var(--rs-color-border-neutral-faded)",
							boxSizing: "border-box",
						}}
					>
						<View gap={1}>
							<View.Item>Portal content, rendered in body</View.Item>
							<Button color="primary">Slate button</Button>
						</View>
					</div>
				</Flyout.Content>
			</Flyout>
		</Theme>
	</View>
);
