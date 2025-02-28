import React from "react";
import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import Card from "components/Card";

export default {
	title: "Components/Card/tests",
	component: Card,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/card",
		},
		chromatic: { disableSnapshot: true },
	},
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
