import { StoryObj } from "@storybook/react";
import { within, expect, userEvent } from "@storybook/test";
import Card from "components/Card";
import Button from "components/Button";
import View from "components/View";
import MenuItem from "components/MenuItem";
import Theme, { useTheme } from "components/Theme";
import { Example } from "utilities/storybook";
import Reshaped from "components/Reshaped";

export default {
	title: "Utilities/Theme/tests",
	component: Theme,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/theme",
		},
	},
};

export const light: StoryObj = {
	name: "light",
	render: () => (
		<Theme name="reshaped" colorMode="light">
			<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
		</Theme>
	),
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("test-id").parentNode;

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "light");
	},
};

export const dark: StoryObj = {
	name: "dark",
	render: () => (
		<Theme name="reshaped" colorMode="dark">
			<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
		</Theme>
	),
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("test-id").parentNode;

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const inherited: StoryObj = {
	name: "inherited",
	render: () => (
		<Theme name="reshaped">
			<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
		</Theme>
	),
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("test-id").parentNode;

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");

		// Our storybook setup uses dark by default
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const inverted: StoryObj = {
	name: "inverted",
	render: () => (
		<Theme name="reshaped" colorMode="inverted">
			<Card attributes={{ "data-testid": "test-id" }}>Content</Card>
		</Theme>
	),
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("test-id").parentNode;

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "light");
	},
};

export const controlled: StoryObj = {
	name: "controlled",
	render: () => {
		const Internal = () => {
			const { setTheme, theme } = useTheme();

			return (
				<Button color="primary" onClick={() => setTheme("slate")}>
					Switch to slate
				</Button>
			);
		};

		return (
			<div data-testid="root">
				<Theme name="reshaped">
					<Internal />
				</Theme>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;
		const trigger = canvas.getAllByRole("button")[0];

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");

		await userEvent.click(trigger);

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const uncontrolled: StoryObj = {
	name: "uncontrolled",
	render: () => {
		const Internal = () => {
			const { setTheme, theme } = useTheme();

			return (
				<Button color="primary" onClick={() => setTheme("slate")}>
					Switch to slate
				</Button>
			);
		};

		return (
			<div data-testid="root">
				<Theme defaultName="reshaped">
					<Internal />
				</Theme>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;
		const trigger = canvas.getAllByRole("button")[0];

		expect(root).toHaveAttribute("data-rs-theme", "reshaped");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");

		await userEvent.click(trigger);

		expect(root).toHaveAttribute("data-rs-theme", "slate");
		expect(root).toHaveAttribute("data-rs-color-mode", "dark");
	},
};

export const disabledTransition = {
	name: "disabled transitions",
	render: () => {
		const { invertColorMode } = useTheme();

		return (
			<Example>
				<Example.Item title="should have no transitions while switching color mode">
					<View gap={3}>
						<Button onClick={invertColorMode}>Invert mode</Button>

						<MenuItem selected>Test transition</MenuItem>

						<Card>Default card</Card>

						<Theme colorMode="inverted">
							<Card>Inverted card</Card>
						</Theme>
					</View>
				</Example.Item>
			</Example>
		);
	},
};
