import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Card from "@/components/Card";
import { render } from "@/tests/render";

describe("Components/Card", () => {
	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<Card onClick={handleClick}>Trigger</Card>);
		const el = page.getByRole("button");

		await userEvent.click(el);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("href", async () => {
		await render(<Card href="https://reshaped.so">Trigger</Card>);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("as", async () => {
		await render(<Card as="span" attributes={{ "data-testid": "root" }} />);

		expect(page.getByTestId("root").element().tagName).toBe("SPAN");
	});

	test("className, attributes", async () => {
		await render(
			<Card className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }} />
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
