import { StoryObj } from "@storybook/react-vite";

import Accordion from "@/components/Accordion";
import MenuItem from "@/components/MenuItem";
import View from "@/components/View";
import { Placeholder } from "@/utilities/storybook";

export default {
	title: "Utility components/Accordion",
	component: Accordion,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/accordion",
		},
	},
};

export const base = {
	name: "base",
	render: () => (
		<Accordion defaultActive>
			<Accordion.Trigger>
				<Placeholder>Trigger</Placeholder>
			</Accordion.Trigger>
			<Accordion.Content>
				<View paddingTop={2}>
					<Placeholder />
				</View>
			</Accordion.Content>
		</Accordion>
	),
};

export const iconSize = {
	name: "iconSize",
	render: () => (
		<Accordion iconSize={6}>
			<Accordion.Trigger>
				<Placeholder>Trigger</Placeholder>
			</Accordion.Trigger>
			<Accordion.Content>
				<View paddingTop={2}>
					<Placeholder />
				</View>
			</Accordion.Content>
		</Accordion>
	),
};

export const iconPosition = {
	name: "iconPosition",
	render: () => (
		<Accordion iconPosition="start">
			<Accordion.Trigger>
				<Placeholder>Trigger</Placeholder>
			</Accordion.Trigger>
			<Accordion.Content>
				<View paddingTop={2}>
					<Placeholder />
				</View>
			</Accordion.Content>
		</Accordion>
	),
};

export const gap = {
	name: "gap",
	render: () => (
		<Accordion defaultActive gap={4}>
			<Accordion.Trigger>
				<Placeholder>Trigger</Placeholder>
			</Accordion.Trigger>
			<Accordion.Content>
				<Placeholder />
			</Accordion.Content>
		</Accordion>
	),
};

export const composition: StoryObj = {
	name: "test: composition",
	render: () => (
		<Accordion>
			<Accordion.Trigger>
				<Placeholder>Trigger</Placeholder>
			</Accordion.Trigger>
			<Accordion.Content>
				<View paddingTop={2}>
					<MenuItem>Menu item 1</MenuItem>
					<MenuItem>Menu item 2</MenuItem>
					<MenuItem>Menu item 3</MenuItem>
				</View>
			</Accordion.Content>
		</Accordion>
	),
};
