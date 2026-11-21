import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Hidden from "@/components/Hidden";
import { render } from "@/tests/render";

describe("Utility components/Hidden", () => {
	test("as", async () => {
		await render(<Hidden as="span">Content</Hidden>);

		expect(page.getByText("Content").element().tagName).toBe("SPAN");
	});

	test("renders a div by default", async () => {
		await render(<Hidden hide>Content</Hidden>);

		expect(page.getByText("Content").element().tagName).toBe("DIV");
	});
});
