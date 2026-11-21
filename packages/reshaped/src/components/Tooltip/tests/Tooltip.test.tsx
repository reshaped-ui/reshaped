import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import View from "@/components/View";
import { render } from "@/tests/render";

/**
 * Move the pointer away from the trigger and the content safe area
 */
const moveMouseAway = () => {
	document.dispatchEvent(
		new MouseEvent("mousemove", {
			bubbles: true,
			clientX: window.innerWidth + 1000,
			clientY: window.innerHeight + 1000,
		})
	);
};

describe("Components/Tooltip", () => {
	test("uncontrolled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(
			<Tooltip text="Content" onOpen={handleOpen} onClose={handleClose}>
				{(attributes) => <Button attributes={attributes}>Trigger</Button>}
			</Tooltip>
		);
		const trigger = page.getByRole("button", { name: "Trigger" });

		await userEvent.hover(trigger);

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(page.getByText("Content")).toBeInTheDocument();

		await userEvent.unhover(trigger);
		moveMouseAway();

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({});
		});
		await expect.element(page.getByText("Content")).not.toBeInTheDocument();
	});

	test("disableContentHover", async () => {
		const handleClose = vi.fn();
		await render(
			<View direction="row" gap={2}>
				<Tooltip
					position="bottom"
					text="Very long tooltip text that overlaps the neighbouring triggers"
					disableContentHover
					onClose={handleClose}
				>
					{(attributes) => <Button attributes={attributes}>Trigger 1</Button>}
				</Tooltip>
				<Tooltip
					position="bottom"
					text="Very long tooltip text that overlaps the neighbouring triggers"
					disableContentHover
				>
					{(attributes) => <Button attributes={attributes}>Trigger 2</Button>}
				</Tooltip>
			</View>
		);
		const trigger = page.getByRole("button", { name: "Trigger 1" });

		await userEvent.hover(trigger);

		const content = page.getByRole("tooltip");
		await expect.element(content).toBeInTheDocument();
		await expect.element(content).toHaveStyle({ pointerEvents: "none" });

		// Closes right away without waiting for the pointer to leave the safe area
		await userEvent.unhover(trigger);

		await vi.waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1), { timeout: 500 });
	});
});
