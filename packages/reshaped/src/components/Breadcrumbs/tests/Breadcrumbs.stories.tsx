import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Badge from "components/Badge";
import Breadcrumbs from "components/Breadcrumbs";
import IconZap from "icons/Zap";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Breadcrumbs",
	component: Breadcrumbs,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<Breadcrumbs ariaLabel="breadcrumb neutral">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="color: primary">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb primary">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const item = {
	name: "item, disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled item">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb disabled">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}} disabled>
						Disabled item 2
					</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "item, icon",
	render: () => (
		<Example>
			<Example.Item title="item with icon">
				<Breadcrumbs color="primary" ariaLabel="breadcrumb with icon">
					<Breadcrumbs.Item icon={IconZap} onClick={() => {}}>
						Item 1
					</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const slots = {
	name: "separator, children",
	render: () => (
		<Example>
			<Example.Item title="slot: separator">
				<Breadcrumbs color="primary" separator="/" ariaLabel="breadcrumb with separator">
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="custom child content">
				<Breadcrumbs ariaLabel="breadcrumb with custom children">
					<Breadcrumbs.Item onClick={() => {}}>
						<Badge>Item 1</Badge>
					</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>
						<Badge>Item 2</Badge>
					</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
};

export const collapsed: StoryObj = {
	name: "collapsed",
	render: () => (
		<Example>
			<Example.Item title="collapsed, 3 items shown by default">
				<Breadcrumbs
					defaultVisibleItems={3}
					ariaLabel="breadcrumbs one"
					expandAriaLabel="Expand items"
				>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="collapsed, 4 items shown by default">
				<Breadcrumbs
					defaultVisibleItems={4}
					ariaLabel="breadcrumb two"
					expandAriaLabel="Expand items"
				>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>

			<Example.Item title="collapsed, 3 items shown by default, not expandable">
				<Breadcrumbs defaultVisibleItems={3} ariaLabel="breadcrumb three" disableExpand>
					<Breadcrumbs.Item onClick={() => {}}>Item 1</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 2</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 3</Breadcrumbs.Item>
					<Breadcrumbs.Item onClick={() => {}}>Item 4</Breadcrumbs.Item>
					<Breadcrumbs.Item>Item 5</Breadcrumbs.Item>
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		let triggers = canvas.getAllByRole("button");

		expect(triggers[0]).toHaveTextContent("Item 1");
		expect(triggers[1]).toHaveAccessibleName("Expand items");
		expect(triggers[2]).toHaveTextContent("Item 4");

		await userEvent.click(triggers[1]);

		triggers = canvas.getAllByRole("button");

		expect(triggers[0]).toHaveTextContent("Item 1");
		expect(triggers[1]).toHaveTextContent("Item 2");
		expect(triggers[2]).toHaveTextContent("Item 3");
		expect(triggers[3]).toHaveTextContent("Item 4");
	},
};

export const multiline = {
	name: "composition, multiline",
	render: () => (
		<Example>
			<Example.Item title="wraps content when multiline">
				<Breadcrumbs ariaLabel="breadcrumb multiline">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
						<Breadcrumbs.Item onClick={() => {}} key={i}>
							Item {i}
						</Breadcrumbs.Item>
					))}
				</Breadcrumbs>
			</Example.Item>
		</Example>
	),
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
		const triggers = canvas.getAllByRole("button");

		await userEvent.click(triggers[0]);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: triggers[0] }));

		await userEvent.click(triggers[1]);

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
		const triggers = canvas.getAllByRole("link");

		expect(triggers[0]).toHaveAttribute("href", "https://reshaped.so");
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
