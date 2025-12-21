import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "components/Button";
import ScrollArea from "components/ScrollArea";
import Tabs from "components/Tabs";
import Text from "components/Text";
import View from "components/View";
import IconZap from "icons/Zap";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/tabs",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => (
		<Tabs>
			<Tabs.List>
				<Tabs.Item value="1">Item 1</Tabs.Item>
				<Tabs.Item value="2">Item 2</Tabs.Item>
			</Tabs.List>

			<Tabs.Panel value="1">
				<View padding={4}>Content 1</View>
			</Tabs.Panel>
			<Tabs.Panel value="2">
				<View padding={4}>Content 2</View>
			</Tabs.Panel>
		</Tabs>
	),
	play: async ({ canvas }) => {
		const list = canvas.getByRole("tablist");
		const items = canvas.getAllByRole("tab");
		const panels = canvas.getAllByRole("tabpanel", { hidden: true });

		expect(list).toBeInTheDocument();
		expect(items).toHaveLength(2);
		expect(panels).toHaveLength(2);
		expect(panels[0]).toBeVisible();
		expect(panels[1]).not.toBeVisible();

		const selectedItem = items[0];
		const selectedPanel = panels[0];
		expect(selectedItem).toHaveAttribute("aria-selected", "true");
		expect(selectedItem.getAttribute("aria-controls")).toBe(selectedPanel.getAttribute("id"));

		const unselectedItem = items[1];
		const unselectedPanel = panels[1];
		expect(unselectedItem).toHaveAttribute("aria-selected", "false");
		expect(unselectedItem.getAttribute("aria-controls")).toBe(unselectedPanel.getAttribute("id"));

		await userEvent.tab();
		expect(document.activeElement).toBe(items[0]);

		await userEvent.tab();
		waitFor(() => {
			expect(document.activeElement).toBe(panels[0]);
		});
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: default">
				<Tabs defaultValue="0">
					<Tabs.List>
						<Tabs.Item value="0">Long item 2</Tabs.Item>
						<Tabs.Item value="1">Item 1</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: pills">
				<Tabs variant="pills" defaultValue="0">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: pills-elevated">
				<Tabs variant="pills-elevated" defaultValue="0">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: borderless">
				<Tabs variant="borderless" defaultValue="0">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="variant: default, size: large">
				<Tabs size="large">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: pills, size: large">
				<Tabs variant="pills" size="large">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: pills-elevated, size: large">
				<Tabs variant="pills-elevated" size="large">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="variant: borderless, size: large">
				<Tabs variant="borderless" size="large">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const direction = {
	name: "direction",
	render: () => (
		<Example>
			<Example.Item title="direction: column, variant: underline">
				<Tabs direction="column">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="direction: column, variant: pills">
				<Tabs direction="column" variant="pills">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="direction: column, variant: pills-elevated">
				<Tabs direction="column" variant="pills-elevated">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="direction: column, variant: borderless">
				<Tabs direction="column" variant="borderless">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "icon",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<Tabs>
					<Tabs.List>
						<Tabs.Item value="0" icon={IconZap}>
							Item 1
						</Tabs.Item>
						<Tabs.Item value="1" icon={IconZap}>
							Long item 2
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="icon only">
				<Tabs variant="pills-elevated">
					<Tabs.List>
						<Tabs.Item value="0" icon={IconZap} attributes={{ "aria-label": "Tab 1" }} />
						<Tabs.Item value="1" icon={IconZap} attributes={{ "aria-label": "Tab 2" }} />
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const equalWidth = {
	name: "itemWidth",
	render: () => (
		<Example>
			<Example.Item title="equal width items">
				<Tabs onChange={console.log} itemWidth="equal">
					<Tabs.List>
						<Tabs.Item value="0" icon={IconZap}>
							Item 1
						</Tabs.Item>
						<Tabs.Item value="1" icon={IconZap}>
							Long item 2
						</Tabs.Item>
						<Tabs.Item value="2" icon={IconZap}>
							Very long item 3
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>

			<Example.Item title="equal width items, pills-elevated">
				<Tabs onChange={console.log} itemWidth="equal" variant="pills-elevated">
					<Tabs.List>
						<Tabs.Item value="0" icon={IconZap}>
							Item 1
						</Tabs.Item>
						<Tabs.Item value="1" icon={IconZap}>
							Long item 2
						</Tabs.Item>
						<Tabs.Item value="2" icon={IconZap}>
							Very long item 3 sdkjds skd
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const href = {
	name: "href",
	render: () => (
		<Example>
			<Example.Item title="href, no onChange">
				<Tabs value="2">
					<Tabs.List>
						<Tabs.Item value="1" href="#item-1" icon={IconZap}>
							Item 1
						</Tabs.Item>
						<Tabs.Item value="2" href="#item-2" icon={IconZap}>
							Long item 2
						</Tabs.Item>
						<Tabs.Item value="3" href="#item-3" icon={IconZap}>
							Very long item 3
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "item, disabled",
	render: () => {
		return (
			<Example>
				<Example.Item title="disabled">
					<Tabs defaultValue="1">
						<Tabs.List>
							<Tabs.Item value="1">Item 1</Tabs.Item>
							<Tabs.Item value="2" disabled icon={IconZap}>
								Item 2
							</Tabs.Item>
							<Tabs.Item value="3">Item 3</Tabs.Item>
						</Tabs.List>

						<Tabs.Panel value="1">
							<View padding={4}>Content 1</View>
						</Tabs.Panel>
						<Tabs.Panel value="2">
							<View padding={4}>Content 2</View>
						</Tabs.Panel>
						<Tabs.Panel value="3">
							<View padding={4}>Content 3</View>
						</Tabs.Panel>
					</Tabs>
				</Example.Item>

				<Example.Item title="disabled, href">
					<Tabs defaultValue="1">
						<Tabs.List>
							<Tabs.Item href="#item1" value="1">
								Item 1
							</Tabs.Item>
							<Tabs.Item href="#item2" value="2" disabled icon={IconZap}>
								Item 2
							</Tabs.Item>
							<Tabs.Item href="#item3" value="3">
								Item 3
							</Tabs.Item>
						</Tabs.List>

						<Tabs.Panel value="1">
							<View padding={4}>Content 1</View>
						</Tabs.Panel>
						<Tabs.Panel value="2">
							<View padding={4}>Content 2</View>
						</Tabs.Panel>
						<Tabs.Panel value="3">
							<View padding={4}>Content 3</View>
						</Tabs.Panel>
					</Tabs>
				</Example.Item>
			</Example>
		);
	},
	play: ({ canvas }) => {
		const items = canvas.getAllByRole("tab");

		expect(items[0]).not.toBeDisabled();
		expect(items[1]).toBeDisabled();
		expect(items[2]).not.toBeDisabled();

		expect(items[3]).toHaveAttribute("href");
		expect(items[4]).not.toHaveAttribute("href");
		expect(items[5]).toHaveAttribute("href");
	},
};

export const defaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Tabs defaultValue="2" onChange={args.handleChange}>
			<Tabs.List>
				<Tabs.Item value="1">Item 1</Tabs.Item>
				<Tabs.Item value="2">Item 2</Tabs.Item>
			</Tabs.List>

			<Tabs.Panel value="1">Content 1</Tabs.Panel>
			<Tabs.Panel value="2">Content 2</Tabs.Panel>
		</Tabs>
	),
	play: async ({ canvas, args }) => {
		const items = canvas.getAllByRole("tab");

		expect(items[1]).toHaveAttribute("aria-selected", "true");
		expect(items[1]).toHaveAttribute("tabindex", "0");
		expect(items[0]).toHaveAttribute("tabindex", "-1");

		await userEvent.click(items[0]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ value: "1" });

		expect(document.activeElement).toBe(items[0]);
		expect(items[0]).toHaveAttribute("aria-selected", "true");
		expect(items[0]).toHaveAttribute("tabindex", "0");
		expect(items[1]).toHaveAttribute("tabindex", "-1");
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Tabs value="2" onChange={args.handleChange}>
			<Tabs.List>
				<Tabs.Item value="1">Item 1</Tabs.Item>
				<Tabs.Item value="2">Item 2</Tabs.Item>
			</Tabs.List>

			<Tabs.Panel value="1">Content 1</Tabs.Panel>
			<Tabs.Panel value="2">Content 2</Tabs.Panel>
		</Tabs>
	),
	play: async ({ canvas, args }) => {
		const items = canvas.getAllByRole("tab");

		expect(items[1]).toHaveAttribute("aria-selected", "true");
		expect(items[1]).toHaveAttribute("tabindex", "0");
		expect(items[0]).toHaveAttribute("tabindex", "-1");

		await userEvent.click(items[0]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ value: "1" });

		expect(document.activeElement).toBe(items[0]);
		expect(items[1]).toHaveAttribute("aria-selected", "true");
		expect(items[1]).toHaveAttribute("tabindex", "0");
		expect(items[0]).toHaveAttribute("tabindex", "-1");
	},
};

export const disableSelectionAnimation: StoryObj = {
	name: "disableSelectionAnimation",
	render: () => (
		<Example>
			<Example.Item title="disableSelectionAnimation">
				<Tabs disableSelectionAnimation>
					<Tabs.List>
						<Tabs.Item value="1">Item 1</Tabs.Item>
						<Tabs.Item value="2">Item 2</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="disableSelectionAnimation, href">
				<Tabs disableSelectionAnimation variant="pills">
					<Tabs.List>
						<Tabs.Item value="1">Item 1</Tabs.Item>
						<Tabs.Item value="2">Item 2</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Tabs>
				<Tabs.List attributes={{ id: "test-list-id" }} className="test-list-classname">
					<Tabs.Item attributes={{ id: "test-item-id" }} value="1">
						Item
					</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel
					attributes={{ "data-testid": "test-panel-id" }}
					className="test-panel-classname"
					value="1"
				/>
			</Tabs>
		</div>
	),
	play: async ({ canvas }) => {
		const list = canvas.getByTestId("root").firstChild as HTMLElement;
		const item = within(list).getByRole("presentation");
		const panel = canvas.getByRole("tabpanel");

		expect(list).toHaveClass("test-list-classname");
		expect(list).toHaveAttribute("id", "test-list-id");
		expect(item).toHaveAttribute("id", "test-item-id");
		expect(panel).toHaveClass("test-panel-classname");
		expect(panel).toHaveAttribute("data-testid", "test-panel-id");
	},
};

export const testFocusableContent = {
	name: "test: focusable content",
	render: () => (
		<Example>
			<Example.Item title="panels without focusable content">
				<Tabs>
					<View gap={4}>
						<Tabs.List>
							<Tabs.Item value="0">Item 1</Tabs.Item>
							<Tabs.Item value="1">Long item 2</Tabs.Item>
							<Tabs.Item value="2">Very long item 3</Tabs.Item>
						</Tabs.List>

						<Tabs.Panel value="0">Tab 1</Tabs.Panel>
						<Tabs.Panel value="1">Tab 2</Tabs.Panel>
						<Tabs.Panel value="2">Tab 3</Tabs.Panel>
					</View>
				</Tabs>
			</Example.Item>

			<Example.Item title="panels with focusable content">
				<Tabs>
					<View gap={4}>
						<Tabs.List>
							<Tabs.Item value="0">Item 1</Tabs.Item>
							<Tabs.Item value="1">Long item 2</Tabs.Item>
							<Tabs.Item value="2">Very long item 3</Tabs.Item>
						</Tabs.List>

						<Tabs.Panel value="0">
							<Button onClick={() => {}}>Tab 1 action</Button>
						</Tabs.Panel>
						<Tabs.Panel value="1">
							<Button onClick={() => {}}>Tab 2 action</Button>
						</Tabs.Panel>
						<Tabs.Panel value="2">
							<Button onClick={() => {}}>Tab 3 action</Button>
						</Tabs.Panel>
					</View>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const testComposition = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="Viewport overflow">
				<Tabs>
					<Tabs.List>
						{[...Array(8)].map((_, i) => (
							<Tabs.Item value={`${i}`} key={i} icon={IconZap}>
								Very long item {i}
							</Tabs.Item>
						))}
					</Tabs.List>

					{[...Array(8)].map((_, i) => (
						<Tabs.Panel value={`${i}`} key={i}>
							Tab {i}
						</Tabs.Panel>
					))}
				</Tabs>
			</Example.Item>
			<Example.Item>
				<Tabs onChange={console.log} variant="pills-elevated" name="hey">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">
							<View borderColor="neutral-faded" padding={5}>
								Item 3
							</View>
						</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
			<Example.Item title="Custom non-interactive list children">
				<Tabs direction="column">
					<Tabs.List>
						<Tabs.Item value="0">Item 1</Tabs.Item>
						<View height={6} backgroundColor="neutral-faded" borderRadius="small" />
						<Tabs.Item value="1">Long item 2</Tabs.Item>
						<Tabs.Item value="2">Very long item 3</Tabs.Item>
					</Tabs.List>
				</Tabs>
			</Example.Item>
		</Example>
	),
};

export const testEdgeCaseDom = {
	name: "test: scroll subscription",
	render: () => {
		const [activeItem, setActiveItem] = React.useState("1");
		const sectionsRef = React.useRef(null);

		return (
			<Example>
				<Example.Item title="active item changes on scroll">
					<View justify="center" align="center" padding={10}>
						<View width={60} gap={2}>
							<Tabs value={activeItem} onChange={(args) => setActiveItem(args.value)}>
								<Tabs.List>
									<Tabs.Item value="1">Item 1</Tabs.Item>
									<Tabs.Item value="2">Item 2</Tabs.Item>
									<Tabs.Item value="3">Item 3</Tabs.Item>
									<Tabs.Item value="4">Item 4</Tabs.Item>
								</Tabs.List>
							</Tabs>

							<ScrollArea
								attributes={{ ref: sectionsRef }}
								height={70}
								onScroll={(args) => {
									setActiveItem(Math.min(4, Math.floor(args.y * 10) + 1).toString());
								}}
							>
								<View gap={4}>
									<View gap={2}>
										<Text>Section 1</Text>

										<View gap={1} direction="row">
											{[...Array(4)].map((_, i) => (
												<View grow height="100px" backgroundColor="neutral-faded" key={i} />
											))}
										</View>
									</View>

									<View gap={2}>
										<Text>Section 2</Text>

										<View gap={1} direction="row">
											{[...Array(4)].map((_, i) => (
												<View key={i} grow height="100px" backgroundColor="neutral-faded" />
											))}
										</View>
									</View>

									<View gap={2}>
										<Text>Section 3</Text>

										<View gap={1} direction="row">
											{[...Array(4)].map((_, i) => (
												<View key={i} grow height="100px" backgroundColor="neutral-faded" />
											))}
										</View>
									</View>

									<View gap={2}>
										<Text>Section 4</Text>

										<View gap={1} direction="row">
											{[...Array(4)].map((_, i) => (
												<View key={i} grow height="100px" backgroundColor="neutral-faded" />
											))}
										</View>
									</View>
								</View>
							</ScrollArea>
						</View>
					</View>
				</Example.Item>
			</Example>
		);
	},
};
