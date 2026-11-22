import { afterEach, describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import { render } from "@/tests/render";
import useKeyboardMode from "../useKeyboardMode";

const Component = () => {
	const { activate, deactivate, disable, enable } = useKeyboardMode();

	return (
		<div style={{ display: "flex", gap: 8 }}>
			<button onClick={activate}>Activate</button>
			<button onClick={deactivate}>Deactivate</button>
			<button onClick={disable}>Disable</button>
			<button onClick={enable}>Enable</button>
		</div>
	);
};

describe("Hooks/useKeyboardMode", () => {
	afterEach(() => {
		document.documentElement.removeAttribute("data-rs-keyboard");
	});

	test("base", async () => {
		await render(<Component />);
		const attribute = "data-rs-keyboard";
		const root = document.documentElement;

		await expect.element(root).not.toHaveAttribute(attribute);

		await userEvent.click(page.getByRole("button", { name: "Activate", exact: true }));
		await expect.element(root).toHaveAttribute(attribute);

		await userEvent.click(page.getByRole("button", { name: "Deactivate", exact: true }));
		await expect.element(root).not.toHaveAttribute(attribute);

		await userEvent.click(page.getByRole("button", { name: "Disable", exact: true }));
		await userEvent.click(page.getByRole("button", { name: "Activate", exact: true }));
		await expect.element(root).not.toHaveAttribute(attribute);

		await userEvent.click(page.getByRole("button", { name: "Enable", exact: true }));
		await userEvent.click(page.getByRole("button", { name: "Activate", exact: true }));
		await expect.element(root).toHaveAttribute(attribute);
	});

	test("keydown without key doesn't throw or activate keyboard mode", async () => {
		const handleError = vi.fn();
		window.addEventListener("error", handleError);

		await render(<input aria-label="Email" />);
		const root = document.documentElement;
		const input = page.getByRole("textbox").element();

		// Autofill dispatches plain keydown events without e.key
		input.dispatchEvent(new Event("keydown", { bubbles: true }));
		document.body.dispatchEvent(new Event("keydown", { bubbles: true }));

		window.removeEventListener("error", handleError);
		expect(handleError).not.toHaveBeenCalled();
		await expect.element(root).not.toHaveAttribute("data-rs-keyboard");
	});
});
