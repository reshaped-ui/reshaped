import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Grid from "@/components/Grid";
import { render } from "@/tests/render";

describe("Utility components/Grid", () => {
	test("as", async () => {
		await render(
			<Grid as="ul">
				<Grid.Item as="li">Content</Grid.Item>
			</Grid>
		);

		await expect.element(page.getByRole("list")).toBeInTheDocument();
		await expect.element(page.getByRole("listitem")).toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<Grid className="test-class" attributes={{ id: "test-id", "data-testid": "root" }}>
				<Grid.Item
					className="test-item-class"
					attributes={{ id: "test-item-id", "data-testid": "item" }}
				>
					Content
				</Grid.Item>
			</Grid>
		);
		const root = page.getByTestId("root");
		const item = page.getByTestId("item");

		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(root).toHaveClass("test-class");

		await expect.element(item).toHaveAttribute("id", "test-item-id");
		await expect.element(item).toHaveClass("test-item-class");
		expect(item.element().parentElement).toBe(root.element());
	});
});
