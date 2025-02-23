import { StoryObj } from "@storybook/react";
import { expect, within, userEvent, waitFor, fn } from "@storybook/test";
import Tabs from "components/Tabs";

export default {
	title: "Components/Tabs/tests",
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

			<Tabs.Panel value="1">Content 1</Tabs.Panel>
			<Tabs.Panel value="2">Content 2</Tabs.Panel>
		</Tabs>
	),
	play: async ({ canvas }) => {
		const list = canvas.getByRole("tablist");
		const items = canvas.getAllByRole("tab");
		const panels = canvas.getAllByRole("tabpanel");

		expect(list).toBeInTheDocument();
		expect(items).toHaveLength(2);
		expect(panels).toHaveLength(2);

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
