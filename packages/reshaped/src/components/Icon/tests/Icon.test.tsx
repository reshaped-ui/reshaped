import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Icon from "@/components/Icon";
import IconZap from "@/icons/Zap";
import { render } from "@/tests/render";

describe("Utility components/Icon", () => {
	test("className, attributes", async () => {
		await render(
			<Icon
				svg={IconZap}
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});

	test("hidden from sr", async () => {
		await render(<Icon svg={IconZap} attributes={{ "data-testid": "root" }} />);
		const el = page.getByTestId("root");

		await expect.element(el).toBeInTheDocument();
		await expect.element(el).toHaveAttribute("aria-hidden", "true");
	});

	test("svg: null renders an empty icon", async () => {
		await render(<Icon svg={null} attributes={{ "data-testid": "root" }} />);

		await expect.element(page.getByTestId("root")).toBeEmptyDOMElement();
	});
});
