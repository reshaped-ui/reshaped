import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { Example } from "utilities/storybook";
import Actionable from "components/Actionable";
import View from "components/View";

export default {
	title: "Utilities/Actionable",
	component: Actionable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/actionable",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="link">
				<Actionable href="https://reshaped.so" attributes={{ target: "_blank" }}>
					Link
				</Actionable>
			</Example.Item>
			<Example.Item title="button">
				<Actionable onClick={() => {}}>Button</Actionable>
			</Example.Item>
		</Example>
	),
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
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
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
		await userEvent.keyboard("{Tab}");
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
		await userEvent.keyboard("{Tab}");
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
		await userEvent.keyboard("{Tab}");
	},
};

export const borderRadius = {
	name: "borderRadius",
	render: () => (
		<Example>
			<Example.Item title="radius: inherit">
				<Actionable borderRadius="inherit" onClick={() => {}}>
					<View borderRadius="large">Actionable</View>
				</Actionable>
			</Example.Item>
		</Example>
	),
	play: async () => {
		await userEvent.keyboard("{Tab}");
	},
};
