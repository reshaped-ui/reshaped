import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import Actionable from "@/components/Actionable";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

export default {
	title: "Utility components/Actionable",
	component: Actionable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/actionable",
		},
	},
};

export const base: StoryObj = {
	name: "href, onClick",
	render: () => (
		<Example>
			<Example.Item title="span">
				<Actionable>Span</Actionable>
			</Example.Item>
			<Example.Item title="onClick">
				<Actionable onClick={() => {}}>Button</Actionable>
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
				<Actionable onClick={(e) => e.preventDefault()} href="https://reshaped.so">
					Link with onClick
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const span = canvas.getByText("Span");
		const link = canvas.getByText("Link");
		const button = canvas.getByText("Button");
		const linkWithAttributes = canvas.getByText("Link with attributes");
		const linkWithOnClick = canvas.getByText("Link with onClick");

		expect(span.tagName).toBe("SPAN");

		expect(link).toHaveRole("link");
		expect(link).toHaveAttribute("href", "https://reshaped.so");

		expect(button).toHaveRole("button");
		expect(button).toHaveAttribute("type", "button");

		expect(linkWithAttributes).toHaveRole("link");
		expect(linkWithAttributes).toHaveAttribute("href", "https://reshaped.so");

		expect(linkWithOnClick).toHaveRole("link");
		expect(linkWithOnClick).toHaveAttribute("href", "https://reshaped.so");
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
