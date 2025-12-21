import { StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn, Mock } from "storybook/test";

import Accordion from "components/Accordion";
import Button from "components/Button";
import View from "components/View";
import { Placeholder } from "utilities/storybook";

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

export const onToggle: StoryObj<{ handleToggle: Mock }> = {
	name: "onToggle",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle}>
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
	play: async ({ canvas, args }) => {
		const { handleToggle } = args;

		const trigger = canvas.getAllByRole("button")[0];
		const content = canvas.getByRole("region", { hidden: true });

		expect(trigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.click(trigger);

		const triggerId = trigger.getAttribute("id");
		const contentId = content.getAttribute("id");

		expect(handleToggle).toBeCalledTimes(1);
		expect(handleToggle).toBeCalledWith(true);
		expect(trigger).toHaveAttribute("aria-expanded", "true");

		expect(content).toBeInTheDocument();
		expect(content.getAttribute("aria-labelledby")).toBe(triggerId);
		expect(trigger.getAttribute("aria-controls")).toBe(contentId);

		await userEvent.click(trigger);

		expect(handleToggle).toBeCalledTimes(2);
		expect(handleToggle).toBeCalledWith(false);
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	},
};

export const active: StoryObj<{ handleToggle: Mock }> = {
	name: "active",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle} active>
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
	play: async ({ canvas, args }) => {
		const { handleToggle } = args;

		const trigger = canvas.getAllByRole("button")[0];

		// Opened by default
		expect(trigger).toHaveAttribute("aria-expanded", "true");

		await userEvent.click(trigger);

		// Calls handle toggle with a new state
		expect(handleToggle).toBeCalledWith(false);
		// Keeps content opened since it's controlled
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	},
};

export const defaultActive: StoryObj<{ handleToggle: Mock }> = {
	name: "defaultActive",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle} defaultActive>
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
	play: async ({ canvas, args }) => {
		const { handleToggle } = args;

		const trigger = canvas.getAllByRole("button")[0];

		// Opened by default
		expect(trigger).toHaveAttribute("aria-expanded", "true");

		await userEvent.click(trigger);

		// Calls handle toggle with a new state
		expect(handleToggle).toBeCalledWith(false);
		// Keeps content opened since it's controlled
		expect(trigger).toHaveAttribute("aria-expanded", "false");
	},
};

export const renderProps: StoryObj<{ handleToggle: Mock }> = {
	name: "children: render props",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle}>
			<Accordion.Trigger>
				{(attributes, { active }) => (
					<Button attributes={{ ...attributes, "data-active": active }}>Trigger</Button>
				)}
			</Accordion.Trigger>
			<Accordion.Content>
				<View paddingTop={2}>
					<Placeholder />
				</View>
			</Accordion.Content>
		</Accordion>
	),
	play: async ({ canvas, args }) => {
		const { handleToggle } = args;

		const trigger = canvas.getAllByRole("button")[0];
		const content = canvas.getByRole("region", { hidden: true });
		const triggerId = trigger.getAttribute("id");
		const contentId = content.getAttribute("id");

		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(trigger).toHaveAttribute("id", triggerId);
		expect(trigger).toHaveAttribute("aria-controls", contentId);
		expect(trigger).toHaveAttribute("data-active", "false");

		await userEvent.click(trigger);

		expect(handleToggle).toBeCalledTimes(1);
		expect(handleToggle).toBeCalledWith(true);
		expect(trigger).toHaveAttribute("data-active", "true");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Accordion className="test-classname" attributes={{ id: "test-id" }}>
				<Accordion.Trigger>
					<Placeholder>Trigger</Placeholder>
				</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
