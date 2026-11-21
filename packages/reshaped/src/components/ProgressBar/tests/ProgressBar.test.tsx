import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import ProgressBar from "@/components/ProgressBar";
import { render } from "@/tests/render";

describe("Components/ProgressBar", () => {
	test("rendering", async () => {
		await render(<ProgressBar value={75} min={50} max={100} ariaLabel="progress" />);
		const el = page.getByRole("progressbar");

		await expect.element(el).toBeInTheDocument();
		await expect.element(el).toHaveAttribute("aria-valuenow", "75");
		await expect.element(el).toHaveAttribute("aria-valuemin", "50");
		await expect.element(el).toHaveAttribute("aria-valuemax", "100");
		await expect.element(el).toHaveAccessibleName("progress");
	});

	test("className, attributes", async () => {
		await render(
			<ProgressBar
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				ariaLabel="progress"
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
