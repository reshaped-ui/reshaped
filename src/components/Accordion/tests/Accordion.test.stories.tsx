import { StoryObj } from "@storybook/react";
import { userEvent, within, expect, fn } from "@storybook/test";
import Accordion from "components/Accordion";
import Button from "components/Button";

export default {
	title: "Utilities/Accordion/tests",
	component: Accordion,
	parameters: {
		chromatic: {
			disableSnapshots: true,
		},
		iframe: {
			url: "https://reshaped.so/docs/utilities/accordion",
		},
	},
};

const fixtures = {
	triggerText: "Trigger",
	contentText: "Content",
	className: "test-classname",
	id: "test-id",
};

export const handleToggle: StoryObj<{ handleToggle: typeof fn }> = {
	name: "handleToggle",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle}>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	),
	play: async ({ canvasElement, args }) => {
		const { handleToggle } = args;
		const canvas = within(canvasElement);

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

export const controlled: StoryObj<{ handleToggle: typeof fn }> = {
	name: "active",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle} active>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	),
	play: async ({ canvasElement, args }) => {
		const { handleToggle } = args;
		const canvas = within(canvasElement);

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

export const uncontrolled: StoryObj<{ handleToggle: typeof fn }> = {
	name: "defaultActive",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle} defaultActive>
			<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	),
	play: async ({ canvasElement, args }) => {
		const { handleToggle } = args;
		const canvas = within(canvasElement);

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

export const renderProps: StoryObj<{ handleToggle: typeof fn }> = {
	name: "children: render props",
	args: {
		handleToggle: fn(),
	},
	render: (args) => (
		<Accordion onToggle={args.handleToggle}>
			<Accordion.Trigger>
				{(attributes, { active }) => (
					<Button attributes={{ ...attributes, "data-active": active }}>Toggle</Button>
				)}
			</Accordion.Trigger>
			<Accordion.Content>{fixtures.contentText}</Accordion.Content>
		</Accordion>
	),
	play: async ({ canvasElement, args }) => {
		const { handleToggle } = args;
		const canvas = within(canvasElement);

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
			<Accordion className={fixtures.className} attributes={{ id: fixtures.id }}>
				<Accordion.Trigger>{fixtures.triggerText}</Accordion.Trigger>
				<Accordion.Content>{fixtures.contentText}</Accordion.Content>
			</Accordion>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass(fixtures.className);
		expect(root).toHaveAttribute("id", fixtures.id);
	},
};
