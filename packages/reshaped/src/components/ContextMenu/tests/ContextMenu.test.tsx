import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Button from "@/components/Button";
import ContextMenu from "@/components/ContextMenu";
import Popover from "@/components/Popover";
import View from "@/components/View";
import { render } from "@/tests/render";

describe("Components/ContextMenu", () => {
	test("onOpen, onClose", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		const handleAfterOpen = vi.fn();
		await render(
			<div style={{ height: 200, overflow: "auto" }} data-testid="scroll">
				<ContextMenu onOpen={handleOpen} onClose={handleClose} onAfterOpen={handleAfterOpen}>
					<View
						height="400px"
						backgroundColor="neutral-faded"
						borderRadius="medium"
						attributes={{ "data-testid": "root" }}
					/>

					<ContextMenu.Content>
						<ContextMenu.Item>Item</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu>
			</div>
		);
		const root = page.getByTestId("root");
		const scroll = page.getByTestId("scroll");
		const item = page.getByText("Item");

		await userEvent.click(root, { button: "right" });

		expect(handleOpen).toHaveBeenCalledTimes(1);
		expect(handleOpen).toHaveBeenCalledWith({
			event: expect.objectContaining({ type: "contextmenu", target: root.element() }),
		});
		await expect.element(item).toBeInTheDocument();
		// Context menu locks the scroll of the closest scrollable parent
		await expect.element(scroll).toHaveStyle("overflow: hidden");

		// Wait for the open animation to finish
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(1));

		await userEvent.click(root);

		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		await expect.element(item).not.toBeInTheDocument();
		await expect.element(scroll).not.toHaveStyle("overflow: hidden");
	});

	test("test: right click on the same context menu", async () => {
		// Leave enough space for the menu to stay at the cursor position after moving it
		await page.viewport(1024, 768);

		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		const handleAfterOpen = vi.fn();
		const Component = () => {
			const triggerRef = React.useRef<HTMLDivElement>(null);

			return (
				<View gap={4}>
					<ContextMenu onOpen={handleOpen} onClose={handleClose} onAfterOpen={handleAfterOpen}>
						<View
							height="60px"
							backgroundColor="neutral-faded"
							borderRadius="medium"
							attributes={{ "data-testid": "children" }}
						/>

						<ContextMenu.Content>
							<ContextMenu.Item>Children item</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu>

					<View
						height="60px"
						backgroundColor="neutral-faded"
						borderRadius="medium"
						attributes={{ ref: triggerRef, "data-testid": "trigger-ref" }}
					/>

					<ContextMenu
						triggerRef={triggerRef}
						onOpen={handleOpen}
						onClose={handleClose}
						onAfterOpen={handleAfterOpen}
					>
						<ContextMenu.Content>
							<ContextMenu.Item>Trigger ref item</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu>
				</View>
			);
		};
		await render(<Component />);

		for (const [testId, text] of [
			["children", "Children item"],
			["trigger-ref", "Trigger ref item"],
		]) {
			const trigger = page.getByTestId(testId);
			const menu = page.getByRole("menu");

			handleOpen.mockClear();
			handleClose.mockClear();
			handleAfterOpen.mockClear();

			await userEvent.click(trigger, { button: "right", position: { x: 10, y: 10 } });

			expect(handleOpen).toHaveBeenCalledTimes(1);

			// Wait for the open animation to finish
			await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(1));
			const initialLeft = menu.element().getBoundingClientRect().left;

			// Far enough to not hit the already opened menu
			await userEvent.click(trigger, { button: "right", position: { x: 410, y: 10 } });

			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
			expect(handleOpen).toHaveBeenCalledTimes(2);

			await expect.element(page.getByText(text)).toBeInTheDocument();
			await expect
				.poll(() => menu.element().getBoundingClientRect().left)
				.toBeCloseTo(initialLeft + 400);

			// Click next to the menu, which is rendered over the trigger
			await userEvent.click(trigger, { position: { x: 5, y: 5 } });

			expect(handleClose).toHaveBeenCalledTimes(2);
			await expect.element(page.getByText(text)).not.toBeInTheDocument();
		}
	});

	test("test: right click inside another flyout", async () => {
		const handlePopoverClose = vi.fn();
		const handleAfterOpen = vi.fn();
		await render(
			<Popover onClose={handlePopoverClose} onAfterOpen={handleAfterOpen}>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open popover</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<ContextMenu>
						<View
							width="200px"
							height="60px"
							backgroundColor="neutral-faded"
							borderRadius="medium"
							attributes={{ "data-testid": "popover-area" }}
						/>

						<ContextMenu.Content>
							<ContextMenu.Item>Context menu item</ContextMenu.Item>
						</ContextMenu.Content>
					</ContextMenu>
				</Popover.Content>
			</Popover>
		);

		await userEvent.click(page.getByRole("button", { name: "Open popover" }));
		// Wait for the open animation to finish
		await vi.waitFor(() => expect(handleAfterOpen).toHaveBeenCalledTimes(1));

		await userEvent.click(page.getByTestId("popover-area"), { button: "right" });

		await expect.element(page.getByText("Context menu item")).toBeInTheDocument();
		await expect.element(page.getByTestId("popover-area")).toBeInTheDocument();
		expect(handlePopoverClose).not.toHaveBeenCalled();
	});
});
