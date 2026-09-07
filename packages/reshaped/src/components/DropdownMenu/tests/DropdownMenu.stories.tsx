import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import Button from "@/components/Button";
import DropdownMenu from "@/components/DropdownMenu";
import MenuItem from "@/components/MenuItem";
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

export const size: StoryObj = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<DropdownMenu size="small">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.SubMenu>
							<DropdownMenu.SubTrigger>Item 2</DropdownMenu.SubTrigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>SubItem 1</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.SubMenu>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title="size: medium">
				<DropdownMenu size="medium">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title="size: large">
				<DropdownMenu size="large">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title={["size: large", "item size: small"]}>
				<DropdownMenu size="large">
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark} size="small">
							Item 2
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>

			<Example.Item title={["responsive size", "[s] small", "[m+] large"]}>
				<DropdownMenu size={{ s: "small", m: "large" }}>
					<DropdownMenu.Trigger>
						{(attributes) => <Button attributes={attributes}>Open</Button>}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item icon={IconCheckmark}>Item 1</DropdownMenu.Item>
						<DropdownMenu.Item icon={IconCheckmark}>Item 2</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu>
			</Example.Item>
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

export const testSize: StoryObj = {
	name: "test: size inheritance",
	render: () => (
		<View gap={3}>
			{/* References for comparing the computed styles of the menu items */}
			<MenuItem size="small" attributes={{ "data-testid": "reference-small" }}>
				Reference
			</MenuItem>
			<MenuItem size="medium" attributes={{ "data-testid": "reference-medium" }}>
				Reference
			</MenuItem>
			<MenuItem size="large" attributes={{ "data-testid": "reference-large" }}>
				Reference
			</MenuItem>

			<DropdownMenu size="large" defaultActive>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item attributes={{ "data-testid": "inherited-item" }}>
						Item 1
					</DropdownMenu.Item>
					<DropdownMenu.Item size="small" attributes={{ "data-testid": "overridden-item" }}>
						Item 2
					</DropdownMenu.Item>
					<DropdownMenu.SubMenu>
						<DropdownMenu.SubTrigger attributes={{ "data-testid": "sub-trigger" }}>
							Item 3
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item attributes={{ "data-testid": "submenu-item" }}>
								SubItem 1
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
				</DropdownMenu.Content>
			</DropdownMenu>
		</View>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const getFontSize = (el: HTMLElement) => getComputedStyle(el).fontSize;
		const smallFontSize = getFontSize(canvas.getByTestId("reference-small"));
		const mediumFontSize = getFontSize(canvas.getByTestId("reference-medium"));
		const largeFontSize = getFontSize(canvas.getByTestId("reference-large"));

		expect(largeFontSize).not.toBe(mediumFontSize);
		expect(smallFontSize).not.toBe(mediumFontSize);

		// Items without their own size use the size passed to the root component
		const inheritedItem = await canvas.findByTestId("inherited-item");
		expect(getFontSize(inheritedItem)).toBe(largeFontSize);

		// Item size takes priority over the menu size
		expect(getFontSize(canvas.getByTestId("overridden-item"))).toBe(smallFontSize);

		// Submenus inherit the size of their parent menu
		await userEvent.hover(canvas.getByTestId("sub-trigger"));
		const submenuItem = await canvas.findByTestId("submenu-item");
		expect(getFontSize(submenuItem)).toBe(largeFontSize);
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
