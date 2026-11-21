import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Resizable from "@/components/Resizable";
import { render } from "@/tests/render";

describe("Components/Resizable", () => {
	test("className, attributes", async () => {
		await render(
			<Resizable
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				height="200px"
			>
				<Resizable.Item>Panel 1</Resizable.Item>
				<Resizable.Handle />
				<Resizable.Item>Panel 2</Resizable.Item>
			</Resizable>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
