import { StoryObj } from "@storybook/react";
import { userEvent, expect, fn } from "@storybook/test";
import Actionable from "components/Actionable";

export default {
	title: "Utilities/Actionable/tests",
	component: Actionable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/actionable",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const children: StoryObj = {
	name: "children",
	render: () => <Actionable>Trigger</Actionable>,
	play: async ({ canvas }) => {
		const el = canvas.getByText("Trigger");

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("SPAN");
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => <Actionable href="https://reshaped.so">Trigger</Actionable>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("link");

		expect(el).toHaveAttribute("href", "https://reshaped.so");
	},
};

export const attributesHref: StoryObj = {
	name: "attributes.href",
	render: () => <Actionable attributes={{ href: "https://reshaped.so" }}>Trigger</Actionable>,
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
	render: (args) => <Actionable onClick={args.handleClick}>Trigger</Actionable>,
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
		<Actionable
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</Actionable>
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

export const as: StoryObj = {
	name: "as",
	render: () => (
		<Actionable onClick={() => {}} as="span">
			Trigger
		</Actionable>
	),
	play: ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el.tagName).toBe("SPAN");
	},
};

export const type: StoryObj<{ handleSubmit: ReturnType<typeof fn> }> = {
	name: "type",
	args: {
		handleSubmit: fn(),
	},
	render: (args) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				args.handleSubmit();
			}}
		>
			<Actionable onClick={() => {}} type="submit">
				Trigger
			</Actionable>
		</form>
	),
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleSubmit).toHaveBeenCalledTimes(1);
	},
};

export const stopPropagation: StoryObj<{ handleParentClick: ReturnType<typeof fn> }> = {
	name: "stopPropagation",
	args: {
		handleParentClick: fn(),
	},
	render: (args) => (
		<div onClick={args.handleParentClick}>
			<Actionable stopPropagation onClick={() => {}}>
				Trigger
			</Actionable>
		</div>
	),
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleParentClick).not.toHaveBeenCalled();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Actionable className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</Actionable>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
