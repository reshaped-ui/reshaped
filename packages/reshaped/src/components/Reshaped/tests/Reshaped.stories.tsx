import { expect } from "storybook/test";

import Reshaped from "../Reshaped";

export default {
	title: "Utility components/Reshaped",
	parameters: {
		disableWrapper: true,
	},
};

export const rtl = {
	name: "defaultRTL",
	render: () => (
		<Reshaped defaultRTL theme="slate" defaultColorMode="dark">
			Hello
		</Reshaped>
	),
};

export const lightMode = {
	name: "defaultColorMode=light",
	render: () => <Reshaped theme="slate">Hello</Reshaped>,
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("slate");
		expect(colorMode).toEqual("light");
	},
};

export const darkMode = {
	name: "defaultColorMode=dark",
	render: () => (
		<Reshaped theme="slate" defaultColorMode="dark">
			Hello
		</Reshaped>
	),
	play: () => {
		const theme = document.documentElement.getAttribute("data-rs-theme");
		const colorMode = document.documentElement.getAttribute("data-rs-color-mode");

		expect(theme).toEqual("slate");
		expect(colorMode).toEqual("dark");
	},
};

export const scoped = {
	name: "scoped",
	render: () => (
		<Reshaped theme="slate" defaultColorMode="dark" scoped>
			<div
				style={{
					backgroundColor: "var(--rs-color-background-page)",
					padding: "var(--rs-unit-x4)",
					borderRadius: "var(--rs-radius-large)",
				}}
			>
				Hello
			</div>
		</Reshaped>
	),
	play: async () => {
		const root = document.querySelector("[data-rs-root]");

		expect(root).toBeInTheDocument();
		expect(root).not.toBe(document.documentElement);
		expect(root).toHaveAttribute("data-rs-theme", "slate");
		expect(document.documentElement).not.toHaveAttribute("data-rs-theme");
	},
};
