import { StoryObj } from "@storybook/react";
import { expect, within, fn, userEvent } from "@storybook/test";
import Pagination from "components/Pagination";

export default {
	title: "Components/Pagination/tests",
	component: Pagination,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/pagination",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const render: StoryObj = {
	name: "rendering",
	render: () => (
		<div data-testid="root">
			<Pagination
				total={10}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const root = within(canvas.getByTestId("root"));
		const buttons = root.getAllByRole("button");
		const pages = buttons.slice(1, -1);
		const prevButton = root.getByLabelText("Previous");
		const nextButton = root.getByLabelText("Next");
		const firstPageButton = root.getByLabelText("Page 1");

		expect(buttons.length).toBe(8);
		expect(prevButton).toEqual(buttons[0]);
		expect(prevButton).toBeDisabled();
		expect(nextButton).toEqual(buttons.at(-1));
		expect(nextButton).not.toBeDisabled();

		expect(firstPageButton).toBeInTheDocument();
		expect(firstPageButton).toEqual(pages[0]);
		expect(firstPageButton).toHaveAttribute("aria-current", "true");
	},
};

export const defaultPage: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultPage, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<div data-testid="root">
			<Pagination
				total={10}
				defaultPage={2}
				onChange={args.handleChange}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		</div>
	),
	play: async ({ canvas, args }) => {
		const root = within(canvas.getByTestId("root"));
		const buttons = root.getAllByRole("button");
		const pages = buttons.slice(1, -1);

		expect(pages[1]).toHaveAttribute("aria-current");

		await userEvent.click(pages[2]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ page: 3 });

		expect(pages[1]).toHaveAttribute("aria-current", "false");
		expect(pages[2]).toHaveAttribute("aria-current", "true");
	},
};

export const page: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "page, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<div data-testid="root">
			<Pagination
				total={10}
				page={2}
				onChange={args.handleChange}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		</div>
	),
	play: async ({ canvas, args }) => {
		const root = within(canvas.getByTestId("root"));
		const buttons = root.getAllByRole("button");
		const pages = buttons.slice(1, -1);

		expect(pages[1]).toHaveAttribute("aria-current");

		await userEvent.click(pages[2]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({ page: 3 });

		// Stays the same because it's controlled
		expect(pages[1]).toHaveAttribute("aria-current", "true");
		expect(pages[2]).toHaveAttribute("aria-current", "false");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Pagination
				className="test-classname"
				attributes={{ id: "test-id" }}
				total={10}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
