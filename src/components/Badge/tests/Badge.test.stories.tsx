import { StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import Badge from "components/Badge";

export default {
	title: "Components/Badge/tests",
	component: Badge,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/badge",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => <Badge href="https://reshaped.so">Badge</Badge>,
	play: async ({ canvas }) => {
		const link = canvas.getByRole("link");

		expect(link).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <Badge onClick={args.handleClick}>Badge</Badge>,
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Badge color="primary" className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
