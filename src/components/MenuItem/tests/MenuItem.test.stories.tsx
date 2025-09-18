import { StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn } from "storybook/test";
import MenuItem from "components/MenuItem";
import Example from "utilities/storybook/Example";
import Actionable from "components/Actionable";

export default {
	title: "Components/MenuItem/tests",
	component: MenuItem,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/menu-item",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const children: StoryObj = {
	name: "children",
	render: () => <MenuItem>Trigger</MenuItem>,
	play: async ({ canvas }) => {
		const el = canvas.getByText("Trigger");

		expect(el).toBeInTheDocument();
		expect(el.tagName).toBe("DIV");
	},
};

export const href: StoryObj = {
	name: "href",
	render: () => <MenuItem href="https://reshaped.so">Trigger</MenuItem>,
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
	render: (args) => <MenuItem onClick={args.handleClick}>Trigger</MenuItem>,
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
		<MenuItem
			onClick={(e) => {
				e.preventDefault();
				args.handleClick(e);
			}}
			href="https://reshaped.so"
		>
			Trigger
		</MenuItem>
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
		<MenuItem disabled onClick={() => {}}>
			Trigger
		</MenuItem>
	),
	play: async ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const as: StoryObj = {
	name: "as, render",
	render: () => (
		<Example>
			<Example.Item title="render, disabled">
				<MenuItem
					disabled
					onClick={() => {}}
					render={(props) => <section {...props} />}
					attributes={{ "data-testid": "render-el" }}
				>
					Trigger
				</MenuItem>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const renderEl = canvas.getByTestId("render-el");

		expect(renderEl.tagName).toBe("SECTION");
		expect(renderEl).toHaveAttribute("aria-disabled", "true");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<MenuItem className="test-classname" attributes={{ id: "test-id" }}>
				Trigger
			</MenuItem>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const alignerClassName: StoryObj = {
	name: "aligner, className, attributes",
	render: () => (
		<div data-testid="root">
			<MenuItem.Aligner className="test-classname" attributes={{ id: "test-id" }}>
				<MenuItem>Trigger</MenuItem>
			</MenuItem.Aligner>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
