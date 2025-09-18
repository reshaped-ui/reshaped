import React from "react";
import { StoryObj, Meta } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { sleep } from "utilities/helpers";
import MenuItem from "components/MenuItem";
import DropdownMenu from "components/DropdownMenu";
import useMenuItemNavigation from "hooks/useMenuItemNavigation";
import IconZap from "icons/Zap";
import IconDotsHorizontal from "icons/DotsHorizontal";

const meta: Meta = {
	title: "Hooks/useMenuItemNavigation",
	argTypes: {
		circular: {
			control: "boolean",
			description: "Enable circular navigation (wrap around from last to first item)",
		},
		orientation: {
			control: "select",
			options: ["vertical", "horizontal"],
			description: "Navigation orientation",
		},
		disabled: {
			control: "boolean",
			description: "Disable keyboard navigation",
		},
	},
	args: {
		circular: false,
		orientation: "vertical",
		disabled: false,
	},
};

export default meta;

export const simpleKeyboardNavigation: StoryObj<{
	circular: boolean;
	orientation: "vertical" | "horizontal";
	disabled: boolean;
}> = {
	name: "simple keyboard navigation test",
	render: (args) => {
		const { ref } = useMenuItemNavigation({
			circular: args.circular,
			orientation: args.orientation,
			disabled: args.disabled,
		});

		// Debug logging
		React.useEffect(() => {
			console.log("Container ref:", ref.current);
			console.log("Navigation options:", {
				circular: args.circular,
				orientation: args.orientation,
				disabled: args.disabled,
			});
			if (ref.current) {
				const focusableElements = ref.current.querySelectorAll(
					'a,button,input:not([type="hidden"]),textarea,select,details,[tabindex],[contenteditable]'
				);
				console.log("Focusable elements found:", focusableElements);
			}
		}, [ref, args.circular, args.orientation, args.disabled]);

		return (
			<div>
				<h3>Simple Keyboard Navigation Test</h3>
				<p>
					Click any item to focus it, then use{" "}
					{args.orientation === "vertical" ? "Up/Down" : "Left/Right"} arrow keys.
					{args.circular && " Navigation wraps around from last to first item."}
				</p>
				<div
					ref={ref}
					style={{
						display: "flex",
						flexDirection: args.orientation === "vertical" ? "column" : "row",
						gap: "8px",
						maxWidth: args.orientation === "vertical" ? "300px" : "100%",
						flexWrap: args.orientation === "horizontal" ? "wrap" : "nowrap",
					}}
				>
					<MenuItem icon={IconZap} onClick={() => console.log("First item clicked")}>
						First Item
					</MenuItem>
					<MenuItem onClick={() => console.log("Second item clicked")}>Second Item</MenuItem>
					<MenuItem onClick={() => console.log("Third item clicked")}>Third Item</MenuItem>
					<MenuItem disabled>Disabled Item</MenuItem>
					<DropdownMenu>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<MenuItem attributes={attributes} icon={IconDotsHorizontal}>
									Dropdown Menu
								</MenuItem>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>Submenu Item 1</DropdownMenu.Item>
							<DropdownMenu.Item>Submenu Item 2</DropdownMenu.Item>
							<DropdownMenu.Item>Submenu Item 3</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
					<MenuItem onClick={() => console.log("Last item clicked")}>Last Item</MenuItem>
				</div>
			</div>
		);
	},
	play: async ({ canvas, args }) => {
		const user = userEvent.setup();

		// Click first item to focus it
		const firstItem = canvas.getByRole("button", { name: "First Item" });
		await user.click(firstItem);
		await waitFor(() => expect(firstItem).toHaveFocus());

		const arrowKey = args.orientation === "horizontal" ? "{ArrowRight}" : "{ArrowDown}";
		const backArrowKey = args.orientation === "horizontal" ? "{ArrowLeft}" : "{ArrowUp}";

		// Navigate forward with arrow key
		await user.keyboard(arrowKey);
		const secondItem = canvas.getByRole("button", { name: "Second Item" });
		await waitFor(() => expect(secondItem).toHaveFocus());

		// Navigate forward again
		await user.keyboard(arrowKey);
		const thirdItem = canvas.getByRole("button", { name: "Third Item" });
		await waitFor(() => expect(thirdItem).toHaveFocus());

		// Navigate forward again - should skip disabled item and go to dropdown menu
		await user.keyboard(arrowKey);
		const dropdownTrigger = canvas.getByRole("button", { name: "Dropdown Menu" });
		await waitFor(() => expect(dropdownTrigger).toHaveFocus());

		// Test that Enter key opens the dropdown menu
		await user.keyboard("{Enter}");
		await waitFor(() => {
			// Look for menu items by role instead of text
			const bodyCanvas = within(document.body);
			const menuItems = bodyCanvas.getAllByRole("menuitem");
			expect(menuItems.length).toBeGreaterThan(0);
		});

		// Sleep to ensure dropdown is fully opened before closing
		await sleep(200);

		// Close the dropdown by pressing Escape
		await user.keyboard("{Escape}");
		await waitFor(() => {
			// Check that dropdown content is no longer in the document
			const bodyCanvas = within(document.body);
			const menuItems = bodyCanvas.queryAllByRole("menuitem");
			expect(menuItems).toHaveLength(0);
		});

		// Test that Right arrow key also opens the dropdown menu (when orientation is vertical)
		if (args.orientation === "vertical") {
			// Sleep to ensure dropdown is fully closed and focus is stable
			await sleep(300);

			// Ensure focus is still on the dropdown trigger
			const dropdownTrigger = canvas.getByRole("button", { name: "Dropdown Menu" });
			await waitFor(() => expect(dropdownTrigger).toHaveFocus());

			await user.keyboard("{ArrowRight}");
			await waitFor(() => {
				// Look for menu items by role instead of text
				const bodyCanvas = within(document.body);
				const menuItems = bodyCanvas.getAllByRole("menuitem");
				expect(menuItems.length).toBeGreaterThan(0);
			});

			// Sleep to ensure dropdown is fully opened before closing
			await sleep(200);

			// Close the dropdown again
			await user.keyboard("{Escape}");
			await waitFor(() => {
				// Check that dropdown content is no longer in the document
				const bodyCanvas = within(document.body);
				const menuItems = bodyCanvas.queryAllByRole("menuitem");
				expect(menuItems).toHaveLength(0);
			});
		}

		// Navigate to last item
		await user.keyboard(arrowKey);
		const lastItem = canvas.getByRole("button", { name: "Last Item" });
		await waitFor(() => expect(lastItem).toHaveFocus());

		if (args.circular) {
			// Test circular navigation - should wrap to first item
			await user.keyboard(arrowKey);
			await waitFor(() => expect(firstItem).toHaveFocus());

			// Test circular navigation backwards - should wrap to last item
			await user.keyboard(backArrowKey);
			await waitFor(() => expect(lastItem).toHaveFocus());
		} else {
			// Test non-circular navigation - should stay at last item
			await user.keyboard(arrowKey);
			await waitFor(() => expect(lastItem).toHaveFocus());

			// Navigate back to first
			await user.keyboard("{Home}");
			await waitFor(() => expect(firstItem).toHaveFocus());

			// Test non-circular navigation backwards - should stay at first item
			await user.keyboard(backArrowKey);
			await waitFor(() => expect(firstItem).toHaveFocus());
		}

		// Test Home key
		await user.keyboard("{Home}");
		await waitFor(() => expect(firstItem).toHaveFocus());

		// Test End key
		await user.keyboard("{End}");
		await waitFor(() => expect(lastItem).toHaveFocus());
	},
};
