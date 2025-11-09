import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent } from "storybook/test";

import Card from "components/Card";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Card",
	component: Card,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/card",
		},
	},
};

export const padding = {
	name: "padding",
	render: () => (
		<Example>
			<Example.Item title="padding: default">
				<Card>
					<Placeholder />
				</Card>
			</Example.Item>

			<Example.Item title="padding: 2">
				<Card padding={2}>
					<Placeholder />
				</Card>
			</Example.Item>

			<Example.Item title="padding: 0">
				<Card padding={0}>
					<Placeholder />
				</Card>
			</Example.Item>

			<Example.Item title={["responsive padding", "[s] 4", "[m+] 8"]}>
				<Card padding={{ s: 4, m: 8 }}>
					<Placeholder />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const selected = {
	name: "selected",
	render: () => (
		<Example>
			<Example.Item title="selected">
				<Card selected>
					<Placeholder />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const elevated = {
	name: "elevated",
	render: () => (
		<Example>
			<Example.Item title="elevated">
				<Card elevated>
					<Placeholder />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const bleed = {
	name: "bleed",
	render: () => (
		<Example>
			<Example.Item title="bleed: 4">
				<Card bleed={4}>
					<Placeholder />
				</Card>
			</Example.Item>
			<Example.Item title={["responsive bleed", "[s] 4", "[m+] 0"]}>
				<Card bleed={{ s: 4, m: 0 }}>
					<Placeholder />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const height = {
	name: "height",
	render: () => (
		<Example>
			<Example.Item title="height: 200px">
				<Card height="200px" />
			</Example.Item>
		</Example>
	),
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <Card onClick={args.handleClick}>Trigger</Card>,
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getAllByRole("button")[0];

		await userEvent.click(el);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => <Card href="https://reshaped.so">Trigger</Card>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("link");

		expect(el).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const as: StoryObj = {
	name: "as",
	render: () => <Card as="span" attributes={{ "data-testid": "root" }} />,
	play: ({ canvas }) => {
		const root = canvas.getByTestId("root");

		expect(root.tagName).toBe("SPAN");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Card className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
