import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import View from "@/components/View";
import { render } from "@/tests/render";

describe("Components/Tabs", () => {
	test("base, aria attributes", async () => {
		await render(
			<Tabs defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2">Item 2</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Content 1</Tabs.Panel>
				<Tabs.Panel value="2">Content 2</Tabs.Panel>
			</Tabs>
		);
		const items = page.getByRole("tab");
		const panels = page.getByRole("tabpanel", { includeHidden: true });

		await expect.element(page.getByRole("tablist")).toBeInTheDocument();
		expect(items.all()).toHaveLength(2);
		expect(panels.all()).toHaveLength(2);
		await expect.element(panels.nth(0)).toBeVisible();
		await expect.element(panels.nth(1)).not.toBeVisible();

		await expect.element(items.nth(0)).toHaveAttribute("aria-selected", "true");
		await expect
			.element(items.nth(0))
			.toHaveAttribute("aria-controls", panels.nth(0).element().getAttribute("id"));
		await expect
			.element(panels.nth(0))
			.toHaveAttribute("aria-labelledby", items.nth(0).element().getAttribute("id"));

		await expect.element(items.nth(1)).toHaveAttribute("aria-selected", "false");
		await expect
			.element(items.nth(1))
			.toHaveAttribute("aria-controls", panels.nth(1).element().getAttribute("id"));
	});

	test("base, focus moves from the active tab to the panel", async () => {
		await render(
			<Tabs defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2">Item 2</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Content 1</Tabs.Panel>
				<Tabs.Panel value="2">Content 2</Tabs.Panel>
			</Tabs>
		);
		const items = page.getByRole("tab");
		const panels = page.getByRole("tabpanel", { includeHidden: true });

		await userEvent.tab();
		await expect.element(items.nth(0)).toHaveFocus();

		await userEvent.tab();
		await expect.element(panels.nth(0)).toHaveFocus();
	});

	test("panel with focusable content doesn't get a tabindex", async () => {
		await render(
			<Tabs defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">
					<Button onClick={() => {}}>Action</Button>
				</Tabs.Panel>
			</Tabs>
		);

		await expect.element(page.getByRole("tabpanel")).not.toHaveAttribute("tabindex");

		await userEvent.tab();
		await expect.element(page.getByRole("tab")).toHaveFocus();

		await userEvent.tab();
		await expect.element(page.getByRole("button", { name: "Action" })).toHaveFocus();
	});

	test("arrow keys move focus between items", async () => {
		await render(
			<Tabs defaultValue="1">
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2">Item 2</Tabs.Item>
					<Tabs.Item value="3">Item 3</Tabs.Item>
				</Tabs.List>
			</Tabs>
		);
		const items = page.getByRole("tab");

		await userEvent.tab();
		await expect.element(items.nth(0)).toHaveFocus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(items.nth(1)).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(items.nth(0)).toHaveFocus();
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<Tabs defaultValue="2" onChange={handleChange}>
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2">Item 2</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Content 1</Tabs.Panel>
				<Tabs.Panel value="2">Content 2</Tabs.Panel>
			</Tabs>
		);
		const items = page.getByRole("tab");

		await expect.element(items.nth(1)).toHaveAttribute("aria-selected", "true");
		await expect.element(items.nth(1)).toHaveAttribute("tabindex", "0");
		await expect.element(items.nth(0)).toHaveAttribute("tabindex", "-1");

		await userEvent.click(items.nth(0));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ value: "1" });

		await expect.element(items.nth(0)).toHaveFocus();
		await expect.element(items.nth(0)).toHaveAttribute("aria-selected", "true");
		await expect.element(items.nth(0)).toHaveAttribute("tabindex", "0");
		await expect.element(items.nth(1)).toHaveAttribute("tabindex", "-1");
		await expect.element(page.getByText("Content 1")).toBeVisible();
	});

	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Tabs value="2" onChange={handleChange}>
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2">Item 2</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel value="1">Content 1</Tabs.Panel>
				<Tabs.Panel value="2">Content 2</Tabs.Panel>
			</Tabs>
		);
		const items = page.getByRole("tab");

		await expect.element(items.nth(1)).toHaveAttribute("aria-selected", "true");
		await expect.element(items.nth(1)).toHaveAttribute("tabindex", "0");
		await expect.element(items.nth(0)).toHaveAttribute("tabindex", "-1");

		await userEvent.click(items.nth(0));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ value: "1" });

		await expect.element(items.nth(0)).toHaveFocus();
		await expect.element(items.nth(1)).toHaveAttribute("aria-selected", "true");
		await expect.element(items.nth(1)).toHaveAttribute("tabindex", "0");
		await expect.element(items.nth(0)).toHaveAttribute("tabindex", "-1");
	});

	test("item, disabled doesn't trigger onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<Tabs defaultValue="1" onChange={handleChange}>
				<Tabs.List>
					<Tabs.Item value="1">Item 1</Tabs.Item>
					<Tabs.Item value="2" disabled>
						Item 2
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		);
		const items = page.getByRole("tab");

		await expect.element(items.nth(1)).toBeDisabled();
		await userEvent.click(items.nth(1), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(items.nth(0)).toHaveAttribute("aria-selected", "true");
	});

	test("className, attributes", async () => {
		await render(
			<Tabs defaultValue="1">
				<Tabs.List
					attributes={{ id: "test-list-id", "data-testid": "test-list" }}
					className="test-list-classname"
				>
					<Tabs.Item attributes={{ "data-test-id": "test-item-id" }} value="1">
						Item
					</Tabs.Item>
				</Tabs.List>

				<Tabs.Panel
					attributes={{ "data-testid": "test-panel-id" }}
					className="test-panel-classname"
					value="1"
				/>
			</Tabs>
		);
		const list = page.getByTestId("test-list");
		const item = list.getByRole("tab");
		const panel = page.getByRole("tabpanel");

		await expect.element(list).toHaveClass("test-list-classname");
		await expect.element(list).toHaveAttribute("id", "test-list-id");
		await expect.element(item).toHaveAttribute("data-test-id", "test-item-id");
		await expect.element(panel).toHaveClass("test-panel-classname");
		await expect.element(panel).toHaveAttribute("data-testid", "test-panel-id");
	});

	test("overflow on size change", async () => {
		const Component = () => {
			const [narrow, setNarrow] = React.useState(false);
			const [longLabel, setLongLabel] = React.useState(false);

			return (
				<View gap={3}>
					<View width={narrow ? "200px" : "640px"}>
						<Tabs defaultValue="0">
							<Tabs.List attributes={{ "data-testid": "container-tabs" }}>
								{[...Array(4)].map((_, i) => (
									<Tabs.Item value={`${i}`} key={i}>
										Item {i}
									</Tabs.Item>
								))}
							</Tabs.List>
						</Tabs>
					</View>
					<View direction="row">
						<Button onClick={() => setNarrow((v) => !v)}>Toggle container width</Button>
					</View>

					<View width="200px">
						<Tabs defaultValue="0">
							<Tabs.List attributes={{ "data-testid": "content-tabs" }}>
								<Tabs.Item value="0">Item 0</Tabs.Item>
								<Tabs.Item value="1">
									{longLabel ? "Very long item label that doesn't fit" : "Item 1"}
								</Tabs.Item>
							</Tabs.List>
						</Tabs>
					</View>
					<View direction="row">
						<Button onClick={() => setLongLabel((v) => !v)}>Toggle label length</Button>
					</View>
				</View>
			);
		};

		await render(<Component />);

		const getOverflow = (testId: string) => {
			const tablist = page.getByTestId(testId).getByRole("tablist").element();
			return getComputedStyle(tablist.parentElement!).overflowX;
		};

		const cases = [
			["container-tabs", page.getByRole("button", { name: "Toggle container width" })],
			["content-tabs", page.getByRole("button", { name: "Toggle label length" })],
		] as const;

		for (const [testId, button] of cases) {
			await expect.poll(() => getOverflow(testId)).toBe("visible");
			await userEvent.click(button);
			await expect.poll(() => getOverflow(testId)).toBe("auto");
			await userEvent.click(button);
			await expect.poll(() => getOverflow(testId)).toBe("visible");
		}
	});
});
