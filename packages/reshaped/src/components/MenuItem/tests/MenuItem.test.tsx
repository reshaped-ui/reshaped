import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import MenuItem from "@/components/MenuItem";
import { render } from "@/tests/render";

describe("Components/MenuItem", () => {
	test("href", async () => {
		await render(<MenuItem href="https://reshaped.so">Trigger</MenuItem>);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<MenuItem onClick={handleClick}>Trigger</MenuItem>);
		const el = page.getByRole("button");

		await userEvent.click(el);

		await expect.element(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(el.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("href + onClick", async () => {
		const handleClick = vi.fn();
		await render(
			<MenuItem
				href="https://reshaped.so"
				onClick={(e) => {
					e.preventDefault();
					handleClick(e);
				}}
			>
				Trigger
			</MenuItem>
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
			<MenuItem disabled onClick={handleClick}>
				Trigger
			</MenuItem>
		);
		const el = page.getByRole("button");

		await expect.element(el).toBeDisabled();
		await userEvent.click(el, { force: true });

		expect(handleClick).not.toHaveBeenCalled();
	});

	test("render, disabled", async () => {
		await render(
			<MenuItem
				disabled
				onClick={() => {}}
				render={(props) => <section {...props} />}
				attributes={{ "data-testid": "render-el" }}
			>
				Trigger
			</MenuItem>
		);
		const el = page.getByTestId("render-el");

		expect(el.element().tagName).toBe("SECTION");
		await expect.element(el).toHaveAttribute("aria-disabled", "true");
	});

	test("className, attributes", async () => {
		await render(
			<MenuItem className="test-classname" attributes={{ id: "test-id", "data-testid": "root" }}>
				Trigger
			</MenuItem>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});

	test("aligner, className, attributes", async () => {
		await render(
			<MenuItem.Aligner
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			>
				<MenuItem>Trigger</MenuItem>
			</MenuItem.Aligner>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
