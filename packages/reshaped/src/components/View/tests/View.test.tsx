import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import View from "@/components/View";
import { render } from "@/tests/render";

describe("Utility components/View", () => {
	test("as", async () => {
		await render(
			<View as="ul">
				<View.Item as="li">Content</View.Item>
			</View>
		);

		await expect.element(page.getByRole("list")).toBeInTheDocument();
		await expect.element(page.getByRole("listitem")).toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<View className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Content
			</View>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});

	test("item className, attributes", async () => {
		await render(
			<View.Item className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Content
			</View.Item>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
