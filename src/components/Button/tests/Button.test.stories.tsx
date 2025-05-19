import { StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn } from "storybook/test";
import Button from "components/Button";

export default {
	title: "Components/Button/tests",
	component: Button,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/button",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const children: StoryObj = {
	name: "children",
	render: () => <Button>Trigger</Button>,
	play: async ({ canvas }) => {
		const el = canvas.getByText("Trigger");

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("SPAN");
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => <Button href="https://reshaped.so">Trigger</Button>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("link");

		expect(el).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const onClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <Button onClick={args.handleClick}>Trigger</Button>,
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getAllByRole("button")[0];

		await userEvent.click(el);

		expect(el).toHaveAttribute("type", "button");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const hrefOnClick: StoryObj<{ handleClick: ReturnType<typeof fn> }> = {
	name: "href + onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => (
		<Button
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</Button>
	),
	play: async ({ canvas, args }) => {
		const { handleClick } = args;
		const el = canvas.getByRole("link");

		await userEvent.click(el);

		expect(el).toHaveAttribute("href", "https://reshaped.so");
		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: el }));
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Button disabled onClick={() => {}}>
			Trigger
		</Button>
	),
	play: async ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Button className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</Button>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const group: StoryObj = {
	name: "group",
	render: () => (
		<Button.Group>
			<Button>Trigger</Button>
			<Button>Trigger</Button>
		</Button.Group>
	),
	play: async ({ canvas }) => {
		const el = canvas.getByRole("group");

		expect(el).toBeInTheDocument();
		expect(el.childElementCount).toEqual(2);
	},
};

export const groupClassName: StoryObj = {
	name: "group className, attributes",
	render: () => (
		<div data-testid="root">
			<Button.Group className="test-classname" attributes={{ id: "test-id" }}>
				<Button>Trigger</Button>
			</Button.Group>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
