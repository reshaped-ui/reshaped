import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Breadcrumbs from "@/components/Breadcrumbs";
import { render } from "@/tests/render";

describe("Components/Breadcrumbs", () => {
	test("ariaLabel", async () => {
		await render(
			<Breadcrumbs ariaLabel="breadcrumbs" expandAriaLabel="Expand items">
				<Breadcrumbs.Item>Item</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		await expect.element(page.getByRole("navigation", { name: "breadcrumbs" })).toBeInTheDocument();
	});

	test("collapsed, expands on click", async () => {
		await render(
			<Breadcrumbs defaultVisibleItems={3} ariaLabel="breadcrumbs" expandAriaLabel="Expand items">
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
			</Breadcrumbs>
		);
		const triggers = page.getByRole("button");

		await expect.element(triggers.nth(0)).toHaveTextContent("Item 1");
		await expect.element(triggers.nth(1)).toHaveAccessibleName("Expand items");
		await expect.element(triggers.nth(2)).toHaveTextContent("Item 4");
		await expect.element(page.getByText("Item 2")).not.toBeInTheDocument();

		await userEvent.click(triggers.nth(1));

		await expect
			.element(page.getByRole("button", { name: "Expand items" }))
			.not.toBeInTheDocument();
		await expect.element(triggers.nth(0)).toHaveTextContent("Item 1");
		await expect.element(triggers.nth(1)).toHaveTextContent("Item 2");
		await expect.element(triggers.nth(2)).toHaveTextContent("Item 3");
		await expect.element(triggers.nth(3)).toHaveTextContent("Item 4");
	});

	test("collapsed, disableExpand", async () => {
		await render(
			<Breadcrumbs
				defaultVisibleItems={3}
				ariaLabel="breadcrumbs"
				expandAriaLabel="Expand items"
				disableExpand
			>
				<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
				<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		await expect.element(page.getByRole("button", { name: "Item 1" })).toBeInTheDocument();
		await expect
			.element(page.getByRole("button", { name: "Expand items" }))
			.not.toBeInTheDocument();
		await expect.element(page.getByText("Item 2")).not.toBeInTheDocument();
		await expect.element(page.getByRole("button", { name: "Item 4" })).toBeInTheDocument();
	});

	test("item, onClick, disabled", async () => {
		const handleClick = vi.fn();
		await render(
			<Breadcrumbs expandAriaLabel="Expand items">
				<Breadcrumbs.Item onClick={handleClick}>Trigger</Breadcrumbs.Item>
				<Breadcrumbs.Item onClick={handleClick} disabled>
					Trigger
				</Breadcrumbs.Item>
			</Breadcrumbs>
		);
		const triggers = page.getByRole("button");

		await userEvent.click(triggers.nth(0));

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(triggers.nth(0).element().contains(handleClick.mock.calls[0][0].target)).toBe(true);

		await expect.element(triggers.nth(1)).toBeDisabled();
		await userEvent.click(triggers.nth(1), { force: true });

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("item, href", async () => {
		await render(
			<Breadcrumbs expandAriaLabel="Expand items">
				<Breadcrumbs.Item href="https://reshaped.so">Trigger</Breadcrumbs.Item>
			</Breadcrumbs>
		);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("className, attributes", async () => {
		await render(
			<Breadcrumbs
				className="test-classname"
				expandAriaLabel="Expand items"
				attributes={{ id: "test-id", "data-testid": "root" }}
			>
				<Breadcrumbs.Item>Trigger</Breadcrumbs.Item>
			</Breadcrumbs>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
