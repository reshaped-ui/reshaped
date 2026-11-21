import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import LoaderText from "@/components/LoaderText";
import { render } from "@/tests/render";

describe("Components/LoaderText", () => {
	test("className, attributes", async () => {
		await render(
			<LoaderText className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Loading
			</LoaderText>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
