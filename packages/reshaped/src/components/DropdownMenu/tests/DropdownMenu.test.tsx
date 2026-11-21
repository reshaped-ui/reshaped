import { describe, expect, test, vi } from "vitest";
import { page, userEvent, type Locator } from "vitest/browser";

import Button from "@/components/Button";
import DropdownMenu, { type DropdownMenuProps } from "@/components/DropdownMenu";
import { render } from "@/tests/render";

const Demo = (props: DropdownMenuProps) => (
	<DropdownMenu {...props}>
		<DropdownMenu.Trigger>
			{(attributes) => <Button attributes={attributes}>Open</Button>}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item>Item</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu>
);

const expectNotOpenedOnHover = async (trigger: Locator, contentText: string) => {
	await userEvent.hover(trigger);
	// Hover submenus open without a delay, give it a moment to make sure nothing renders
	await new Promise((resolve) => setTimeout(resolve, 100));
	await expect.element(page.getByText(contentText, { exact: true })).not.toBeInTheDocument();
};

describe("Components/DropdownMenu", () => {
	test("defaultActive, uncontrolled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} defaultActive />);
		const item = page.getByText("Item", { exact: true });

		await expect.element(item).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(item).not.toBeInTheDocument();

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(item).toBeInTheDocument();
	});

	test("active, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} active />);
		const item = page.getByText("Item", { exact: true });

		await expect.element(item).toBeVisible();
		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});
		await expect.element(item).toBeInTheDocument();
	});

	test("active false, controlled", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		await render(<Demo onOpen={handleOpen} onClose={handleClose} active={false} />);

		await userEvent.click(page.getByRole("button", { name: "Open" }));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenCalledWith();
		});
		await expect.element(page.getByText("Item", { exact: true })).not.toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<DropdownMenu active>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					<DropdownMenu.Item>Item</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		);

		await expect.element(page.getByTestId("test-id")).toHaveClass("test-classname");
	});

	test("submenu item click closes all menus", async () => {
		await render(
			<DropdownMenu>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item onClick={() => {}}>Item 1</DropdownMenu.Item>
					<DropdownMenu.SubMenu>
						<DropdownMenu.SubTrigger>Item 2</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => {}}>SubItem 1</DropdownMenu.Item>
							<DropdownMenu.Item onClick={() => {}}>SubItem 2</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
				</DropdownMenu.Content>
			</DropdownMenu>
		);
		const rootItem = page.getByText("Item 1", { exact: true });
		const nestedItem = page.getByText("SubItem 1", { exact: true });

		await userEvent.click(page.getByRole("button", { name: "Open" }));
		await expect.element(rootItem).toBeVisible();

		await userEvent.hover(page.getByText("Item 2", { exact: true }));
		await expect.element(nestedItem).toBeVisible();
		await userEvent.click(nestedItem);

		await expect.element(rootItem).not.toBeInTheDocument();
		await expect.element(nestedItem).not.toBeInTheDocument();
	});

	test("submenuTriggerType: click, inherited by nested submenus", async () => {
		// Submenus would cover the sibling items in the default narrow viewport
		await page.viewport(1024, 768);
		await render(
			<DropdownMenu submenuTriggerType="click">
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item onClick={() => {}}>Item 1</DropdownMenu.Item>
					<DropdownMenu.SubMenu>
						<DropdownMenu.SubTrigger>Item 2</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => {}}>SubItem 1</DropdownMenu.Item>
							<DropdownMenu.Item onClick={() => {}}>SubItem 2</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
					<DropdownMenu.SubMenu>
						<DropdownMenu.SubTrigger>Item 3</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => {}}>SubItem 2-1</DropdownMenu.Item>
							<DropdownMenu.SubMenu>
								<DropdownMenu.SubTrigger>SubItem 2-2</DropdownMenu.SubTrigger>
								<DropdownMenu.Content>
									<DropdownMenu.Item onClick={() => {}}>SubItem 2-2-1</DropdownMenu.Item>
									<DropdownMenu.Item onClick={() => {}}>SubItem 2-2-2</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.SubMenu>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
				</DropdownMenu.Content>
			</DropdownMenu>
		);
		const rootItem = page.getByText("Item 1", { exact: true });
		const subTrigger = page.getByText("Item 2", { exact: true });
		const subItem = page.getByText("SubItem 1", { exact: true });
		const nestedSubTrigger = page.getByText("SubItem 2-2", { exact: true });
		const nestedItem = page.getByText("SubItem 2-2-1", { exact: true });

		await userEvent.click(page.getByRole("button", { name: "Open" }));
		await expect.element(rootItem).toBeVisible();

		// Hover doesn't open the submenu
		await expectNotOpenedOnHover(subTrigger, "SubItem 1");

		await userEvent.click(subTrigger);
		await expect.element(subItem).toBeVisible();

		// Moving the mouse away doesn't close the submenu
		await userEvent.unhover(subTrigger);
		await userEvent.hover(rootItem);
		await new Promise((resolve) => setTimeout(resolve, 100));
		await expect.element(subItem).toBeInTheDocument();

		// Opening another submenu closes the previous one
		await userEvent.click(page.getByText("Item 3", { exact: true }));
		await expect.element(nestedSubTrigger).toBeVisible();
		await expect.element(subItem).not.toBeInTheDocument();

		// Nested submenus inherit the trigger type
		await expectNotOpenedOnHover(nestedSubTrigger, "SubItem 2-2-1");

		await userEvent.click(nestedSubTrigger);
		await expect.element(nestedItem).toBeVisible();
		await userEvent.click(nestedItem);

		await expect.element(rootItem).not.toBeInTheDocument();
		await expect.element(nestedItem).not.toBeInTheDocument();
	});

	test("submenuTriggerType: click, SubMenu triggerType: hover", async () => {
		await render(
			<DropdownMenu submenuTriggerType="click">
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open with override</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.SubMenu>
						<DropdownMenu.SubTrigger>Click item</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => {}}>Click subitem</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
					<DropdownMenu.SubMenu triggerType="hover">
						<DropdownMenu.SubTrigger>Hover item</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => {}}>Hover subitem</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
				</DropdownMenu.Content>
			</DropdownMenu>
		);

		await userEvent.click(page.getByRole("button", { name: "Open with override" }));

		const clickTrigger = page.getByText("Click item", { exact: true });
		await expect.element(clickTrigger).toBeVisible();
		await expectNotOpenedOnHover(clickTrigger, "Click subitem");

		await userEvent.hover(page.getByText("Hover item", { exact: true }));
		await expect.element(page.getByText("Hover subitem", { exact: true })).toBeInTheDocument();
	});
});
