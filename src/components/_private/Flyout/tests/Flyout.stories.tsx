import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import Theme from "components/Theme";
import Button from "components/Button";
import Flyout from "components/_private/Flyout";

export default { title: "Utilities/Internal/Flyout" };

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
						height: 100,
						width: 160,
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

export const positions = () => (
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

export const modeDialogClick = () => (
	<Demo position="bottom-start" trapFocusMode="dialog">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const modeActionMenuClick = () => (
	<Demo position="bottom-start" trapFocusMode="action-menu">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const modeContentMenuClick = () => (
	<Demo position="bottom-start" trapFocusMode="content-menu">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const modeDialogHover = () => (
	<Demo position="bottom-start" trapFocusMode="dialog" triggerType="hover">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const modeActionMenuHover = () => (
	<Demo position="bottom-start" trapFocusMode="action-menu" triggerType="hover">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const modeContentMenuHover = () => (
	<Demo position="bottom-start" trapFocusMode="content-menu" triggerType="hover">
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const disableContentHover = () => (
	<Demo triggerType="hover" disableContentHover>
		Content
	</Demo>
);

export const customPortalTarget = () => {
	const portalRef = React.useRef<HTMLDivElement | null>(null);

	return (
		<div
			style={{ position: "relative", padding: 16, height: 200, overflow: "auto" }}
			ref={portalRef}
		>
			<Flyout position="bottom-start" containerRef={portalRef} active>
				<Flyout.Trigger>{(attributes) => <button {...attributes}>Open</button>}</Flyout.Trigger>
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
			<div style={{ height: 1000 }} />
		</div>
	);
};

export const testWidthOverflowOnMobile = () => (
	<Demo position="bottom-start" width={600}>
		Should work on mobile
		<button type="button">Item 1</button>
		<button type="button">Item 2</button>
		<button type="button">Close</button>
	</Demo>
);

export const testInsideScrollArea = () => (
	<Example>
		<Example.Item title="should move the content on area scroll">
			<div style={{ overflow: "scroll", height: 200, margin: 40, position: "relative" }}>
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
				<View height="300px" backgroundColor="neutral-faded" />
			</div>
			<div style={{ height: 2000 }} />
		</Example.Item>
	</Example>
);

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
	const [left, setLeft] = React.useState("50%");
	const [size, setSize] = React.useState<"medium" | "large">("medium");

	return (
		<View gap={4}>
			<View direction="row" gap={2}>
				<Button onClick={() => setLeft("0%")}>Left</Button>
				<Button onClick={() => setLeft("50%")}>Center</Button>
				<Button onClick={() => setLeft("100%")}>Right</Button>
				<Button onClick={() => setSize("large")}>Large button</Button>
				<Button onClick={() => setSize("medium")}>Small button</Button>
			</View>
			<View height={100}>
				<Flyout position="bottom" active>
					<Flyout.Trigger>
						{(attributes) => (
							<div style={{ position: "absolute", left, top: "50%" }}>
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
		</View>
	);
};

export const widthTrigger = () => (
	<Flyout triggerType="click" width="trigger" position="bottom">
		<Flyout.Trigger>
			{(attributes) => <button {...attributes}>Trigger with long text</button>}
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
);

export const scopedTheming = () => (
	<View gap={3} align="start">
		<Button color="primary">Reshaped button</Button>
		<Theme name="twitter">
			<Flyout triggerType="click" active position="bottom-start">
				<Flyout.Trigger>
					{(attributes) => (
						<Button color="primary" attributes={attributes}>
							Twitter button
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
							<Button color="primary">Twitter button</Button>
						</View>
					</div>
				</Flyout.Content>
			</Flyout>
		</Theme>
	</View>
);
