import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Text from "@/components/Text";
import { render } from "@/tests/render";

describe("Utility components/Text", () => {
	test("as", async () => {
		await render(
			<>
				<Text as="h1">Content</Text>
				<Text variant="featured-3">Content</Text>
				<Text variant={{ s: "featured-3", m: "featured-4" }}>Content</Text>
			</>
		);
		const els = page.getByRole("heading");

		expect(els.nth(0).element().tagName).toBe("H1");
		expect(els.nth(1).element().tagName).toBe("H3");
		expect(els.nth(2).element().tagName).toBe("H4");
	});

	test("className, attributes", async () => {
		await render(
			<Text className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Content
			</Text>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
