import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import Loader from "@/components/Loader";
import { render } from "@/tests/render";

describe("Components/Loader", () => {
	test("ariaLabel", async () => {
		await render(<Loader ariaLabel="Loading" attributes={{ "data-testid": "root" }} />);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveAttribute("role", "progressbar");
		await expect.element(el).toHaveAttribute("aria-live", "assertive");
		await expect.element(el).toHaveAttribute("aria-label", "Loading");
	});

	test("aria-label from attributes", async () => {
		await render(<Loader attributes={{ "aria-label": "Loading" }} />);
		const el = page.getByRole("progressbar", { name: "Loading" });

		await expect.element(el).toHaveAttribute("aria-live", "assertive");
	});

	test("className, attributes", async () => {
		await render(
			<Loader
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				ariaLabel="Loading"
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
