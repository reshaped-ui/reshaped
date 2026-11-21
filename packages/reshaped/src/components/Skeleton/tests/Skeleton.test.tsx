import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Skeleton from "@/components/Skeleton";
import { render } from "@/tests/render";

describe("Components/Skeleton", () => {
	test("className, attributes", async () => {
		await render(
			<Skeleton className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }} />
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
