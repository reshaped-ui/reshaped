import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Divider from "@/components/Divider";
import { render } from "@/tests/render";

describe("Components/Divider", () => {
	test("horizontal by default", async () => {
		await render(<Divider />);

		await expect
			.element(page.getByRole("separator"))
			.toHaveAttribute("aria-orientation", "horizontal");
	});

	test("vertical", async () => {
		await render(<Divider vertical />);

		await expect
			.element(page.getByRole("separator"))
			.toHaveAttribute("aria-orientation", "vertical");
	});

	test("responsive vertical has no aria-orientation", async () => {
		await render(<Divider vertical={{ s: true, m: false }} />);

		await expect.element(page.getByRole("separator")).not.toHaveAttribute("aria-orientation");
	});

	test("className, attributes", async () => {
		await render(
			<Divider className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }} />
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
