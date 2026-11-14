import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "@/components/Button";
import DropdownMenu from "@/components/DropdownMenu";
import Theme from "@/components/Theme";
import { useTheme } from "@/components/Theme/useTheme";
import View from "@/components/View";
import { sleep } from "@/utilities/helpers";
import { Example } from "@/utilities/storybook";
import IconCheckmark from "@/icons/Checkmark";

export default {
	title: "Components/DropdownMenu",
	component: DropdownMenu,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/dropdown-menu",
		},
	},
};

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title="position: default">
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title="position: end">
				<DropdownMenu position="end">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title={["position: top-start", "should change to top-start to fit viewport"]}>
				<DropdownMenu position="top-end">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
			<div style={{ height: 2000 }} />
		</Example>
	),
};

export const sections = {
	name: "sections",
	render: () => (
		<Example>
			<Example.Item title="2 sections">
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Section>
							<DropdownMenu.Item>Item 1</DropdownMenu.Item>
							<DropdownMenu.Item>Item 2</DropdownMenu.Item>
						</DropdownMenu.Section>

						<DropdownMenu.Section>
							<DropdownMenu.Item>Item 3</DropdownMenu.Item>
							<DropdownMenu.Item>Item 4</DropdownMenu.Item>
						</DropdownMenu.Section>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
		</Example>
	),
};

export const size: StoryObj = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small, inherited by the items and the submenu">
				<DropdownMenu size="small">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open small</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Small item</DropdownMenu.Item>
						<DropdownMenu.SubMenu>
							<DropdownMenu.SubTrigger>Small submenu</DropdownMenu.SubTrigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>Small subitem</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.SubMenu>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
		</Example>
	),
};

export const submenu: StoryObj = {
	name: "submenu",
	render: () => (
		<Example>
			<Example.Item title="submenu">
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
						<DropdownMenu.SubMenu>
							<DropdownMenu.SubTrigger>Item 3</DropdownMenu.SubTrigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item onClick={() => {}}>SubItem 2-1</DropdownMenu.Item>
								<DropdownMenu.Item onClick={() => {}}>SubItem 2-2</DropdownMenu.Item>
								<DropdownMenu.SubMenu>
									<DropdownMenu.SubTrigger>SubItem 2-1</DropdownMenu.SubTrigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item onClick={() => {}}>SubItem 2-1-1</DropdownMenu.Item>
										<DropdownMenu.Item onClick={() => {}}>SubItem 2-1-2</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.SubMenu>
							</DropdownMenu.Content>
						</DropdownMenu.SubMenu>

						<DropdownMenu.SubMenu>
							<DropdownMenu.SubTrigger disabled>Item 4, disabled</DropdownMenu.SubTrigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item onClick={() => {}}>SubItem 3-1</DropdownMenu.Item>
								<DropdownMenu.Item onClick={() => {}}>SubItem 3-2</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.SubMenu>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
		</Example>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getByRole("button", { name: "Open" });

		await userEvent.click(trigger);

		const rootItem = await canvas.findByText("Item 1");
		await userEvent.hover(canvas.getByText("Item 2"));

		const nestedItem = await canvas.findByText("SubItem 1");
		await userEvent.click(nestedItem);

		await waitFor(() => {
			expect(rootItem).not.toBeInTheDocument();
			expect(nestedItem).not.toBeInTheDocument();
		});
	},
};

export const submenuTriggerType: StoryObj = {
	name: "submenuTriggerType",
	render: () => (
		<Example>
			<Example.Item title="submenuTriggerType: click, inherited by nested submenus">
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
			</Example.Item>

			<Example.Item title="submenuTriggerType: click, SubMenu triggerType: hover">
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
			</Example.Item>
		</Example>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		await userEvent.click(canvas.getByRole("button", { name: "Open" }));

		const rootItem = await canvas.findByText("Item 1");
		const subTrigger = canvas.getByText("Item 2");

		// Hover doesn't open the submenu
		await userEvent.hover(subTrigger);
		await sleep(100);
		expect(canvas.queryByText("SubItem 1")).not.toBeInTheDocument();

		await userEvent.click(subTrigger);
		const subItem = await canvas.findByText("SubItem 1");

		// Moving the mouse away doesn't close the submenu
		await userEvent.unhover(subTrigger);
		await userEvent.hover(rootItem);
		await sleep(100);
		expect(subItem).toBeInTheDocument();

		// Opening another submenu closes the previous one
		await userEvent.click(canvas.getByText("Item 3"));
		const nestedSubTrigger = await canvas.findByText("SubItem 2-2");
		await waitFor(() => {
			expect(subItem).not.toBeInTheDocument();
		});

		// Nested submenus inherit the trigger type
		await userEvent.hover(nestedSubTrigger);
		await sleep(100);
		expect(canvas.queryByText("SubItem 2-2-1")).not.toBeInTheDocument();

		await userEvent.click(nestedSubTrigger);
		const nestedItem = await canvas.findByText("SubItem 2-2-1");
		await userEvent.click(nestedItem);

		await waitFor(() => {
			expect(rootItem).not.toBeInTheDocument();
			expect(nestedItem).not.toBeInTheDocument();
		});

		// SubMenu triggerType overrides the menu submenuTriggerType
		await userEvent.click(canvas.getByRole("button", { name: "Open with override" }));

		const clickTrigger = await canvas.findByText("Click item");
		await userEvent.hover(clickTrigger);
		await sleep(100);
		expect(canvas.queryByText("Click subitem")).not.toBeInTheDocument();

		await userEvent.hover(canvas.getByText("Hover item"));
		expect(await canvas.findByText("Hover subitem")).toBeInTheDocument();
	},
};

export const testSubmenuInsideClick: StoryObj = {
	name: "test: submenu inside click",
	render: () => (
		<Example>
			<Example.Item title="clicks inside nested submenus don't close the parent menus">
				<DropdownMenu submenuTriggerType="click">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.SubMenu>
							<DropdownMenu.SubTrigger>Item</DropdownMenu.SubTrigger>
							<DropdownMenu.Content>
								<DropdownMenu.SubMenu>
									<DropdownMenu.SubTrigger>Nested item</DropdownMenu.SubTrigger>
									<DropdownMenu.Content>
										<View padding={2}>Nested content</View>
										<DropdownMenu.Item onClick={() => {}}>Nested action</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.SubMenu>
							</DropdownMenu.Content>
						</DropdownMenu.SubMenu>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
		</Example>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getByRole("button", { name: "Open" });

		await userEvent.click(trigger);
		await userEvent.click(await canvas.findByText("Item"));
		await userEvent.click(await canvas.findByText("Nested item"));

		const nestedContent = await canvas.findByText("Nested content");
		await userEvent.click(nestedContent);
		await sleep(100);

		expect(canvas.getByText("Item")).toBeInTheDocument();
		expect(canvas.getByText("Nested item")).toBeInTheDocument();
		expect(nestedContent).toBeInTheDocument();

		// Outside click after interacting with the nested content closes all menus
		await userEvent.click(document.body);
		await waitFor(() => {
			expect(canvas.queryByText("Item")).not.toBeInTheDocument();
			expect(canvas.queryByText("Nested content")).not.toBeInTheDocument();
		});

		// Pressing the nested submenu trigger with keyboard keeps the parent menus open
		trigger.focus();
		await userEvent.keyboard("{Enter}");
		await canvas.findByText("Item");
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() => {
			expect(canvas.getByText("Nested item").closest("button")).toHaveFocus();
		});
		await userEvent.keyboard("{Enter}");

		expect(await canvas.findByText("Nested content")).toBeInTheDocument();
		await sleep(100);
		expect(canvas.getByText("Item")).toBeInTheDocument();
	},
};

export const defaultActive: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "defaultActive, uncontrolled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} defaultActive>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];
		let item = canvas.getByText("Item");

		await sleep(500);
		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
			expect(item).not.toBeInTheDocument();
		});

		await userEvent.click(trigger);

		item = canvas.getByText("Item");

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
			expect(item).toBeInTheDocument();
		});
	},
};

export const active: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "active, controlled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} active>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const item = canvas.getByText("Item");

		await userEvent.click(document.body);

		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenCalledWith({ reason: "outside-click" });
		});

		expect(item).toBeInTheDocument();
	},
};

export const activeFalse: StoryObj<{
	handleOpen: ReturnType<typeof fn>;
	handleClose: ReturnType<typeof fn>;
}> = {
	name: "active false, controlled",
	args: {
		handleOpen: fn(),
		handleClose: fn(),
	},
	render: (args) => (
		<DropdownMenu onOpen={args.handleOpen} onClose={args.handleClose} active={false}>
			<DropdownMenu.Trigger>
				{(attributes) => <Button attributes={attributes}>Open</Button>}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>Item</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	),
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleOpen).toHaveBeenCalledTimes(1);
			expect(args.handleOpen).toHaveBeenCalledWith();
		});

		const item = canvas.queryByText("Item");
		expect(item).not.toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<DropdownMenu active>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="test-classname" attributes={{ "data-testid": "test-id" }}>
					<DropdownMenu.Item>Item</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const menu = await canvas.findByTestId("test-id");

		expect(menu).toHaveClass("test-classname");
	},
};

export const testScroll = {
	name: "test: scroll",
	render: () => (
		<Example>
			<Example.Item title="Scrolls on page mount to the dropdown">
				<div style={{ height: 1000 }} />
				<DropdownMenu position="end" key="scroll" defaultActive>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
		</Example>
	),
};

const ThemeSwitching = () => {
	const { invertColorMode } = useTheme();

	return (
		<View gap={3} direction="row">
			<DropdownMenu>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
					<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
			<Button onClick={() => invertColorMode()}>Switch color mode</Button>
		</View>
	);
};

const ThemeMultiple = () => {
	return (
		<Theme name={["reshaped", "figma"]}>
			<DropdownMenu>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>Item 1</DropdownMenu.Item>
					<DropdownMenu.Item>Item 2</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</Theme>
	);
};

export const testTheme = {
	name: "test: theme",
	render: () => (
		<Example>
			<Example.Item title="switch color mode while dropdown is active and check that it still works">
				<ThemeSwitching />
			</Example.Item>
			<Example.Item title="dropdown inherits multiple themes">
				<ThemeMultiple />
			</Example.Item>
		</Example>
	),
};
