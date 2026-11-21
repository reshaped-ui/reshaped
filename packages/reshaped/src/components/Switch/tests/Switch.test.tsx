import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Switch from "@/components/Switch";
import { render } from "@/tests/render";

describe("Components/Switch", () => {
	test("defaultChecked, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<Switch
				name="test-name"
				defaultChecked
				onChange={handleChange}
				attributes={{ "data-testid": "root" }}
			>
				Label
			</Switch>
		);
		const input = page.getByRole("switch");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByTestId("root"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input.element() }),
		});
		await expect.element(input).not.toBeChecked();
	});

	test("checked, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Switch
				name="test-name"
				checked
				onChange={handleChange}
				attributes={{ "data-testid": "root" }}
			>
				Label
			</Switch>
		);
		const input = page.getByRole("switch");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByTestId("root"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			checked: false,
			event: expect.objectContaining({ target: input.element() }),
		});
		// Still checked because it's controlled
		await expect.element(input).toBeChecked();
	});

	test("disabled doesn't trigger onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<Switch
				name="test-name"
				disabled
				onChange={handleChange}
				attributes={{ "data-testid": "root" }}
			>
				Label
			</Switch>
		);
		const input = page.getByRole("switch");

		await expect.element(input).toBeDisabled();
		await userEvent.click(page.getByTestId("root"), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(input).not.toBeChecked();
	});

	test("label is associated with the input", async () => {
		await render(<Switch name="test-name">Wi-fi</Switch>);

		await expect.element(page.getByRole("switch", { name: "Wi-fi" })).toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<Switch
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				inputAttributes={{ "aria-label": "test select", id: "test-input-id" }}
				name="name"
			>
				Label
			</Switch>
		);
		const el = page.getByTestId("root");
		const input = page.getByRole("switch");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
		await expect.element(input).toHaveAttribute("id", "test-input-id");
		await expect.element(input).toHaveAttribute("name", "name");
	});
});
