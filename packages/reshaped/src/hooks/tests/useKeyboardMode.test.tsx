import { describe, expect, test } from "vitest";
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
});
