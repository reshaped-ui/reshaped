import { StoryObj } from "@storybook/react-vite";
import { userEvent, expect, fn } from "storybook/test";

import Actionable from "components/Actionable";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/Actionable",
	component: Actionable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/actionable",
		},
	},
};

export const base: StoryObj<{
	handleClick: ReturnType<typeof fn>;
	handleSecondClick: ReturnType<typeof fn>;
}> = {
	name: "href, onClick",
	args: {
		handleClick: fn(),
		handleSecondClick: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="span">
				<Actionable>Span</Actionable>
			</Example.Item>
			<Example.Item title="onClick">
				<Actionable onClick={args.handleClick}>Button</Actionable>
			</Example.Item>
			<Example.Item title="href">
				<Actionable href="https://reshaped.so" attributes={{ target: "_blank" }}>
					Link
				</Actionable>
			</Example.Item>

			<Example.Item title="attributes.href">
				<Actionable attributes={{ href: "https://reshaped.so" }}>Link with attributes</Actionable>
			</Example.Item>

			<Example.Item title="href, onClick">
				<Actionable
					onClick={(e) => {
						e.preventDefault();
						args.handleSecondClick(e);
					}}
					href="https://reshaped.so"
				>
					Link with onClick
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const span = canvas.getByText("Span");
		const link = canvas.getByText("Link");
		const button = canvas.getByText("Button");
		const linkWithAttributes = canvas.getByText("Link with attributes");
		const linkWithOnClick = canvas.getByText("Link with onClick");

		expect(span).toBeInTheDocument();
		expect(span.tagName).toBe("SPAN");

		expect(link).toBeInTheDocument();
		expect(link).toHaveRole("link");
		expect(link).toHaveAttribute("href", "https://reshaped.so");

		await userEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(button).toHaveRole("button");
		expect(button).toHaveAttribute("type", "button");
		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));

		expect(linkWithAttributes).toBeInTheDocument();
		expect(linkWithAttributes).toHaveRole("link");
		expect(linkWithAttributes).toHaveAttribute("href", "https://reshaped.so");

		await userEvent.click(linkWithOnClick);

		expect(linkWithOnClick).toBeInTheDocument();
		expect(linkWithOnClick).toHaveRole("link");
		expect(linkWithOnClick).toHaveAttribute("href", "https://reshaped.so");

		expect(args.handleSecondClick).toHaveBeenCalledTimes(1);
		expect(args.handleSecondClick).toHaveBeenCalledWith(
			expect.objectContaining({ target: linkWithOnClick })
		);
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled, button">
				<Actionable disabled onClick={() => {}}>
					Button
				</Actionable>
			</Example.Item>
			<Example.Item title="disabled, link">
				<Actionable disabled href="https://reshaped.so">
					Link
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const button = canvas.getAllByRole("button")[0];
		const link = canvas.getByText("Link");

		expect(button).toBeDisabled();
		expect(link).not.toHaveAttribute("href");
		expect(link).not.toHaveRole("link");
	},
};

export const fullWidth: StoryObj = {
	name: "fullWidth",
	render: () => (
		<Example>
			<Example.Item title="fullWidth">
				<Actionable fullWidth href="https://reshaped.so">
					Actionable
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async () => {
		await userEvent.keyboard("{Tab/}");
	},
};

export const insetFocus = {
	name: "insetFocus",
	render: () => (
		<Example>
			<Example.Item title="insetFocus">
				<Actionable insetFocus onClick={() => {}}>
					Actionable
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async () => {
		await userEvent.keyboard("{Tab/}");
	},
};

export const disableFocusRing = {
	name: "disableFocusRing",
	render: () => (
		<Example>
			<Example.Item title="disableFocusRing">
				<Actionable disableFocusRing onClick={() => {}}>
					Actionable
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async () => {
		await userEvent.keyboard("{Tab/}");
	},
};

export const borderRadius = {
	name: "borderRadius",
	render: () => (
		<Example>
			<Example.Item title="borderRadius: inherit">
				<Actionable borderRadius="inherit" onClick={() => {}}>
					<View borderRadius="large">Actionable</View>
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async () => {
		await userEvent.keyboard("{Tab/}");
	},
};

export const type: StoryObj<{ handleSubmit: ReturnType<typeof fn> }> = {
	name: "type",
	args: {
		handleSubmit: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="type: submit">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						args.handleSubmit();
					}}
				>
					<Actionable onClick={() => {}} type="submit">
						Submit
					</Actionable>
				</form>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const button = canvas.getAllByRole("button")[0];

		await userEvent.click(button);

		expect(args.handleSubmit).toHaveBeenCalledTimes(1);
	},
};

export const as: StoryObj = {
	name: "as, render",
	render: () => (
		<Example>
			<Example.Item title="as: span">
				<Actionable onClick={() => {}} as="span">
					Trigger
				</Actionable>
			</Example.Item>
			<Example.Item title="render, disabled">
				<Actionable disabled onClick={() => {}} render={(props) => <section {...props} />}>
					Trigger
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [asEl, renderEl] = canvas.getAllByText("Trigger");

		expect(asEl.tagName).toBe("SPAN");
		expect(renderEl.tagName).toBe("SECTION");
		expect(renderEl).toHaveAttribute("aria-disabled", "true");
	},
};

export const stopPropagation: StoryObj<{ handleParentClick: ReturnType<typeof fn> }> = {
	name: "stopPropagation",
	args: {
		handleParentClick: fn(),
	},
	render: (args) => (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
