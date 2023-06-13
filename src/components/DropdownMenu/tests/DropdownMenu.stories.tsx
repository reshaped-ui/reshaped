import React from "react";
import { Example } from "utilities/storybook";
import Button from "components/Button";
import DropdownMenu from "components/DropdownMenu";
import MenuItem from "components/MenuItem";
import View from "components/View";
import { useTheme } from "components/Theme/useTheme";
import IconCheckmark from "icons/Checkmark";

export default { title: "Components/DropdownMenu" };

export const position = () => (
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
	</Example>
);

export const sections = () => (
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
);

export const submenu = () => (
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
						</DropdownMenu.Content>
					</DropdownMenu.SubMenu>
				</DropdownMenu.Content>
			</DropdownMenu>
		</Example.Item>
	</Example>
);

export const state = () => (
	<Example>
		<Example.Item title="defaultActive">
			<DropdownMenu defaultActive>
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
);

export const testScroll = () => (
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
);

const ThemeSwitching = () => {
	const { invertColorMode } = useTheme();

	return (
		<View gap={3} direction="row">
			<DropdownMenu defaultActive>
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

export const testThemeSwitching = () => (
	<Example>
		<Example.Item title="Switch color mode while dropdown is active and check that it still works">
			<ThemeSwitching />
		</Example.Item>
	</Example>
);
