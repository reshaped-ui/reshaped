import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Link from "@/components/Link";
import { render } from "@/tests/render";

describe("Components/Link", () => {
	test("href", async () => {
		await render(<Link href="https://reshaped.so">Trigger</Link>);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<Link onClick={handleClick}>Trigger</Link>);
		const el = page.getByRole("button");

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("href + onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Link
				href="https://reshaped.so"
				onClick={(e) => {
					e.preventDefault();
					handleClick(e);
				}}
			>
				Trigger
			</Link>
		);
		const el = page.getByRole("link");

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("disabled doesn't trigger onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<Link disabled onClick={handleClick}>
				Trigger
			</Link>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("render", async () => {
		await render(<Link render={(props) => <section {...props} />}>Trigger</Link>);
		const el = page.getByText("Trigger");

		await expect.element(el).toBeInTheDocument();
		expect(el.element().tagName).toBe("SECTION");
	});

	test("className, attributes", async () => {
		await render(
			<Link className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Trigger
			</Link>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
