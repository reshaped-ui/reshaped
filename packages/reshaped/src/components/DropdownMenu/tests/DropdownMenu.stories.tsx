import { StoryObj } from "@storybook/react-vite";

import Button from "@/components/Button";
import DropdownMenu from "@/components/DropdownMenu";
import Theme from "@/components/Theme";
import { useTheme } from "@/components/Theme/useTheme";
import View from "@/components/View";
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
