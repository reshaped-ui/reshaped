import { StoryObj } from "@storybook/react";
import { fn, expect, userEvent } from "@storybook/test";
import Breadcrumbs from "components/Breadcrumbs";

export default {
	title: "Components/Breadcrumbs/tests",
	component: Breadcrumbs,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "item, onClick, disabled",
	args: {
		handleClick: fn(),
	},
	render: (args) => (
		<Breadcrumbs>
			<Breadcrumbs.Item onClick={args.handleClick}>Trigger</Breadcrumbs.Item>
			<Breadcrumbs.Item onClick={args.handleClick} disabled>
				Trigger
			</Breadcrumbs.Item>
		</Breadcrumbs>
	),
	play: async ({ args, canvas }) => {
		const trigggers = canvas.getAllByRole("button");

		await userEvent.click(trigggers[0]);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(
			expect.objectContaining({ target: trigggers[0] })
		);

		await userEvent.click(trigggers[1]);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
	},
};

export const href: StoryObj = {
	name: "item, href",
	render: () => (
		<Breadcrumbs>
			<Breadcrumbs.Item href="https://reshaped.so">Trigger</Breadcrumbs.Item>
		</Breadcrumbs>
	),
	play: async ({ canvas }) => {
		const trigggers = canvas.getAllByRole("link");

		expect(trigggers[0]).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const collapsible: StoryObj = {
	name: "collapsible",
	render: () => (
		<Breadcrumbs defaultVisibleItems={2} expandAriaLabel="Expand">
			<Breadcrumbs.Item onClick={() => {}}>Trigger 1</Breadcrumbs.Item>
			<Breadcrumbs.Item onClick={() => {}}>Trigger 2</Breadcrumbs.Item>
			<Breadcrumbs.Item onClick={() => {}}>Trigger 3</Breadcrumbs.Item>
			<Breadcrumbs.Item onClick={() => {}}>Trigger 4</Breadcrumbs.Item>
		</Breadcrumbs>
	),
	play: async ({ canvas }) => {
		let triggers = canvas.getAllByRole("button");

		expect(triggers[0]).toHaveTextContent("Trigger 1");
		expect(triggers[1]).toHaveAccessibleName("Expand");
		expect(triggers[2]).toHaveTextContent("Trigger 4");

		await userEvent.click(triggers[1]);

		triggers = canvas.getAllByRole("button");

		expect(triggers[0]).toHaveTextContent("Trigger 1");
		expect(triggers[1]).toHaveTextContent("Trigger 2");
		expect(triggers[2]).toHaveTextContent("Trigger 3");
		expect(triggers[3]).toHaveTextContent("Trigger 4");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Breadcrumbs className="test-classname" attributes={{ id: "test-id" }}>
				<Breadcrumbs.Item>Trigger</Breadcrumbs.Item>
			</Breadcrumbs>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
